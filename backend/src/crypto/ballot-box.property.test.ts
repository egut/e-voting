/**
 * Property-based tests for vote encryption during open voting
 *
 * Property 2: Vote Encryption During Open Voting
 * While voting is open, encrypted votes cannot be decrypted without the chair's private key.
 * This ensures vote confidentiality until the chair closes voting.
 *
 * Validates: Requirements 2.1, 2.2
 *
 * Feature: digital-voting-system, Property 2: Vote Encryption During Open Voting
 */

import fc from 'fast-check';
import { encryptVote, decryptVote } from './ballot-box';
import { generateKeyPair } from './key-generation';
import { DecryptedVote } from './types';

describe('Property 2: Vote Encryption During Open Voting', () => {
  // Pre-generate key pairs to avoid expensive key generation in each test iteration
  let chairKeyPair: { publicKey: string; privateKey: string };
  let wrongKeyPairs: Array<{ publicKey: string; privateKey: string }>;

  beforeAll(async () => {
    // Generate chair's key pair once
    chairKeyPair = await generateKeyPair();
    // Generate a few wrong key pairs for testing
    wrongKeyPairs = await Promise.all([generateKeyPair(), generateKeyPair(), generateKeyPair()]);
  }, 60000); // 60 second timeout for key generation

  /**
   * Property: While voting is open, encrypted votes cannot be decrypted without
   * the chair's private key
   *
   * This test verifies that:
   * 1. Votes are encrypted and cannot be read without the private key
   * 2. Only the correct private key can decrypt votes
   * 3. Encrypted votes remain confidential during the voting period
   */
  it('should ensure encrypted votes cannot be decrypted without the correct private key', async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate arbitrary vote types
        fc.oneof(
          fc.record({
            type: fc.constant('yes' as const),
            value: fc.constant(true),
          }),
          fc.record({
            type: fc.constant('no' as const),
            value: fc.constant(false),
          }),
          fc.record({
            type: fc.constant('abstain' as const),
            value: fc.constant(undefined),
          }),
          fc.record({
            type: fc.constant('ranked' as const),
            value: fc.array(fc.string({ minLength: 1, maxLength: 20 }), {
              minLength: 1,
              maxLength: 10,
            }),
          }),
          fc.record({
            type: fc.constant('approval' as const),
            value: fc.array(fc.string({ minLength: 1, maxLength: 20 }), {
              minLength: 1,
              maxLength: 10,
            }),
          })
        ),
        async (voteData) => {
          const vote: DecryptedVote = {
            type: voteData.type,
            value: voteData.value,
            timestamp: new Date(),
            receiptCode: 'test-receipt',
          };

          // Encrypt the vote with chair's public key
          const encrypted = await encryptVote(vote, {
            publicKey: chairKeyPair.publicKey,
          });

          // Property 1: Encrypted vote should not reveal vote content in plaintext
          // Note: Short strings like "no" or "false" might appear by chance in base64,
          // so we check if the full JSON representation appears, or decode and check
          let ciphertextDoesNotRevealVote = true;
          try {
            const decoded = Buffer.from(encrypted.ciphertext, 'base64').toString('utf8');
            // Check if the decoded ciphertext contains the vote data in plaintext
            ciphertextDoesNotRevealVote =
              !decoded.includes(JSON.stringify(vote.value)) &&
              !decoded.includes(vote.type) &&
              !decoded.includes(JSON.stringify(vote));
          } catch {
            // If decoding fails, the ciphertext is binary (good)
            ciphertextDoesNotRevealVote = true;
          }

          // Property 2: Cannot decrypt with wrong private key
          const wrongKeyPair = wrongKeyPairs[0]; // Use pre-generated wrong key
          let canDecryptWithWrongKey = false;
          try {
            await decryptVote(encrypted, {
              privateKey: wrongKeyPair.privateKey,
            });
            canDecryptWithWrongKey = true;
          } catch {
            // Expected to fail
            canDecryptWithWrongKey = false;
          }

          // Property 3: Can decrypt with correct private key
          let canDecryptWithCorrectKey = false;
          try {
            const decrypted = await decryptVote(encrypted, {
              privateKey: chairKeyPair.privateKey,
            });
            canDecryptWithCorrectKey =
              decrypted.type === vote.type &&
              JSON.stringify(decrypted.value) === JSON.stringify(vote.value);
          } catch {
            canDecryptWithCorrectKey = false;
          }

          return ciphertextDoesNotRevealVote && !canDecryptWithWrongKey && canDecryptWithCorrectKey;
        }
      ),
      { numRuns: 100 } // Minimum 100 iterations as per design document
    );
  });

  /**
   * Property: Encrypted votes should be computationally infeasible to decrypt
   * without the private key (ciphertext-only attack resistance)
   */
  it('should resist ciphertext-only attacks', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            type: fc.constantFrom('yes', 'no', 'abstain') as fc.Arbitrary<'yes' | 'no' | 'abstain'>,
            value: fc.option(fc.boolean(), { nil: undefined }),
          }),
          { minLength: 5, maxLength: 20 }
        ),
        async (votesData) => {
          // Encrypt multiple votes
          const encryptedVotes = await Promise.all(
            votesData.map(async (voteData) => {
              const vote: DecryptedVote = {
                type: voteData.type,
                value: voteData.value,
                timestamp: new Date(),
                receiptCode: '',
              };
              return encryptVote(vote, {
                publicKey: chairKeyPair.publicKey,
              });
            })
          );

          // Property 1: All ciphertexts should be unique (even for same vote)
          const uniqueCiphertexts = new Set(encryptedVotes.map((ev) => ev.ciphertext));
          const allUnique = uniqueCiphertexts.size === encryptedVotes.length;

          // Property 2: Ciphertexts should not reveal vote patterns
          // (e.g., same votes should not produce similar ciphertexts)
          let revealsPattern = false;
          for (let i = 0; i < votesData.length - 1; i++) {
            for (let j = i + 1; j < votesData.length; j++) {
              if (votesData[i].type === votesData[j].type) {
                // Same vote type - ciphertexts should be completely different
                const cipher1 = encryptedVotes[i].ciphertext;
                const cipher2 = encryptedVotes[j].ciphertext;

                // Check if ciphertexts share significant common substrings
                // (which would indicate a pattern leak)
                const minLength = Math.min(cipher1.length, cipher2.length);
                let commonChars = 0;
                for (let k = 0; k < minLength; k++) {
                  if (cipher1[k] === cipher2[k]) commonChars++;
                }
                // Allow up to 5% common characters (due to base64 encoding randomness)
                if (commonChars / minLength > 0.05) {
                  revealsPattern = true;
                  break;
                }
              }
            }
            if (revealsPattern) break;
          }

          return allUnique && !revealsPattern;
        }
      ),
      { numRuns: 50 } // Fewer runs due to computational cost
    );
  });

  /**
   * Property: Only the chair's private key can decrypt votes
   * Multiple different private keys should all fail to decrypt
   */
  it('should ensure only the correct private key can decrypt votes', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          type: fc.constantFrom('yes', 'no', 'abstain') as fc.Arbitrary<'yes' | 'no' | 'abstain'>,
          value: fc.option(fc.boolean(), { nil: undefined }),
        }),
        fc.integer({ min: 1, max: 3 }), // Number of wrong keys to try (use pre-generated)
        async (voteData, wrongKeyIndex) => {
          const vote: DecryptedVote = {
            type: voteData.type,
            value: voteData.value,
            timestamp: new Date(),
            receiptCode: '',
          };

          // Encrypt with chair's public key
          const encrypted = await encryptVote(vote, {
            publicKey: chairKeyPair.publicKey,
          });

          // Try to decrypt with wrong keys (use pre-generated keys)
          const keysToTry = wrongKeyPairs.slice(0, wrongKeyIndex);

          let anyWrongKeySucceeded = false;
          for (const wrongKey of keysToTry) {
            try {
              await decryptVote(encrypted, {
                privateKey: wrongKey.privateKey,
              });
              anyWrongKeySucceeded = true;
              break;
            } catch {
              // Expected to fail
            }
          }

          // Verify correct key works
          let correctKeyWorks = false;
          try {
            const decrypted = await decryptVote(encrypted, {
              privateKey: chairKeyPair.privateKey,
            });
            correctKeyWorks = decrypted.type === vote.type;
          } catch {
            correctKeyWorks = false;
          }

          return !anyWrongKeySucceeded && correctKeyWorks;
        }
      ),
      { numRuns: 50 } // Fewer runs due to key generation cost
    );
  });

  /**
   * Property: Encrypted votes should remain confidential even if an attacker
   * has access to the public key and multiple ciphertexts
   */
  it('should maintain confidentiality with known-plaintext attack resistance', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            type: fc.constantFrom('yes', 'no') as fc.Arbitrary<'yes' | 'no'>,
            value: fc.boolean(),
          }),
          { minLength: 10, maxLength: 20 }
        ),
        async (votesData) => {
          // Simulate scenario: attacker knows some plaintext votes and their ciphertexts
          const knownVotes = votesData.slice(0, 5);
          const unknownVotes = votesData.slice(5);

          // Encrypt all votes
          const knownEncrypted = await Promise.all(
            knownVotes.map(async (voteData) => {
              const vote: DecryptedVote = {
                type: voteData.type,
                value: voteData.value,
                timestamp: new Date(),
                receiptCode: '',
              };
              return {
                vote,
                encrypted: await encryptVote(vote, { publicKey: chairKeyPair.publicKey }),
              };
            })
          );

          const unknownEncrypted = await Promise.all(
            unknownVotes.map(async (voteData) => {
              const vote: DecryptedVote = {
                type: voteData.type,
                value: voteData.value,
                timestamp: new Date(),
                receiptCode: '',
              };
              return encryptVote(vote, { publicKey: chairKeyPair.publicKey });
            })
          );

          // Property: Attacker cannot determine unknown votes from known plaintext-ciphertext pairs
          // We verify this by checking that ciphertexts don't reveal patterns

          // Check if any unknown ciphertext matches or is similar to known ciphertexts
          let canInferUnknownVotes = false;
          for (const unknownCipher of unknownEncrypted) {
            for (const known of knownEncrypted) {
              // If ciphertexts are identical (should never happen with OAEP)
              if (unknownCipher.ciphertext === known.encrypted.ciphertext) {
                canInferUnknownVotes = true;
                break;
              }

              // If ciphertexts share significant similarity (should not happen)
              const cipher1 = unknownCipher.ciphertext;
              const cipher2 = known.encrypted.ciphertext;
              const minLength = Math.min(cipher1.length, cipher2.length);
              let commonChars = 0;
              for (let k = 0; k < minLength; k++) {
                if (cipher1[k] === cipher2[k]) commonChars++;
              }
              // More than 10% similarity would be suspicious
              if (commonChars / minLength > 0.1) {
                canInferUnknownVotes = true;
                break;
              }
            }
            if (canInferUnknownVotes) break;
          }

          return !canInferUnknownVotes;
        }
      ),
      { numRuns: 30 } // Fewer runs due to computational cost
    );
  });

  /**
   * Property: Encryption should be deterministic only with the same random padding
   * (RSA-OAEP includes random padding, so same plaintext produces different ciphertexts)
   */
  it('should produce different ciphertexts for the same vote due to random padding', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          type: fc.constantFrom('yes', 'no', 'abstain') as fc.Arbitrary<'yes' | 'no' | 'abstain'>,
          value: fc.option(fc.boolean(), { nil: undefined }),
        }),
        fc.integer({ min: 3, max: 10 }), // Number of times to encrypt same vote
        async (voteData, encryptionCount) => {
          const vote: DecryptedVote = {
            type: voteData.type,
            value: voteData.value,
            timestamp: new Date(),
            receiptCode: '',
          };

          // Encrypt the same vote multiple times
          const encryptedVotes = await Promise.all(
            Array.from({ length: encryptionCount }, () =>
              encryptVote(vote, { publicKey: chairKeyPair.publicKey })
            )
          );

          // Property: All ciphertexts should be different (due to random OAEP padding)
          const uniqueCiphertexts = new Set(encryptedVotes.map((ev) => ev.ciphertext));
          const allDifferent = uniqueCiphertexts.size === encryptionCount;

          // Property: All should decrypt to the same vote
          const decryptedVotes = await Promise.all(
            encryptedVotes.map((ev) => decryptVote(ev, { privateKey: chairKeyPair.privateKey }))
          );

          const allDecryptCorrectly = decryptedVotes.every(
            (dv) => dv.type === vote.type && JSON.stringify(dv.value) === JSON.stringify(vote.value)
          );

          return allDifferent && allDecryptCorrectly;
        }
      ),
      { numRuns: 100 }
    );
  });
});
