/**
 * Property-based tests for receipt code uniqueness and verification
 *
 * Property 4: Receipt Code Uniqueness
 * Receipt codes must be unique across all votes to prevent collisions.
 *
 * Property 5: Receipt Verification
 * Receipt verification must work correctly for all valid receipt codes.
 *
 * Validates: Requirements 3.1, 3.4
 *
 * Feature: digital-voting-system, Property 4 & 5: Receipt Codes
 */

import fc from 'fast-check';
import {
  generateReceiptCode,
  generateReceiptCodes,
  verifyReceiptCode,
  checkReceiptCodeCollisions,
  isValidReceiptCodeFormat,
} from './receipt';
import { DecryptedVote, PublishedVote } from './types';

describe('Property 4: Receipt Code Uniqueness', () => {
  /**
   * Property: Receipt codes are unique (no collisions)
   *
   * This test verifies that:
   * 1. Different votes produce different receipt codes
   * 2. Receipt codes have sufficient entropy to avoid collisions
   * 3. Large batches of votes produce unique receipt codes
   */
  it('should generate unique receipt codes for different votes', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            type: fc.constantFrom('yes', 'no', 'abstain') as fc.Arbitrary<'yes' | 'no' | 'abstain'>,
            value: fc.option(fc.boolean(), { nil: undefined }),
            timestamp: fc.date({ min: new Date('2025-01-01'), max: new Date('2025-12-31') }),
          }),
          { minLength: 10, maxLength: 100 }
        ),
        async (votesData) => {
          // Generate votes with different timestamps
          const votes: DecryptedVote[] = votesData.map((vd) => ({
            type: vd.type,
            value: vd.value,
            timestamp: vd.timestamp,
            receiptCode: '',
          }));

          // Generate receipt codes
          const receiptCodes = await generateReceiptCodes(votes);

          // Property 1: All receipt codes should be unique
          const uniqueCodes = new Set(receiptCodes);
          const allUnique = uniqueCodes.size === receiptCodes.length;

          // Property 2: All receipt codes should have valid format
          const allValidFormat = receiptCodes.every((code) => isValidReceiptCodeFormat(code));

          // Property 3: No collisions detected
          const collisionCheck = checkReceiptCodeCollisions(receiptCodes);
          const noCollisions = !collisionCheck.hasCollisions;

          return allUnique && allValidFormat && noCollisions;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Receipt codes should be deterministic with the same salt
   * but different without salt
   */
  it('should generate deterministic codes with same salt, random without', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          type: fc.constantFrom('yes', 'no', 'abstain') as fc.Arbitrary<'yes' | 'no' | 'abstain'>,
          value: fc.option(fc.boolean(), { nil: undefined }),
          timestamp: fc.date(),
        }),
        fc.string({ minLength: 8, maxLength: 32 }), // Salt
        async (voteData, salt) => {
          const vote: DecryptedVote = {
            type: voteData.type,
            value: voteData.value,
            timestamp: voteData.timestamp,
            receiptCode: '',
          };

          // Property 1: Same salt produces same code
          const code1 = await generateReceiptCode(vote, salt);
          const code2 = await generateReceiptCode(vote, salt);
          const deterministicWithSalt = code1 === code2;

          // Property 2: Different salts produce different codes
          const code3 = await generateReceiptCode(vote, salt + 'different');
          const differentWithDifferentSalt = code1 !== code3;

          // Property 3: No salt produces different codes each time
          const code4 = await generateReceiptCode(vote);
          const code5 = await generateReceiptCode(vote);
          const randomWithoutSalt = code4 !== code5;

          return deterministicWithSalt && differentWithDifferentSalt && randomWithoutSalt;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Receipt codes should have sufficient entropy to avoid collisions
   * even with large numbers of votes
   */
  it('should avoid collisions in large batches of votes', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 100, max: 500 }), // Number of votes
        async (voteCount) => {
          // Generate many votes with slight variations
          const votes: DecryptedVote[] = Array.from({ length: voteCount }, (_, i) => ({
            type: (i % 3 === 0 ? 'yes' : i % 3 === 1 ? 'no' : 'abstain') as
              | 'yes'
              | 'no'
              | 'abstain',
            value: i % 2 === 0 ? true : i % 2 === 1 ? false : undefined,
            timestamp: new Date(Date.now() + i * 1000),
            receiptCode: '',
          }));

          // Generate receipt codes
          const receiptCodes = await generateReceiptCodes(votes);

          // Property: All codes should be unique
          const uniqueCodes = new Set(receiptCodes);
          const allUnique = uniqueCodes.size === receiptCodes.length;

          // Property: No collisions
          const collisionCheck = checkReceiptCodeCollisions(receiptCodes);
          const noCollisions = !collisionCheck.hasCollisions;

          return allUnique && noCollisions;
        }
      ),
      { numRuns: 20 } // Fewer runs due to computational cost
    );
  });

  /**
   * Property: Receipt codes should be unique even for identical vote content
   * (due to timestamp and salt differences)
   */
  it('should generate unique codes for identical vote content', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          type: fc.constantFrom('yes', 'no', 'abstain') as fc.Arbitrary<'yes' | 'no' | 'abstain'>,
          value: fc.option(fc.boolean(), { nil: undefined }),
        }),
        fc.integer({ min: 5, max: 20 }), // Number of identical votes
        async (voteData, count) => {
          // Generate multiple votes with identical content but different timestamps
          const votes: DecryptedVote[] = Array.from({ length: count }, (_, i) => ({
            type: voteData.type,
            value: voteData.value,
            timestamp: new Date(Date.now() + i * 100), // Slightly different timestamps
            receiptCode: '',
          }));

          // Generate receipt codes
          const receiptCodes = await generateReceiptCodes(votes);

          // Property: All codes should be unique despite identical vote content
          const uniqueCodes = new Set(receiptCodes);
          return uniqueCodes.size === receiptCodes.length;
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Property 5: Receipt Verification', () => {
  /**
   * Property: Receipt verification works correctly
   *
   * This test verifies that:
   * 1. Valid receipt codes are always found
   * 2. Invalid receipt codes are never found
   * 3. Verification is case-insensitive and format-tolerant
   */
  it('should correctly verify valid and invalid receipt codes', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            type: fc.constantFrom('yes', 'no', 'abstain') as fc.Arbitrary<'yes' | 'no' | 'abstain'>,
            value: fc.option(fc.boolean(), { nil: undefined }),
            timestamp: fc.date(),
          }),
          { minLength: 5, maxLength: 20 }
        ),
        async (votesData) => {
          // Generate votes and receipt codes
          const votes: DecryptedVote[] = votesData.map((vd) => ({
            type: vd.type,
            value: vd.value,
            timestamp: vd.timestamp,
            receiptCode: '',
          }));

          const receiptCodes = await generateReceiptCodes(votes);

          // Create published votes list
          const publishedVotes: PublishedVote[] = votes.map((vote, i) => ({
            receiptCode: receiptCodes[i],
            voteData: vote,
          }));

          // Property 1: All valid receipt codes should be found
          const allValidFound = await Promise.all(
            receiptCodes.map((code) => verifyReceiptCode(code, publishedVotes))
          );
          const allValid = allValidFound.every((found) => found === true);

          // Property 2: Invalid receipt codes should not be found
          const invalidCode = '0000000000000000'; // Unlikely to match
          const invalidNotFound = !(await verifyReceiptCode(invalidCode, publishedVotes));

          // Property 3: Case-insensitive verification
          const firstCodeLower = receiptCodes[0].toLowerCase();
          const caseInsensitive = await verifyReceiptCode(firstCodeLower, publishedVotes);

          // Property 4: Format-tolerant verification (with dashes)
          const firstCodeFormatted = receiptCodes[0].match(/.{1,4}/g)?.join('-') ?? receiptCodes[0];
          const formatTolerant = await verifyReceiptCode(firstCodeFormatted, publishedVotes);

          return allValid && invalidNotFound && caseInsensitive && formatTolerant;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Receipt verification should work with large published vote lists
   */
  it('should efficiently verify receipt codes in large lists', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 100, max: 500 }), // Size of published list
        fc.integer({ min: 0, max: 99 }), // Index of code to verify (relative to first 100)
        async (listSize, verifyIndex) => {
          // Generate a large list of votes
          const votes: DecryptedVote[] = Array.from({ length: listSize }, (_, i) => ({
            type: (i % 3 === 0 ? 'yes' : i % 3 === 1 ? 'no' : 'abstain') as
              | 'yes'
              | 'no'
              | 'abstain',
            value: i % 2 === 0 ? true : i % 2 === 1 ? false : undefined,
            timestamp: new Date(Date.now() + i * 1000),
            receiptCode: '',
          }));

          const receiptCodes = await generateReceiptCodes(votes);

          const publishedVotes: PublishedVote[] = votes.map((vote, i) => ({
            receiptCode: receiptCodes[i],
            voteData: vote,
          }));

          // Verify a code from the list
          const codeToVerify = receiptCodes[Math.min(verifyIndex, receiptCodes.length - 1)];
          const found = await verifyReceiptCode(codeToVerify, publishedVotes);

          // Property: Code should be found
          return found === true;
        }
      ),
      { numRuns: 50 } // Fewer runs due to computational cost
    );
  });

  /**
   * Property: Receipt verification should handle edge cases correctly
   */
  it('should handle edge cases in receipt verification', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          type: fc.constantFrom('yes', 'no', 'abstain') as fc.Arbitrary<'yes' | 'no' | 'abstain'>,
          value: fc.option(fc.boolean(), { nil: undefined }),
          timestamp: fc.date(),
        }),
        async (voteData) => {
          const vote: DecryptedVote = {
            type: voteData.type,
            value: voteData.value,
            timestamp: voteData.timestamp,
            receiptCode: '',
          };

          const receiptCode = await generateReceiptCode(vote);

          const publishedVotes: PublishedVote[] = [
            {
              receiptCode,
              voteData: vote,
            },
          ];

          // Property 1: Empty list returns false
          const emptyListResult = await verifyReceiptCode(receiptCode, []);
          const emptyListFalse = emptyListResult === false;

          // Property 2: Code with extra spaces/dashes still works
          const codeWithSpaces = receiptCode.match(/.{1,4}/g)?.join(' ') ?? receiptCode;
          const spacesWork = await verifyReceiptCode(codeWithSpaces, publishedVotes);

          // Property 3: Mixed case works
          const mixedCase =
            receiptCode.substring(0, 8).toLowerCase() + receiptCode.substring(8).toUpperCase();
          const mixedCaseWorks = await verifyReceiptCode(mixedCase, publishedVotes);

          return emptyListFalse && spacesWork && mixedCaseWorks;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Receipt codes should remain verifiable after formatting changes
   */
  it('should verify codes regardless of formatting', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          type: fc.constantFrom('yes', 'no', 'abstain') as fc.Arbitrary<'yes' | 'no' | 'abstain'>,
          value: fc.option(fc.boolean(), { nil: undefined }),
          timestamp: fc.date(),
        }),
        async (voteData) => {
          const vote: DecryptedVote = {
            type: voteData.type,
            value: voteData.value,
            timestamp: voteData.timestamp,
            receiptCode: '',
          };

          const receiptCode = await generateReceiptCode(vote);

          const publishedVotes: PublishedVote[] = [
            {
              receiptCode,
              voteData: vote,
            },
          ];

          // Test various formatting variations
          const variations = [
            receiptCode, // Original
            receiptCode.toLowerCase(), // Lowercase
            receiptCode.toUpperCase(), // Uppercase
            receiptCode.match(/.{1,4}/g)?.join('-') ?? receiptCode, // With dashes
            receiptCode.match(/.{1,4}/g)?.join(' ') ?? receiptCode, // With spaces
            receiptCode.match(/.{1,2}/g)?.join('-') ?? receiptCode, // Different dash pattern
          ];

          // All variations should verify successfully
          const results = await Promise.all(
            variations.map((variant) => verifyReceiptCode(variant, publishedVotes))
          );

          return results.every((result) => result === true);
        }
      ),
      { numRuns: 100 }
    );
  });
});
