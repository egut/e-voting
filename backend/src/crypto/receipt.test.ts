/**
 * Unit tests for receipt code generation and verification
 *
 * These tests verify the basic functionality of receipt code generation,
 * verification, and formatting.
 *
 * Requirements: 3.1, 3.2, 3.4
 */

import {
  generateReceiptCode,
  generateFullReceiptCode,
  verifyReceiptCode,
  verifyReceiptCodeAndGetVote,
  formatReceiptCode,
  isValidReceiptCodeFormat,
  generateReceiptCodes,
  checkReceiptCodeCollisions,
} from './receipt';
import { DecryptedVote, PublishedVote } from './types';

describe('Receipt Code Generation and Verification', () => {
  describe('generateReceiptCode', () => {
    it('should generate a receipt code for a vote', async () => {
      const vote: DecryptedVote = {
        type: 'yes',
        value: true,
        timestamp: new Date('2025-01-01T12:00:00Z'),
        receiptCode: '',
      };

      const receiptCode = await generateReceiptCode(vote);

      expect(receiptCode).toBeDefined();
      expect(receiptCode.length).toBe(16);
      expect(/^[0-9A-F]{16}$/.test(receiptCode)).toBe(true);
    });

    it('should generate different codes for different votes', async () => {
      const vote1: DecryptedVote = {
        type: 'yes',
        value: true,
        timestamp: new Date('2025-01-01T12:00:00Z'),
        receiptCode: '',
      };

      const vote2: DecryptedVote = {
        type: 'no',
        value: false,
        timestamp: new Date('2025-01-01T12:00:00Z'),
        receiptCode: '',
      };

      const code1 = await generateReceiptCode(vote1);
      const code2 = await generateReceiptCode(vote2);

      expect(code1).not.toEqual(code2);
    });

    it('should generate different codes for same vote at different times', async () => {
      const vote1: DecryptedVote = {
        type: 'yes',
        value: true,
        timestamp: new Date('2025-01-01T12:00:00Z'),
        receiptCode: '',
      };

      const vote2: DecryptedVote = {
        type: 'yes',
        value: true,
        timestamp: new Date('2025-01-01T12:01:00Z'),
        receiptCode: '',
      };

      const code1 = await generateReceiptCode(vote1);
      const code2 = await generateReceiptCode(vote2);

      expect(code1).not.toEqual(code2);
    });

    it('should generate different codes even for identical votes (due to salt)', async () => {
      const vote: DecryptedVote = {
        type: 'yes',
        value: true,
        timestamp: new Date('2025-01-01T12:00:00Z'),
        receiptCode: '',
      };

      const code1 = await generateReceiptCode(vote);
      const code2 = await generateReceiptCode(vote);

      // Without providing the same salt, codes should differ
      expect(code1).not.toEqual(code2);
    });

    it('should generate same code with same salt', async () => {
      const vote: DecryptedVote = {
        type: 'yes',
        value: true,
        timestamp: new Date('2025-01-01T12:00:00Z'),
        receiptCode: '',
      };

      const salt = 'test-salt-12345';
      const code1 = await generateReceiptCode(vote, salt);
      const code2 = await generateReceiptCode(vote, salt);

      expect(code1).toEqual(code2);
    });
  });

  describe('generateFullReceiptCode', () => {
    it('should generate a full 64-character receipt code', async () => {
      const vote: DecryptedVote = {
        type: 'yes',
        value: true,
        timestamp: new Date('2025-01-01T12:00:00Z'),
        receiptCode: '',
      };

      const fullCode = await generateFullReceiptCode(vote);

      expect(fullCode).toBeDefined();
      expect(fullCode.length).toBe(64);
      expect(/^[0-9A-F]{64}$/.test(fullCode)).toBe(true);
    });

    it('should be deterministic with same salt', async () => {
      const vote: DecryptedVote = {
        type: 'yes',
        value: true,
        timestamp: new Date('2025-01-01T12:00:00Z'),
        receiptCode: '',
      };

      const salt = 'test-salt';
      const code1 = await generateFullReceiptCode(vote, salt);
      const code2 = await generateFullReceiptCode(vote, salt);

      expect(code1).toEqual(code2);
    });
  });

  describe('verifyReceiptCode', () => {
    it('should verify a valid receipt code', async () => {
      const vote: DecryptedVote = {
        type: 'yes',
        value: true,
        timestamp: new Date('2025-01-01T12:00:00Z'),
        receiptCode: '',
      };

      const receiptCode = await generateReceiptCode(vote);

      const publishedVotes: PublishedVote[] = [
        {
          receiptCode,
          voteData: vote,
        },
      ];

      const isValid = await verifyReceiptCode(receiptCode, publishedVotes);
      expect(isValid).toBe(true);
    });

    it('should reject an invalid receipt code', async () => {
      const publishedVotes: PublishedVote[] = [
        {
          receiptCode: 'A1B2C3D4E5F6A7B8',
          voteData: {
            type: 'yes',
            value: true,
            timestamp: new Date(),
            receiptCode: '',
          },
        },
      ];

      const isValid = await verifyReceiptCode('INVALID123456789', publishedVotes);
      expect(isValid).toBe(false);
    });

    it('should handle formatted receipt codes', async () => {
      const publishedVotes: PublishedVote[] = [
        {
          receiptCode: 'A1B2C3D4E5F6A7B8',
          voteData: {
            type: 'yes',
            value: true,
            timestamp: new Date(),
            receiptCode: '',
          },
        },
      ];

      // Test with dashes
      const isValid = await verifyReceiptCode('A1B2-C3D4-E5F6-A7B8', publishedVotes);
      expect(isValid).toBe(true);
    });

    it('should be case-insensitive', async () => {
      const publishedVotes: PublishedVote[] = [
        {
          receiptCode: 'A1B2C3D4E5F6A7B8',
          voteData: {
            type: 'yes',
            value: true,
            timestamp: new Date(),
            receiptCode: '',
          },
        },
      ];

      const isValid = await verifyReceiptCode('a1b2c3d4e5f6a7b8', publishedVotes);
      expect(isValid).toBe(true);
    });

    it('should find receipt code in large list', async () => {
      const targetCode = 'TARGET1234567890';
      const publishedVotes: PublishedVote[] = Array.from({ length: 100 }, (_, i) => ({
        receiptCode: i === 50 ? targetCode : `CODE${i.toString().padStart(12, '0')}`,
        voteData: {
          type: 'yes',
          value: true,
          timestamp: new Date(),
          receiptCode: '',
        },
      }));

      const isValid = await verifyReceiptCode(targetCode, publishedVotes);
      expect(isValid).toBe(true);
    });
  });

  describe('verifyReceiptCodeAndGetVote', () => {
    it('should return vote data for valid receipt code', async () => {
      const vote: DecryptedVote = {
        type: 'yes',
        value: true,
        timestamp: new Date('2025-01-01T12:00:00Z'),
        receiptCode: '',
      };

      const receiptCode = await generateReceiptCode(vote);

      const publishedVotes: PublishedVote[] = [
        {
          receiptCode,
          voteData: vote,
        },
      ];

      const result = await verifyReceiptCodeAndGetVote(receiptCode, publishedVotes);
      expect(result).not.toBeNull();
      expect(result?.type).toBe('yes');
      expect(result?.value).toBe(true);
    });

    it('should return null for invalid receipt code', async () => {
      const publishedVotes: PublishedVote[] = [
        {
          receiptCode: 'A1B2C3D4E5F6A7B8',
          voteData: {
            type: 'yes',
            value: true,
            timestamp: new Date(),
            receiptCode: '',
          },
        },
      ];

      const result = await verifyReceiptCodeAndGetVote('INVALID123456789', publishedVotes);
      expect(result).toBeNull();
    });
  });

  describe('formatReceiptCode', () => {
    it('should format receipt code with dashes', () => {
      const formatted = formatReceiptCode('A1B2C3D4E5F6A7B8');
      expect(formatted).toBe('A1B2-C3D4-E5F6-A7B8');
    });

    it('should handle already formatted codes', () => {
      const formatted = formatReceiptCode('A1B2-C3D4-E5F6-A7B8');
      expect(formatted).toBe('A1B2-C3D4-E5F6-A7B8');
    });

    it('should handle lowercase codes', () => {
      const formatted = formatReceiptCode('a1b2c3d4e5f6a7b8');
      expect(formatted).toBe('A1B2-C3D4-E5F6-A7B8');
    });

    it('should handle codes with spaces', () => {
      const formatted = formatReceiptCode('A1B2 C3D4 E5F6 A7B8');
      expect(formatted).toBe('A1B2-C3D4-E5F6-A7B8');
    });
  });

  describe('isValidReceiptCodeFormat', () => {
    it('should validate correct format', () => {
      expect(isValidReceiptCodeFormat('A1B2C3D4E5F6A7B8')).toBe(true);
      expect(isValidReceiptCodeFormat('A1B2-C3D4-E5F6-A7B8')).toBe(true);
      expect(isValidReceiptCodeFormat('a1b2c3d4e5f6a7b8')).toBe(true);
      expect(isValidReceiptCodeFormat('0123456789ABCDEF')).toBe(true);
    });

    it('should reject invalid formats', () => {
      expect(isValidReceiptCodeFormat('TOO-SHORT')).toBe(false);
      expect(isValidReceiptCodeFormat('A1B2C3D4E5F6G7H8TOOLONG')).toBe(false);
      expect(isValidReceiptCodeFormat('INVALID-CHARS!@#')).toBe(false);
      expect(isValidReceiptCodeFormat('')).toBe(false);
    });
  });

  describe('generateReceiptCodes', () => {
    it('should generate codes for multiple votes', async () => {
      const votes: DecryptedVote[] = [
        { type: 'yes', value: true, timestamp: new Date(), receiptCode: '' },
        { type: 'no', value: false, timestamp: new Date(), receiptCode: '' },
        { type: 'abstain', timestamp: new Date(), receiptCode: '' },
      ];

      const codes = await generateReceiptCodes(votes);

      expect(codes).toHaveLength(3);
      codes.forEach((code) => {
        expect(code.length).toBe(16);
        expect(/^[0-9A-F]{16}$/.test(code)).toBe(true);
      });
    });

    it('should generate unique codes for each vote', async () => {
      const votes: DecryptedVote[] = Array.from({ length: 10 }, (_, i) => ({
        type: 'yes' as const,
        value: true,
        timestamp: new Date(Date.now() + i * 1000),
        receiptCode: '',
      }));

      const codes = await generateReceiptCodes(votes);
      const uniqueCodes = new Set(codes);

      expect(uniqueCodes.size).toBe(codes.length);
    });
  });

  describe('checkReceiptCodeCollisions', () => {
    it('should detect no collisions in unique codes', () => {
      const codes = ['A1B2C3D4E5F6A7B8', 'B2C3D4E5F6A7B8C9', 'C3D4E5F6A7B8C9D0'];

      const result = checkReceiptCodeCollisions(codes);

      expect(result.hasCollisions).toBe(false);
      expect(result.duplicates).toHaveLength(0);
      expect(result.uniqueCount).toBe(3);
    });

    it('should detect collisions in duplicate codes', () => {
      const codes = [
        'A1B2C3D4E5F6A7B8',
        'B2C3D4E5F6A7B8C9',
        'A1B2C3D4E5F6A7B8', // Duplicate
      ];

      const result = checkReceiptCodeCollisions(codes);

      expect(result.hasCollisions).toBe(true);
      expect(result.duplicates).toContain('A1B2C3D4E5F6A7B8');
      expect(result.uniqueCount).toBe(2);
    });

    it('should handle formatted codes', () => {
      const codes = [
        'A1B2-C3D4-E5F6-A7B8',
        'B2C3-D4E5-F6A7-B8C9',
        'A1B2C3D4E5F6A7B8', // Same as first, different format
      ];

      const result = checkReceiptCodeCollisions(codes);

      expect(result.hasCollisions).toBe(true);
      expect(result.duplicates).toContain('A1B2C3D4E5F6A7B8');
    });
  });
});
