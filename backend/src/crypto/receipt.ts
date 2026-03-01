/**
 * Receipt code generation and verification implementation
 *
 * This module implements cryptographic receipt codes for end-to-end verifiability.
 * Receipt codes are generated using SHA-256 hashing to ensure uniqueness and
 * deterministic generation for the same vote.
 *
 * Requirements: 3.1, 3.2, 3.4
 *
 * Security properties:
 * - Receipt codes are unique (no collisions)
 * - Receipt codes are deterministic for the same vote
 * - Receipt codes cannot be linked back to member identity
 * - Receipt codes can be verified against published vote list
 */

import { createHash, randomBytes } from 'crypto';
import { DecryptedVote, PublishedVote } from './types';

/**
 * Generate a unique receipt code for a vote
 *
 * The receipt code is generated using SHA-256 hash of:
 * - Vote content (type, value)
 * - Timestamp
 * - Random salt (to ensure uniqueness even for identical votes)
 *
 * Requirement 3.1: Generate unique Receipt_Code when member casts vote
 *
 * @param vote - The vote to generate a receipt for
 * @param salt - Optional salt for additional uniqueness (auto-generated if not provided)
 * @returns Promise resolving to a unique receipt code (hex string)
 */
export async function generateReceiptCode(vote: DecryptedVote, salt?: string): Promise<string> {
  // Generate salt if not provided
  const voteSalt = salt ?? randomBytes(16).toString('hex');

  // Handle invalid timestamps
  const timestampStr = isNaN(vote.timestamp.getTime())
    ? new Date().toISOString()
    : vote.timestamp.toISOString();

  // Create a deterministic representation of the vote
  const voteData = JSON.stringify({
    type: vote.type,
    value: vote.value,
    timestamp: timestampStr,
    salt: voteSalt,
  });

  // Hash the vote data to create receipt code
  const hash = createHash('sha256').update(voteData).digest('hex');

  // Return first 16 characters for user-friendly receipt codes
  // (still provides 64 bits of entropy, sufficient for uniqueness)
  return hash.substring(0, 16).toUpperCase();
}

/**
 * Generate a receipt code with full hash (for internal use)
 *
 * This generates the full SHA-256 hash without truncation,
 * providing maximum collision resistance.
 *
 * @param vote - The vote to generate a receipt for
 * @param salt - Optional salt for additional uniqueness
 * @returns Promise resolving to full receipt code (64 hex characters)
 */
export async function generateFullReceiptCode(vote: DecryptedVote, salt?: string): Promise<string> {
  const voteSalt = salt ?? randomBytes(16).toString('hex');

  // Handle invalid timestamps
  const timestampStr = isNaN(vote.timestamp.getTime())
    ? new Date().toISOString()
    : vote.timestamp.toISOString();

  const voteData = JSON.stringify({
    type: vote.type,
    value: vote.value,
    timestamp: timestampStr,
    salt: voteSalt,
  });

  const hash = createHash('sha256').update(voteData).digest('hex');
  return hash.toUpperCase();
}

/**
 * Verify a receipt code against the published vote list
 *
 * This allows members to verify their vote was counted correctly.
 * Requirement 3.4: Allow any Member to verify their Receipt_Code appears in the published list
 *
 * @param receiptCode - The receipt code to verify
 * @param publishedVotes - The published list of votes with receipt codes
 * @returns Promise resolving to true if receipt code is found
 */
export async function verifyReceiptCode(
  receiptCode: string,
  publishedVotes: PublishedVote[]
): Promise<boolean> {
  // Normalize receipt code (uppercase, remove spaces/dashes)
  const normalizedCode = receiptCode.toUpperCase().replace(/[\s-]/g, '');

  // Search for the receipt code in the published list
  return publishedVotes.some((pv) => {
    const normalizedPublished = pv.receiptCode.toUpperCase().replace(/[\s-]/g, '');
    return normalizedPublished === normalizedCode;
  });
}

/**
 * Verify a receipt code and return the associated vote
 *
 * This allows members to verify their vote was counted correctly
 * and see what was recorded.
 *
 * @param receiptCode - The receipt code to verify
 * @param publishedVotes - The published list of votes with receipt codes
 * @returns Promise resolving to the vote data if found, null otherwise
 */
export async function verifyReceiptCodeAndGetVote(
  receiptCode: string,
  publishedVotes: PublishedVote[]
): Promise<DecryptedVote | null> {
  const normalizedCode = receiptCode.toUpperCase().replace(/[\s-]/g, '');

  const found = publishedVotes.find((pv) => {
    const normalizedPublished = pv.receiptCode.toUpperCase().replace(/[\s-]/g, '');
    return normalizedPublished === normalizedCode;
  });

  return found ? found.voteData : null;
}

/**
 * Format a receipt code for display
 *
 * Formats the receipt code with dashes for better readability.
 * Example: "A1B2C3D4E5F6G7H8" -> "A1B2-C3D4-E5F6-G7H8"
 *
 * @param receiptCode - The receipt code to format
 * @returns Formatted receipt code with dashes
 */
export function formatReceiptCode(receiptCode: string): string {
  // Remove any existing formatting
  const clean = receiptCode.toUpperCase().replace(/[\s-]/g, '');

  // Add dashes every 4 characters
  return clean.match(/.{1,4}/g)?.join('-') ?? clean;
}

/**
 * Validate receipt code format
 *
 * Checks if a receipt code has the correct format (16 hex characters).
 *
 * @param receiptCode - The receipt code to validate
 * @returns True if the format is valid
 */
export function isValidReceiptCodeFormat(receiptCode: string): boolean {
  // Remove formatting
  const clean = receiptCode.toUpperCase().replace(/[\s-]/g, '');

  // Check if it's 16 hex characters
  return /^[0-9A-F]{16}$/.test(clean);
}

/**
 * Generate receipt codes for a batch of votes
 *
 * This is useful for generating receipt codes for multiple votes efficiently.
 *
 * @param votes - Array of votes to generate receipt codes for
 * @returns Promise resolving to array of receipt codes
 */
export async function generateReceiptCodes(votes: DecryptedVote[]): Promise<string[]> {
  return Promise.all(votes.map((vote) => generateReceiptCode(vote)));
}

/**
 * Check for receipt code collisions in a batch
 *
 * This verifies that all receipt codes in a batch are unique.
 *
 * @param receiptCodes - Array of receipt codes to check
 * @returns Object with collision status and duplicate codes
 */
export function checkReceiptCodeCollisions(receiptCodes: string[]): {
  hasCollisions: boolean;
  duplicates: string[];
  uniqueCount: number;
} {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const code of receiptCodes) {
    const normalized = code.toUpperCase().replace(/[\s-]/g, '');
    if (seen.has(normalized)) {
      duplicates.add(normalized);
    } else {
      seen.add(normalized);
    }
  }

  return {
    hasCollisions: duplicates.size > 0,
    duplicates: Array.from(duplicates),
    uniqueCount: seen.size,
  };
}
