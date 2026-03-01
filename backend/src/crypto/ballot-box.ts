/**
 * Ballot box encryption and decryption implementation
 *
 * This module implements RSA-4096 encryption/decryption for the ballot box.
 * Votes are encrypted with the chair's public key and can only be decrypted
 * with the chair's private key after voting closes.
 *
 * Requirements: 2.1, 2.4, 2.5
 *
 * Security properties:
 * - Uses RSA-OAEP padding for security
 * - Minimum RSA-4096 key size
 * - Votes remain encrypted until chair closes voting
 * - Only the chair's private key can decrypt votes
 */

import { publicEncrypt, privateDecrypt, constants } from 'crypto';
import { EncryptedVote, DecryptedVote, EncryptionOptions, DecryptionOptions } from './types';

/**
 * Encrypt a vote with the chair's public key
 *
 * Requirement 2.1: Encrypt all votes in real-time using the Chair's public key
 *
 * @param vote - The vote to encrypt
 * @param options - Encryption options including public key
 * @returns Promise resolving to an EncryptedVote
 * @throws Error if encryption fails
 */
export async function encryptVote(
  vote: DecryptedVote,
  options: EncryptionOptions
): Promise<EncryptedVote> {
  try {
    // Serialize the vote to JSON
    const voteJson = JSON.stringify({
      type: vote.type,
      value: vote.value,
      timestamp: vote.timestamp.toISOString(),
    });

    // Convert to buffer
    const voteBuffer = Buffer.from(voteJson, 'utf8');

    // Encrypt using RSA-OAEP padding (more secure than PKCS1)
    const padding = options.padding ?? constants.RSA_PKCS1_OAEP_PADDING;

    const ciphertext = publicEncrypt(
      {
        key: options.publicKey,
        padding,
        oaepHash: 'sha256', // Use SHA-256 for OAEP
      },
      voteBuffer
    );

    // Return encrypted vote with metadata
    return {
      ciphertext: ciphertext.toString('base64'),
      timestamp: vote.timestamp,
      receiptCode: '', // Will be filled by receipt generation (task 2.6)
    };
  } catch (error) {
    throw new Error(
      `Failed to encrypt vote: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Decrypt a single vote with the chair's private key
 *
 * Requirement 2.4: Decrypt the Ballot_Box using the Chair's private key
 *
 * @param encryptedVote - The encrypted vote to decrypt
 * @param options - Decryption options including private key
 * @returns Promise resolving to a DecryptedVote
 * @throws Error if decryption fails
 */
export async function decryptVote(
  encryptedVote: EncryptedVote,
  options: DecryptionOptions
): Promise<DecryptedVote> {
  try {
    // Decode the ciphertext from base64
    const cipherBuffer = Buffer.from(encryptedVote.ciphertext, 'base64');

    // Decrypt using RSA-OAEP padding
    const padding = options.padding ?? constants.RSA_PKCS1_OAEP_PADDING;

    const decryptedBuffer = privateDecrypt(
      {
        key: options.privateKey,
        padding,
        oaepHash: 'sha256', // Must match encryption
      },
      cipherBuffer
    );

    // Parse the decrypted JSON
    const voteJson = decryptedBuffer.toString('utf8');
    const parsed = JSON.parse(voteJson);

    // Reconstruct the DecryptedVote
    return {
      type: parsed.type,
      value: parsed.value,
      timestamp: new Date(parsed.timestamp),
      receiptCode: encryptedVote.receiptCode,
    };
  } catch (error) {
    throw new Error(
      `Failed to decrypt vote: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Decrypt all votes in the ballot box (batch operation)
 *
 * Requirement 2.4: Decrypt the Ballot_Box using the Chair's private key
 * Requirement 2.5: Handle decryption failures with recovery options
 *
 * @param encryptedVotes - Array of encrypted votes
 * @param options - Decryption options including private key
 * @returns Promise resolving to array of DecryptedVotes and array of failures
 * @throws Error if all votes fail to decrypt
 */
export async function decryptBallotBox(
  encryptedVotes: EncryptedVote[],
  options: DecryptionOptions
): Promise<{
  decryptedVotes: DecryptedVote[];
  failures: Array<{ index: number; error: string; encryptedVote: EncryptedVote }>;
}> {
  const decryptedVotes: DecryptedVote[] = [];
  const failures: Array<{ index: number; error: string; encryptedVote: EncryptedVote }> = [];

  // Decrypt each vote, collecting failures for recovery
  for (let i = 0; i < encryptedVotes.length; i++) {
    try {
      const decrypted = await decryptVote(encryptedVotes[i], options);
      decryptedVotes.push(decrypted);
    } catch (error) {
      // Log the failure but continue with other votes
      failures.push({
        index: i,
        error: error instanceof Error ? error.message : 'Unknown error',
        encryptedVote: encryptedVotes[i],
      });
    }
  }

  // If all votes failed, throw an error
  if (decryptedVotes.length === 0 && encryptedVotes.length > 0) {
    throw new Error(
      `Failed to decrypt all ${encryptedVotes.length} votes. Check the private key and encryption parameters.`
    );
  }

  return {
    decryptedVotes,
    failures,
  };
}

/**
 * Retry decryption of failed votes with alternative parameters
 *
 * This provides recovery options when decryption fails.
 * Requirement 2.5: Handle decryption failures with recovery options
 *
 * @param failures - Array of failed decryption attempts
 * @param options - Decryption options to try
 * @returns Promise resolving to recovered votes and remaining failures
 */
export async function retryFailedDecryptions(
  failures: Array<{ index: number; error: string; encryptedVote: EncryptedVote }>,
  options: DecryptionOptions
): Promise<{
  recovered: Array<{ index: number; vote: DecryptedVote }>;
  stillFailed: Array<{ index: number; error: string; encryptedVote: EncryptedVote }>;
}> {
  const recovered: Array<{ index: number; vote: DecryptedVote }> = [];
  const stillFailed: Array<{ index: number; error: string; encryptedVote: EncryptedVote }> = [];

  for (const failure of failures) {
    try {
      const decrypted = await decryptVote(failure.encryptedVote, options);
      recovered.push({
        index: failure.index,
        vote: decrypted,
      });
    } catch (error) {
      stillFailed.push({
        index: failure.index,
        error: error instanceof Error ? error.message : 'Unknown error',
        encryptedVote: failure.encryptedVote,
      });
    }
  }

  return {
    recovered,
    stillFailed,
  };
}
