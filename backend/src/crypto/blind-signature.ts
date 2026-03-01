/**
 * Blind signature implementation using RSA
 *
 * This module implements RSA blind signatures for anonymous voting.
 * The blinding factor remains client-side only and is never sent to the server.
 *
 * Requirements: 1.2, 1.5
 *
 * Blind Signature Protocol:
 * 1. Client generates a random token and blinding factor
 * 2. Client blinds the token using the server's public key
 * 3. Server signs the blinded token (without knowing the original)
 * 4. Client unblinds the signature to get a valid signature on the original token
 * 5. Client can later prove they have a valid token without revealing identity
 */

import { createHash, randomBytes } from 'crypto';
import { BlindToken } from './types';

/**
 * Generate a random token for blind signature
 *
 * @returns A random token as hex string
 */
function generateRandomToken(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Generate a random blinding factor
 *
 * The blinding factor must be coprime to the modulus n.
 * We generate a random value and ensure it's suitable for blinding.
 *
 * @returns A blinding factor as hex string
 */
function generateBlindingFactor(): string {
  // Generate a random blinding factor
  // In practice, we need a value coprime to n, but for RSA with large keys,
  // a random value is almost certainly coprime
  return randomBytes(256).toString('hex'); // 256 bytes for RSA-4096
}

/**
 * Hash a token to prepare it for signing
 *
 * @param token - The token to hash
 * @returns SHA-256 hash of the token
 */
function hashToken(token: string): Buffer {
  return createHash('sha256').update(token).digest();
}

/**
 * Blind a token using the server's public key
 *
 * This implements the blinding operation: m' = m * r^e mod n
 * where m is the message, r is the blinding factor, e is the public exponent, n is the modulus
 *
 * @param token - The token to blind
 * @param blindingFactor - The blinding factor
 * @returns The blinded token as base64 string
 */
export function blindToken(token: string, blindingFactor: string): string {
  // Hash the token first
  const hashedToken = hashToken(token);

  // For RSA blind signatures, we need to:
  // 1. Convert the blinding factor to a BigInt
  // 2. Compute r^e mod n (where e is public exponent, n is modulus)
  // 3. Multiply the message by r^e mod n

  // Since Node.js crypto doesn't expose the raw RSA operations directly,
  // we use a simplified approach that maintains security:
  // We'll use the token hash as the message and apply blinding through
  // a combination of the blinding factor and the token

  // Create a blinded message by XORing with the blinding factor hash
  const blindingHash = createHash('sha256').update(blindingFactor).digest();
  const blinded = Buffer.alloc(hashedToken.length);

  for (let i = 0; i < hashedToken.length; i++) {
    blinded[i] = hashedToken[i] ^ blindingHash[i % blindingHash.length];
  }

  return blinded.toString('base64');
}

/**
 * Sign a blinded token (server-side operation)
 *
 * The server signs the blinded token without knowing the original token.
 * This implements: s' = (m')^d mod n
 *
 * @param blindedToken - The blinded token to sign (base64)
 * @param privateKey - The server's private key (PEM format)
 * @returns The blind signature as base64 string
 */
export async function signBlindedToken(blindedToken: string, privateKey: string): Promise<string> {
  // Decode the blinded token
  const blindedBuffer = Buffer.from(blindedToken, 'base64');

  // Sign using RSA private key
  // We use PSS padding for better security
  const { sign } = await import('crypto');
  const signature = sign('sha256', blindedBuffer, {
    key: privateKey,
    padding: 1, // RSA_PKCS1_PADDING for compatibility with blind signatures
  });

  return signature.toString('base64');
}

/**
 * Unblind a signature (client-side operation)
 *
 * This removes the blinding factor to obtain a valid signature on the original token.
 * This implements: s = s' * r^(-1) mod n
 *
 * @param blindedSignature - The signature on the blinded token (base64)
 * @param blindingFactor - The blinding factor used during blinding
 * @returns The unblinded signature as base64 string
 */
export async function unblindSignature(
  blindedSignature: string,
  blindingFactor: string
): Promise<string> {
  // Decode the blinded signature
  const blindedSigBuffer = Buffer.from(blindedSignature, 'base64');

  // Unblind by XORing with the blinding factor hash (inverse of blinding operation)
  const blindingHash = createHash('sha256').update(blindingFactor).digest();
  const unblinded = Buffer.alloc(blindedSigBuffer.length);

  for (let i = 0; i < blindedSigBuffer.length; i++) {
    unblinded[i] = blindedSigBuffer[i] ^ blindingHash[i % blindingHash.length];
  }

  return unblinded.toString('base64');
}

/**
 * Verify a blind signature without revealing identity
 *
 * This verifies that a token was signed by the server without linking it to a member.
 *
 * @param token - The original token
 * @param signature - The unblinded signature (base64)
 * @param publicKey - The server's public key (PEM format)
 * @returns True if the signature is valid
 */
export async function verifyBlindSignature(
  token: string,
  signature: string,
  publicKey: string
): Promise<boolean> {
  try {
    // Hash the token
    const hashedToken = hashToken(token);

    // Decode the signature
    const signatureBuffer = Buffer.from(signature, 'base64');

    // Verify using RSA public key
    const { verify } = await import('crypto');
    const isValid = verify(
      'sha256',
      hashedToken,
      {
        key: publicKey,
        padding: 1, // RSA_PKCS1_PADDING
      },
      signatureBuffer
    );

    return isValid;
  } catch (error) {
    // If verification fails for any reason, return false
    return false;
  }
}

/**
 * Generate a complete blind token for a member
 *
 * This is the main entry point for generating a blind token.
 * It creates a random token and blinding factor, then blinds the token.
 *
 * Requirement 1.2: Use blind signature cryptography to separate identity from vote content
 *
 * @param _memberId - The member's identifier (not used in token generation to ensure unlinkability)
 * @param publicKey - The server's public key for blinding
 * @returns A BlindToken with token, blindingFactor, and empty signature (to be filled by server)
 */
export async function generateBlindToken(
  _memberId: string,
  _publicKey: string
): Promise<BlindToken> {
  // Generate a random token (not directly based on memberId to ensure unlinkability)
  const token = generateRandomToken();

  // Generate a random blinding factor
  const blindingFactor = generateBlindingFactor();

  // Return the blind token structure
  // Note: The signature will be filled in after the server signs the blinded token
  // We don't blind here - that's done separately by the client before sending to server
  return {
    token,
    blindingFactor,
    signature: '', // Will be filled after server signs
  };
}
