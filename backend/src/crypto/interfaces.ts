/**
 * Core cryptographic interfaces for the digital voting system
 *
 * These interfaces define the contract for cryptographic operations.
 * All implementations must use Node.js built-in crypto module only.
 *
 * Requirements: 1.2, 1.4, 2.1, 3.1, 16.1
 */

import {
  KeyPair,
  BlindToken,
  EncryptedVote,
  DecryptedVote,
  Receipt,
  PublishedVote,
  KeyGenerationOptions,
  BlindSignatureResult,
  EncryptionOptions,
  DecryptionOptions,
} from './types';

/**
 * Interface for cryptographic engine operations
 *
 * This is the main interface for all cryptographic operations in the system.
 * It handles blind signatures, encryption/decryption, and receipt generation.
 */
export interface ICryptoEngine {
  /**
   * Generate an RSA key pair for ballot box encryption
   *
   * Requirement 1.4: Minimum RSA-4096
   *
   * @param options - Key generation options (modulusLength, publicExponent)
   * @returns Promise resolving to a KeyPair
   */
  generateKeyPair(options?: KeyGenerationOptions): Promise<KeyPair>;

  /**
   * Export a public key in PEM format
   *
   * @param keyPair - The key pair to export from
   * @returns PEM-encoded public key string
   */
  exportPublicKey(keyPair: KeyPair): string;

  /**
   * Import a private key from PEM format
   *
   * @param privateKeyPEM - PEM-encoded private key
   * @returns Promise resolving to the private key string
   */
  importPrivateKey(privateKeyPEM: string): Promise<string>;

  /**
   * Generate a blind token for anonymous voting
   *
   * Requirement 1.2: Use blind signature cryptography to separate identity from vote content
   *
   * @param memberId - The member's identifier (used for token generation, not stored with vote)
   * @param publicKey - Optional server's public key for blinding (if not provided, generates temporary key)
   * @returns Promise resolving to a BlindToken
   */
  generateBlindToken(memberId: string, publicKey?: string): Promise<BlindToken>;

  /**
   * Sign a blinded token (server-side operation)
   *
   * This operation signs the blinded token without knowing the original token.
   * The signature can later be unblinded by the client.
   *
   * @param blindedToken - The blinded token to sign
   * @param privateKey - The server's private key for signing
   * @returns Promise resolving to the blind signature
   */
  signBlindToken(blindedToken: string, privateKey: string): Promise<string>;

  /**
   * Unblind a signature (client-side operation)
   *
   * This removes the blinding factor to obtain a valid signature on the original token.
   *
   * @param blindedSignature - The signature on the blinded token
   * @param blindingFactor - The blinding factor used during blinding
   * @returns Promise resolving to the unblinded signature
   */
  unblindSignature(blindedSignature: string, blindingFactor: string): Promise<string>;

  /**
   * Verify a blind signature without revealing identity
   *
   * This verifies that a token was signed by the server without linking it to a member.
   *
   * @param token - The original token
   * @param signature - The unblinded signature
   * @param publicKey - The server's public key
   * @returns Promise resolving to true if signature is valid
   */
  verifyBlindSignature(token: string, signature: string, publicKey: string): Promise<boolean>;

  /**
   * Encrypt a vote with the chair's public key
   *
   * Requirement 2.1: Encrypt all votes in real-time using the Chair's public key
   *
   * @param vote - The vote to encrypt
   * @param options - Encryption options including public key
   * @returns Promise resolving to an EncryptedVote
   */
  encryptVote(vote: DecryptedVote, options: EncryptionOptions): Promise<EncryptedVote>;

  /**
   * Decrypt a single vote with the chair's private key
   *
   * Requirement 2.4: Decrypt the Ballot_Box using the Chair's private key
   *
   * @param encryptedVote - The encrypted vote to decrypt
   * @param options - Decryption options including private key
   * @returns Promise resolving to a DecryptedVote
   */
  decryptVote(encryptedVote: EncryptedVote, options: DecryptionOptions): Promise<DecryptedVote>;

  /**
   * Decrypt all votes in the ballot box
   *
   * Requirement 2.4: Decrypt the Ballot_Box using the Chair's private key
   *
   * @param encryptedVotes - Array of encrypted votes
   * @param options - Decryption options including private key
   * @returns Promise resolving to array of DecryptedVotes
   */
  decryptBallotBox(
    encryptedVotes: EncryptedVote[],
    options: DecryptionOptions
  ): Promise<DecryptedVote[]>;

  /**
   * Generate a unique receipt code for a vote
   *
   * Requirement 3.1: Generate unique Receipt_Code when member casts vote
   *
   * @param vote - The vote to generate a receipt for
   * @returns Promise resolving to a unique receipt code
   */
  generateReceiptCode(vote: DecryptedVote): Promise<string>;

  /**
   * Verify a receipt code against the published vote list
   *
   * Requirement 3.4: Allow any Member to verify their Receipt_Code appears in the published list
   *
   * @param receiptCode - The receipt code to verify
   * @param publishedVotes - The published list of votes with receipt codes
   * @returns Promise resolving to true if receipt code is found
   */
  verifyReceiptCode(receiptCode: string, publishedVotes: PublishedVote[]): Promise<boolean>;
}

/**
 * Interface for key management operations
 */
export interface IKeyManager {
  /**
   * Generate and store a new key pair for a voting session
   *
   * @param sessionId - The voting session identifier
   * @returns Promise resolving to the generated KeyPair
   */
  generateSessionKeys(sessionId: string): Promise<KeyPair>;

  /**
   * Retrieve the public key for a voting session
   *
   * @param sessionId - The voting session identifier
   * @returns Promise resolving to the public key
   */
  getPublicKey(sessionId: string): Promise<string>;

  /**
   * Retrieve the private key for a voting session (chair only)
   *
   * @param sessionId - The voting session identifier
   * @returns Promise resolving to the private key
   */
  getPrivateKey(sessionId: string): Promise<string>;

  /**
   * Delete keys after voting session ends
   *
   * @param sessionId - The voting session identifier
   * @returns Promise resolving when keys are deleted
   */
  deleteSessionKeys(sessionId: string): Promise<void>;
}
