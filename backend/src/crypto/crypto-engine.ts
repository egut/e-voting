/**
 * Main Crypto Engine implementation
 *
 * This module implements the ICryptoEngine interface using Node.js built-in crypto module.
 * It provides blind signatures, encryption/decryption, and receipt generation.
 *
 * Requirements: 1.2, 1.4, 2.1, 3.1, 16.1
 */

import {
  ICryptoEngine,
  KeyPair,
  BlindToken,
  EncryptedVote,
  DecryptedVote,
  PublishedVote,
  KeyGenerationOptions,
  EncryptionOptions,
  DecryptionOptions,
} from './interfaces';
import {
  generateKeyPair as genKeyPair,
  exportPublicKey as expPublicKey,
  importPrivateKey as impPrivateKey,
} from './key-generation';

/**
 * CryptoEngine implementation using Node.js crypto module
 *
 * This class implements all cryptographic operations for the voting system.
 * All operations use only the Node.js built-in crypto module (Requirement 16.1).
 */
export class CryptoEngine implements ICryptoEngine {
  /**
   * Generate an RSA key pair for ballot box encryption
   *
   * @param options - Key generation options (defaults to RSA-4096)
   * @returns Promise resolving to a KeyPair
   */
  async generateKeyPair(options?: KeyGenerationOptions): Promise<KeyPair> {
    return genKeyPair(options);
  }

  /**
   * Export a public key in PEM format
   *
   * @param keyPair - The key pair to export from
   * @returns PEM-encoded public key string
   */
  exportPublicKey(keyPair: KeyPair): string {
    return expPublicKey(keyPair);
  }

  /**
   * Import a private key from PEM format
   *
   * @param privateKeyPEM - PEM-encoded private key
   * @returns Promise resolving to the private key string
   */
  async importPrivateKey(privateKeyPEM: string): Promise<string> {
    return impPrivateKey(privateKeyPEM);
  }

  /**
   * Generate a blind token for anonymous voting
   *
   * Requirement 1.2: Use blind signature cryptography to separate identity from vote content
   *
   * @param memberId - The member's identifier
   * @param publicKey - The server's public key for blinding
   * @returns Promise resolving to a BlindToken
   */
  async generateBlindToken(memberId: string, publicKey?: string): Promise<BlindToken> {
    // If no public key provided, generate a temporary one for testing
    if (!publicKey) {
      const keyPair = await this.generateKeyPair();
      publicKey = keyPair.publicKey;
    }

    const { generateBlindToken: genBlindToken } = await import('./blind-signature');
    return genBlindToken(memberId, publicKey);
  }

  /**
   * Sign a blinded token (server-side operation)
   *
   * The server signs the blinded token without knowing the original token.
   *
   * @param blindedToken - The blinded token to sign
   * @param privateKey - The server's private key for signing
   * @returns Promise resolving to the blind signature
   */
  async signBlindToken(blindedToken: string, privateKey: string): Promise<string> {
    const { signBlindedToken } = await import('./blind-signature');
    return signBlindedToken(blindedToken, privateKey);
  }

  /**
   * Unblind a signature (client-side operation)
   *
   * This removes the blinding factor to obtain a valid signature on the original token.
   *
   * @param blindedSignature - The signature on the blinded token
   * @param blindingFactor - The blinding factor used during blinding
   * @returns Promise resolving to the unblinded signature
   */
  async unblindSignature(blindedSignature: string, blindingFactor: string): Promise<string> {
    const { unblindSignature: unblind } = await import('./blind-signature');
    return unblind(blindedSignature, blindingFactor);
  }

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
  async verifyBlindSignature(
    token: string,
    signature: string,
    publicKey: string
  ): Promise<boolean> {
    const { verifyBlindSignature: verify } = await import('./blind-signature');
    return verify(token, signature, publicKey);
  }

  /**
   * Encrypt a vote with the chair's public key
   *
   * Requirement 2.1: Encrypt all votes in real-time using the Chair's public key
   *
   * @param vote - The vote to encrypt
   * @param options - Encryption options including public key
   * @returns Promise resolving to an EncryptedVote
   */
  async encryptVote(vote: DecryptedVote, options: EncryptionOptions): Promise<EncryptedVote> {
    const { encryptVote: encrypt } = await import('./ballot-box');
    return encrypt(vote, options);
  }

  /**
   * Decrypt a single vote with the chair's private key
   *
   * Requirement 2.4: Decrypt the Ballot_Box using the Chair's private key
   *
   * @param encryptedVote - The encrypted vote to decrypt
   * @param options - Decryption options including private key
   * @returns Promise resolving to a DecryptedVote
   */
  async decryptVote(
    encryptedVote: EncryptedVote,
    options: DecryptionOptions
  ): Promise<DecryptedVote> {
    const { decryptVote: decrypt } = await import('./ballot-box');
    return decrypt(encryptedVote, options);
  }

  /**
   * Decrypt all votes in the ballot box
   *
   * Requirement 2.4: Decrypt the Ballot_Box using the Chair's private key
   * Requirement 2.5: Handle decryption failures with recovery options
   *
   * @param encryptedVotes - Array of encrypted votes
   * @param options - Decryption options including private key
   * @returns Promise resolving to array of DecryptedVotes
   */
  async decryptBallotBox(
    encryptedVotes: EncryptedVote[],
    options: DecryptionOptions
  ): Promise<DecryptedVote[]> {
    const { decryptBallotBox: decrypt } = await import('./ballot-box');
    const result = await decrypt(encryptedVotes, options);

    // Log failures if any
    if (result.failures.length > 0) {
      console.warn(
        `Decryption completed with ${result.failures.length} failures out of ${encryptedVotes.length} votes`
      );
    }

    return result.decryptedVotes;
  }

  /**
   * Generate a unique receipt code for a vote
   *
   * Requirement 3.1: Generate unique Receipt_Code when member casts vote
   *
   * @param vote - The vote to generate a receipt for
   * @returns Promise resolving to a unique receipt code
   */
  async generateReceiptCode(vote: DecryptedVote): Promise<string> {
    const { generateReceiptCode: generate } = await import('./receipt');
    return generate(vote);
  }

  /**
   * Verify a receipt code against the published vote list
   *
   * Requirement 3.4: Allow any Member to verify their Receipt_Code appears in the published list
   *
   * @param receiptCode - The receipt code to verify
   * @param publishedVotes - The published list of votes with receipt codes
   * @returns Promise resolving to true if receipt code is found
   */
  async verifyReceiptCode(receiptCode: string, publishedVotes: PublishedVote[]): Promise<boolean> {
    const { verifyReceiptCode: verify } = await import('./receipt');
    return verify(receiptCode, publishedVotes);
  }
}
