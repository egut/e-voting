/**
 * Unit tests for ballot box encryption and decryption
 *
 * These tests verify the basic functionality of vote encryption/decryption
 * using RSA-4096 with OAEP padding.
 *
 * Requirements: 2.1, 2.4, 2.5
 */

import { encryptVote, decryptVote, decryptBallotBox, retryFailedDecryptions } from './ballot-box';
import { generateKeyPair } from './key-generation';
import { DecryptedVote, EncryptedVote } from './types';

describe('Ballot Box Encryption/Decryption', () => {
  let chairKeyPair: { publicKey: string; privateKey: string };

  beforeAll(async () => {
    // Generate a key pair for testing
    chairKeyPair = await generateKeyPair();
  });

  describe('encryptVote', () => {
    it('should encrypt a yes/no vote', async () => {
      const vote: DecryptedVote = {
        type: 'yes',
        value: true,
        timestamp: new Date(),
        receiptCode: '',
      };

      const encrypted = await encryptVote(vote, {
        publicKey: chairKeyPair.publicKey,
      });

      expect(encrypted.ciphertext).toBeDefined();
      expect(encrypted.ciphertext.length).toBeGreaterThan(0);
      expect(encrypted.timestamp).toEqual(vote.timestamp);
      expect(typeof encrypted.ciphertext).toBe('string');
    });

    it('should encrypt a ranked vote', async () => {
      const vote: DecryptedVote = {
        type: 'ranked',
        value: ['candidate1', 'candidate2', 'candidate3'],
        timestamp: new Date(),
        receiptCode: '',
      };

      const encrypted = await encryptVote(vote, {
        publicKey: chairKeyPair.publicKey,
      });

      expect(encrypted.ciphertext).toBeDefined();
      expect(encrypted.ciphertext.length).toBeGreaterThan(0);
    });

    it('should encrypt an abstain vote', async () => {
      const vote: DecryptedVote = {
        type: 'abstain',
        timestamp: new Date(),
        receiptCode: '',
      };

      const encrypted = await encryptVote(vote, {
        publicKey: chairKeyPair.publicKey,
      });

      expect(encrypted.ciphertext).toBeDefined();
      expect(encrypted.ciphertext.length).toBeGreaterThan(0);
    });

    it('should produce different ciphertexts for the same vote', async () => {
      const vote: DecryptedVote = {
        type: 'yes',
        value: true,
        timestamp: new Date(),
        receiptCode: '',
      };

      const encrypted1 = await encryptVote(vote, {
        publicKey: chairKeyPair.publicKey,
      });
      const encrypted2 = await encryptVote(vote, {
        publicKey: chairKeyPair.publicKey,
      });

      // RSA-OAEP includes random padding, so ciphertexts should differ
      expect(encrypted1.ciphertext).not.toEqual(encrypted2.ciphertext);
    });

    it('should throw error with invalid public key', async () => {
      const vote: DecryptedVote = {
        type: 'yes',
        value: true,
        timestamp: new Date(),
        receiptCode: '',
      };

      await expect(
        encryptVote(vote, {
          publicKey: 'invalid-key',
        })
      ).rejects.toThrow();
    });
  });

  describe('decryptVote', () => {
    it('should decrypt a yes/no vote', async () => {
      const originalVote: DecryptedVote = {
        type: 'yes',
        value: true,
        timestamp: new Date(),
        receiptCode: 'test-receipt',
      };

      const encrypted = await encryptVote(originalVote, {
        publicKey: chairKeyPair.publicKey,
      });

      // Add receipt code to encrypted vote
      encrypted.receiptCode = 'test-receipt';

      const decrypted = await decryptVote(encrypted, {
        privateKey: chairKeyPair.privateKey,
      });

      expect(decrypted.type).toBe(originalVote.type);
      expect(decrypted.value).toBe(originalVote.value);
      expect(decrypted.timestamp.toISOString()).toBe(originalVote.timestamp.toISOString());
      expect(decrypted.receiptCode).toBe('test-receipt');
    });

    it('should decrypt a ranked vote', async () => {
      const originalVote: DecryptedVote = {
        type: 'ranked',
        value: ['candidate1', 'candidate2', 'candidate3'],
        timestamp: new Date(),
        receiptCode: 'test-receipt-2',
      };

      const encrypted = await encryptVote(originalVote, {
        publicKey: chairKeyPair.publicKey,
      });
      encrypted.receiptCode = 'test-receipt-2';

      const decrypted = await decryptVote(encrypted, {
        privateKey: chairKeyPair.privateKey,
      });

      expect(decrypted.type).toBe(originalVote.type);
      expect(decrypted.value).toEqual(originalVote.value);
      expect(decrypted.receiptCode).toBe('test-receipt-2');
    });

    it('should decrypt an abstain vote', async () => {
      const originalVote: DecryptedVote = {
        type: 'abstain',
        timestamp: new Date(),
        receiptCode: 'test-receipt-3',
      };

      const encrypted = await encryptVote(originalVote, {
        publicKey: chairKeyPair.publicKey,
      });
      encrypted.receiptCode = 'test-receipt-3';

      const decrypted = await decryptVote(encrypted, {
        privateKey: chairKeyPair.privateKey,
      });

      expect(decrypted.type).toBe(originalVote.type);
      expect(decrypted.value).toBeUndefined();
      expect(decrypted.receiptCode).toBe('test-receipt-3');
    });

    it('should throw error with wrong private key', async () => {
      const vote: DecryptedVote = {
        type: 'yes',
        value: true,
        timestamp: new Date(),
        receiptCode: '',
      };

      const encrypted = await encryptVote(vote, {
        publicKey: chairKeyPair.publicKey,
      });

      // Generate a different key pair
      const wrongKeyPair = await generateKeyPair();

      await expect(
        decryptVote(encrypted, {
          privateKey: wrongKeyPair.privateKey,
        })
      ).rejects.toThrow();
    });

    it('should throw error with invalid ciphertext', async () => {
      const invalidEncrypted: EncryptedVote = {
        ciphertext: 'invalid-base64-ciphertext',
        timestamp: new Date(),
        receiptCode: '',
      };

      await expect(
        decryptVote(invalidEncrypted, {
          privateKey: chairKeyPair.privateKey,
        })
      ).rejects.toThrow();
    });
  });

  describe('decryptBallotBox', () => {
    it('should decrypt multiple votes successfully', async () => {
      const votes: DecryptedVote[] = [
        { type: 'yes', value: true, timestamp: new Date(), receiptCode: 'receipt-1' },
        { type: 'no', value: false, timestamp: new Date(), receiptCode: 'receipt-2' },
        { type: 'abstain', timestamp: new Date(), receiptCode: 'receipt-3' },
      ];

      const encryptedVotes = await Promise.all(
        votes.map(async (vote, i) => {
          const encrypted = await encryptVote(vote, {
            publicKey: chairKeyPair.publicKey,
          });
          encrypted.receiptCode = `receipt-${i + 1}`;
          return encrypted;
        })
      );

      const result = await decryptBallotBox(encryptedVotes, {
        privateKey: chairKeyPair.privateKey,
      });

      expect(result.decryptedVotes).toHaveLength(3);
      expect(result.failures).toHaveLength(0);
      expect(result.decryptedVotes[0].type).toBe('yes');
      expect(result.decryptedVotes[1].type).toBe('no');
      expect(result.decryptedVotes[2].type).toBe('abstain');
    });

    it('should handle partial decryption failures', async () => {
      const votes: DecryptedVote[] = [
        { type: 'yes', value: true, timestamp: new Date(), receiptCode: 'receipt-1' },
        { type: 'no', value: false, timestamp: new Date(), receiptCode: 'receipt-2' },
      ];

      const encryptedVotes = await Promise.all(
        votes.map(async (vote, i) => {
          const encrypted = await encryptVote(vote, {
            publicKey: chairKeyPair.publicKey,
          });
          encrypted.receiptCode = `receipt-${i + 1}`;
          return encrypted;
        })
      );

      // Corrupt one vote
      encryptedVotes[1].ciphertext = 'corrupted-ciphertext';

      const result = await decryptBallotBox(encryptedVotes, {
        privateKey: chairKeyPair.privateKey,
      });

      expect(result.decryptedVotes).toHaveLength(1);
      expect(result.failures).toHaveLength(1);
      expect(result.failures[0].index).toBe(1);
      expect(result.failures[0].error).toContain('Failed to decrypt vote');
    });

    it('should throw error if all votes fail to decrypt', async () => {
      const invalidVotes: EncryptedVote[] = [
        { ciphertext: 'invalid1', timestamp: new Date(), receiptCode: 'r1' },
        { ciphertext: 'invalid2', timestamp: new Date(), receiptCode: 'r2' },
      ];

      await expect(
        decryptBallotBox(invalidVotes, {
          privateKey: chairKeyPair.privateKey,
        })
      ).rejects.toThrow('Failed to decrypt all 2 votes');
    });

    it('should handle empty ballot box', async () => {
      const result = await decryptBallotBox([], {
        privateKey: chairKeyPair.privateKey,
      });

      expect(result.decryptedVotes).toHaveLength(0);
      expect(result.failures).toHaveLength(0);
    });
  });

  describe('retryFailedDecryptions', () => {
    it('should recover votes with correct key', async () => {
      const vote: DecryptedVote = {
        type: 'yes',
        value: true,
        timestamp: new Date(),
        receiptCode: 'receipt-1',
      };

      const encrypted = await encryptVote(vote, {
        publicKey: chairKeyPair.publicKey,
      });
      encrypted.receiptCode = 'receipt-1';

      const failures = [
        {
          index: 0,
          error: 'Test error',
          encryptedVote: encrypted,
        },
      ];

      const result = await retryFailedDecryptions(failures, {
        privateKey: chairKeyPair.privateKey,
      });

      expect(result.recovered).toHaveLength(1);
      expect(result.stillFailed).toHaveLength(0);
      expect(result.recovered[0].vote.type).toBe('yes');
    });

    it('should keep failures that cannot be recovered', async () => {
      const failures = [
        {
          index: 0,
          error: 'Test error',
          encryptedVote: {
            ciphertext: 'invalid-ciphertext',
            timestamp: new Date(),
            receiptCode: 'r1',
          },
        },
      ];

      const result = await retryFailedDecryptions(failures, {
        privateKey: chairKeyPair.privateKey,
      });

      expect(result.recovered).toHaveLength(0);
      expect(result.stillFailed).toHaveLength(1);
    });
  });

  describe('Round-trip encryption/decryption', () => {
    it('should preserve vote data through encryption and decryption', async () => {
      const testCases: DecryptedVote[] = [
        { type: 'yes', value: true, timestamp: new Date('2025-01-01'), receiptCode: 'r1' },
        { type: 'no', value: false, timestamp: new Date('2025-01-02'), receiptCode: 'r2' },
        { type: 'abstain', timestamp: new Date('2025-01-03'), receiptCode: 'r3' },
        {
          type: 'ranked',
          value: ['A', 'B', 'C'],
          timestamp: new Date('2025-01-04'),
          receiptCode: 'r4',
        },
        {
          type: 'approval',
          value: ['X', 'Y'],
          timestamp: new Date('2025-01-05'),
          receiptCode: 'r5',
        },
      ];

      for (const originalVote of testCases) {
        const encrypted = await encryptVote(originalVote, {
          publicKey: chairKeyPair.publicKey,
        });
        encrypted.receiptCode = originalVote.receiptCode;

        const decrypted = await decryptVote(encrypted, {
          privateKey: chairKeyPair.privateKey,
        });

        expect(decrypted.type).toBe(originalVote.type);
        expect(decrypted.value).toEqual(originalVote.value);
        expect(decrypted.timestamp.toISOString()).toBe(originalVote.timestamp.toISOString());
        expect(decrypted.receiptCode).toBe(originalVote.receiptCode);
      }
    });
  });
});
