/**
 * Core cryptographic types for the digital voting system
 *
 * This module defines the fundamental types used throughout the crypto engine.
 * All cryptographic operations use Node.js built-in crypto module only.
 *
 * Requirements: 1.4, 16.1, 16.2
 */

/**
 * Represents an RSA key pair for ballot box encryption
 * Minimum RSA-4096 as per Requirement 1.4
 */
export interface KeyPair {
  publicKey: string; // PEM-encoded public key
  privateKey: string; // PEM-encoded private key
}

/**
 * Represents a blind signature token used for anonymous voting
 * The blinding factor must remain client-side only
 *
 * Requirement 1.2: Use blind signature cryptography to separate identity from vote content
 */
export interface BlindToken {
  token: string; // The blind token identifier
  blindingFactor: string; // Client-side only, never sent to server
  signature: string; // Server's blind signature
}

/**
 * Represents an encrypted vote in the ballot box
 * Votes remain encrypted until the chair closes voting
 *
 * Requirements: 1.4, 2.1
 */
export interface EncryptedVote {
  ciphertext: string; // RSA-encrypted vote content
  timestamp: Date; // When the vote was cast
  receiptCode: string; // Unique receipt code for verification
}

/**
 * Represents a decrypted vote after voting closes
 */
export interface DecryptedVote {
  type: 'yes' | 'no' | 'abstain' | 'ranked' | 'approval';
  value?: boolean | string[] | number[];
  timestamp: Date;
  receiptCode: string;
}

/**
 * Represents a receipt code for end-to-end verifiability
 *
 * Requirements: 3.1, 3.2, 3.4
 */
export interface Receipt {
  code: string; // Unique receipt code
  timestamp: Date; // When the receipt was generated
  agendaItemId: string; // Which voting session this belongs to
}

/**
 * Represents a published vote for verification
 * Used in the public list for receipt verification
 */
export interface PublishedVote {
  receiptCode: string;
  voteData: DecryptedVote;
}

/**
 * Configuration for key generation
 */
export interface KeyGenerationOptions {
  modulusLength: number; // Minimum 4096 for ballot box encryption
  publicExponent: number; // Typically 65537
}

/**
 * Result of a blind signature operation
 */
export interface BlindSignatureResult {
  blindedToken: string;
  signature: string;
}

/**
 * Options for vote encryption
 */
export interface EncryptionOptions {
  publicKey: string; // PEM-encoded public key
  padding?: number; // RSA padding scheme (default: OAEP)
}

/**
 * Options for vote decryption
 */
export interface DecryptionOptions {
  privateKey: string; // PEM-encoded private key
  padding?: number; // RSA padding scheme (default: OAEP)
}
