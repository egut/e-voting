/**
 * Property-based tests for blind signature unlinkability
 *
 * Property 1: Blind Signature Unlinkability
 * For any member who casts a vote using a blind signature token, the encrypted vote
 * stored in the database cannot be linked back to the member's identity without the
 * member's blinding factor.
 *
 * Validates: Requirements 1.2
 *
 * Feature: digital-voting-system, Property 1: Blind Signature Unlinkability
 */

import fc from 'fast-check';
import {
  generateBlindToken,
  blindToken,
  signBlindedToken,
  unblindSignature,
} from './blind-signature';
import { generateKeyPair } from './key-generation';

describe('Property 1: Blind Signature Unlinkability', () => {
  /**
   * Property: Given two votes from the same member at different times,
   * no one can determine they came from the same member
   *
   * This test verifies that:
   * 1. Two blind tokens from the same member produce different blinded tokens
   * 2. The blinded tokens appear random and uncorrelated
   * 3. The signatures on different tokens are different
   * 4. Without the blinding factor, tokens cannot be linked
   */
  it('should ensure blind signatures cannot be linked to member identity', async () => {
    // Generate a server key pair for signing
    const serverKeyPair = await generateKeyPair();

    await fc.assert(
      fc.asyncProperty(
        // Generate arbitrary member IDs (alphanumeric to avoid base64 collision issues)
        fc.stringMatching(/^[a-zA-Z0-9]{2,20}$/),
        fc.integer({ min: 2, max: 10 }), // Number of votes from the same member (min 2 for comparison)
        async (memberId, voteCount) => {
          // Generate multiple blind tokens for the same member
          const blindTokens = await Promise.all(
            Array.from({ length: voteCount }, () =>
              generateBlindToken(memberId, serverKeyPair.publicKey)
            )
          );

          // Blind each token
          const blindedTokens = blindTokens.map((bt) => blindToken(bt.token, bt.blindingFactor));

          // Server signs each blinded token (without knowing the member)
          const blindSignatures = await Promise.all(
            blindedTokens.map((bt) => signBlindedToken(bt, serverKeyPair.privateKey))
          );

          // Client unblinds each signature
          const unblinedSignatures = await Promise.all(
            blindTokens.map((bt, i) => unblindSignature(blindSignatures[i], bt.blindingFactor))
          );

          // Property 1: All blinded tokens should be different (unlinkable)
          const uniqueBlindedTokens = new Set(blindedTokens);
          const blindedTokensUnique = uniqueBlindedTokens.size === blindedTokens.length;

          // Property 2: All tokens should be different
          const uniqueTokens = new Set(blindTokens.map((bt) => bt.token));
          const tokensUnique = uniqueTokens.size === blindTokens.length;

          // Property 3: All blinding factors should be different
          const uniqueBlindingFactors = new Set(blindTokens.map((bt) => bt.blindingFactor));
          const blindingFactorsUnique = uniqueBlindingFactors.size === blindTokens.length;

          // Property 4: All signatures should be different (even for same member)
          const uniqueSignatures = new Set(unblinedSignatures);
          const signaturesUnique = uniqueSignatures.size === unblinedSignatures.length;

          // Property 5: Blinded tokens should not reveal member ID
          // For short member IDs (< 4 chars), random matches in base64 are possible
          // so we only check for longer IDs or require multiple matches
          const blindedTokensRevealMemberId = blindedTokens.some((bt) => {
            if (memberId.length < 4) {
              // For short IDs, only flag if it appears multiple times or in decoded form
              const countInBase64 = (bt.match(new RegExp(memberId, 'g')) || []).length;
              if (countInBase64 > 1) return true; // Multiple occurrences unlikely by chance

              try {
                const decoded = Buffer.from(bt, 'base64').toString('utf8');
                return decoded.includes(memberId);
              } catch {
                return false;
              }
            } else {
              // For longer IDs, a single match is significant
              if (bt.includes(memberId)) return true;
              try {
                const decoded = Buffer.from(bt, 'base64').toString('utf8');
                return decoded.includes(memberId);
              } catch {
                return false;
              }
            }
          });

          return (
            blindedTokensUnique &&
            tokensUnique &&
            blindingFactorsUnique &&
            signaturesUnique &&
            !blindedTokensRevealMemberId
          );
        }
      ),
      { numRuns: 100 } // Minimum 100 iterations as per design document
    );
  });

  /**
   * Property: Without the blinding factor, an observer cannot link a blinded token
   * to its original token
   */
  it('should prevent linking blinded tokens to original tokens without blinding factor', async () => {
    const serverKeyPair = await generateKeyPair();

    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.string({ minLength: 1, maxLength: 50 }), { minLength: 2, maxLength: 10 }),
        async (memberIds) => {
          // Generate blind tokens for different members
          const blindTokens = await Promise.all(
            memberIds.map((id) => generateBlindToken(id, serverKeyPair.publicKey))
          );

          // Blind each token
          const blindedTokens = blindTokens.map((bt) => blindToken(bt.token, bt.blindingFactor));

          // An observer sees: blindedTokens and original tokens
          // They should NOT be able to match them without blinding factors

          // Property: No blinded token should equal any original token
          let canDirectlyLink = false;
          for (const blinded of blindedTokens) {
            for (const bt of blindTokens) {
              if (blinded === bt.token || blinded.includes(bt.token)) {
                canDirectlyLink = true;
                break;
              }
            }
            if (canDirectlyLink) break;
          }

          // Property: Blinded tokens should be statistically independent from original tokens
          // (no obvious correlation)
          return !canDirectlyLink;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: The same member generating multiple tokens should produce
   * statistically independent blinded tokens
   */
  it('should produce statistically independent blinded tokens for the same member', async () => {
    const serverKeyPair = await generateKeyPair();

    await fc.assert(
      fc.asyncProperty(fc.string({ minLength: 1, maxLength: 50 }), async (memberId) => {
        // Generate 5 blind tokens for the same member
        const blindTokens = await Promise.all(
          Array.from({ length: 5 }, () => generateBlindToken(memberId, serverKeyPair.publicKey))
        );

        // Blind each token
        const blindedTokens = blindTokens.map((bt) => blindToken(bt.token, bt.blindingFactor));

        // Property 1: All blinded tokens should be unique
        const uniqueBlindedTokens = new Set(blindedTokens);
        const allUnique = uniqueBlindedTokens.size === blindedTokens.length;

        // Property 2: Tokens should be different from each other
        const uniqueTokens = new Set(blindTokens.map((bt) => bt.token));
        const tokensUnique = uniqueTokens.size === blindTokens.length;

        // Property 3: Blinding factors should be unique
        const uniqueBlindingFactors = new Set(blindTokens.map((bt) => bt.blindingFactor));
        const blindingFactorsUnique = uniqueBlindingFactors.size === blindTokens.length;

        return allUnique && tokensUnique && blindingFactorsUnique;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Blinding factors must remain secret for unlinkability
   * If blinding factors are exposed, linkability becomes possible
   */
  it('should demonstrate that blinding factors enable linkability when exposed', async () => {
    const serverKeyPair = await generateKeyPair();

    await fc.assert(
      fc.asyncProperty(fc.string({ minLength: 1, maxLength: 50 }), async (memberId) => {
        // Generate a blind token
        const blindToken1 = await generateBlindToken(memberId, serverKeyPair.publicKey);

        // Blind the token
        const blinded1 = blindToken(blindToken1.token, blindToken1.blindingFactor);

        // Property: With the blinding factor, we can link the blinded token to the original
        // We can re-blind the original token with the same blinding factor and get the same result
        const reblinded = blindToken(blindToken1.token, blindToken1.blindingFactor);
        const canLinkWithBlindingFactor = reblinded === blinded1;

        // Property: Without the blinding factor, we cannot link them
        // Generate a different blinding factor
        const differentBlindToken = await generateBlindToken('different', serverKeyPair.publicKey);
        const differentBlinded = blindToken(blindToken1.token, differentBlindToken.blindingFactor);
        const cannotLinkWithoutCorrectFactor = differentBlinded !== blinded1;

        // Property: The blinded token should not directly reveal the original token
        const blindedDoesNotRevealOriginal = !blinded1.includes(blindToken1.token);

        // All properties should hold
        return (
          canLinkWithBlindingFactor &&
          cannotLinkWithoutCorrectFactor &&
          blindedDoesNotRevealOriginal
        );
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Multiple members should produce unlinkable blind tokens
   * An observer cannot determine which tokens belong to which member
   */
  it('should ensure tokens from different members are unlinkable', async () => {
    const serverKeyPair = await generateKeyPair();

    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.stringMatching(/^[a-zA-Z0-9]{3,20}$/), // Alphanumeric only, 3-20 chars
          { minLength: 3, maxLength: 10 }
        ),
        async (memberIds) => {
          // Ensure unique member IDs
          const uniqueMemberIds = Array.from(new Set(memberIds));
          if (uniqueMemberIds.length < 2) return true; // Skip if not enough unique members

          // Generate one blind token per member
          const blindTokens = await Promise.all(
            uniqueMemberIds.map((id) => generateBlindToken(id, serverKeyPair.publicKey))
          );

          // Blind each token
          const blindedTokens = blindTokens.map((bt) => blindToken(bt.token, bt.blindingFactor));

          // Property 1: All blinded tokens should be unique
          const uniqueBlindedTokens = new Set(blindedTokens);
          const allUnique = uniqueBlindedTokens.size === blindedTokens.length;

          // Property 2: Blinded tokens should not obviously contain any member ID
          // We check if the member ID appears as a substring in the base64 or decoded form
          const blindedTokensRevealMemberIds = blindedTokens.some((bt) => {
            return uniqueMemberIds.some((memberId) => {
              // Check if member ID appears in base64 string
              if (bt.includes(memberId)) return true;
              // Check decoded form (but be lenient with binary data)
              try {
                const decoded = Buffer.from(bt, 'base64').toString('utf8');
                // Only flag if the member ID appears as a clear substring
                return decoded.includes(memberId);
              } catch {
                return false;
              }
            });
          });

          // Property 3: Cannot match blinded tokens to member IDs without blinding factors
          // (no obvious pattern or correlation)
          return allUnique && !blindedTokensRevealMemberIds;
        }
      ),
      { numRuns: 100 }
    );
  });
});
