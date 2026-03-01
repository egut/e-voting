/**
 * Key generation implementation using Node.js crypto module
 *
 * This module implements RSA key pair generation for ballot box encryption.
 * Minimum RSA-4096 as per Requirement 1.4.
 *
 * Requirements: 1.4, 16.1
 */

import { generateKeyPairSync } from 'crypto';
import { KeyPair, KeyGenerationOptions } from './types';

/**
 * Default key generation options
 * RSA-4096 minimum as per Requirement 1.4
 */
const DEFAULT_OPTIONS: KeyGenerationOptions = {
  modulusLength: 4096,
  publicExponent: 65537,
};

/**
 * Generate an RSA key pair for ballot box encryption
 *
 * Uses Node.js built-in crypto module (Requirement 16.1)
 * Minimum RSA-4096 (Requirement 1.4)
 *
 * @param options - Key generation options (defaults to RSA-4096)
 * @returns Promise resolving to a KeyPair with PEM-encoded keys
 * @throws Error if modulusLength is less than 4096
 */
export async function generateKeyPair(
  options: KeyGenerationOptions = DEFAULT_OPTIONS
): Promise<KeyPair> {
  // Enforce minimum key size
  if (options.modulusLength < 4096) {
    throw new Error('Key size must be at least 4096 bits (Requirement 1.4)');
  }

  // Generate key pair synchronously (crypto.generateKeyPair async version has issues in some Node versions)
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: options.modulusLength,
    publicExponent: options.publicExponent,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  return {
    publicKey,
    privateKey,
  };
}

/**
 * Export a public key in PEM format
 *
 * @param keyPair - The key pair to export from
 * @returns PEM-encoded public key string
 */
export function exportPublicKey(keyPair: KeyPair): string {
  return keyPair.publicKey;
}

/**
 * Import a private key from PEM format
 *
 * Validates that the key is properly formatted.
 *
 * @param privateKeyPEM - PEM-encoded private key
 * @returns Promise resolving to the private key string
 * @throws Error if the key is not valid PEM format
 */
export async function importPrivateKey(privateKeyPEM: string): Promise<string> {
  // Basic validation: check for PEM markers
  if (
    !privateKeyPEM.includes('-----BEGIN PRIVATE KEY-----') &&
    !privateKeyPEM.includes('-----BEGIN RSA PRIVATE KEY-----')
  ) {
    throw new Error('Invalid private key format: must be PEM-encoded');
  }

  // Additional validation: try to create a key object
  try {
    const { createPrivateKey } = await import('crypto');
    createPrivateKey(privateKeyPEM);
  } catch (error) {
    throw new Error(
      `Invalid private key: ${error instanceof Error ? error.message : 'unknown error'}`
    );
  }

  return privateKeyPEM;
}
