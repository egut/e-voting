/**
 * Unit tests for key generation
 *
 * Tests RSA key pair generation with minimum RSA-4096 requirement.
 *
 * Requirements: 1.4, 16.1
 */

import { generateKeyPair, exportPublicKey, importPrivateKey } from './key-generation';
import { createPublicKey } from 'crypto';

describe('Key Generation', () => {
  describe('generateKeyPair', () => {
    it('should generate a valid RSA-4096 key pair by default', async () => {
      const keyPair = await generateKeyPair();

      expect(keyPair).toBeDefined();
      expect(keyPair.publicKey).toBeDefined();
      expect(keyPair.privateKey).toBeDefined();

      // Verify PEM format
      expect(keyPair.publicKey).toContain('-----BEGIN PUBLIC KEY-----');
      expect(keyPair.publicKey).toContain('-----END PUBLIC KEY-----');
      expect(keyPair.privateKey).toContain('-----BEGIN PRIVATE KEY-----');
      expect(keyPair.privateKey).toContain('-----END PRIVATE KEY-----');

      // Verify key size is at least 4096 bits
      const publicKeyObject = createPublicKey(keyPair.publicKey);
      const keyDetails = publicKeyObject.asymmetricKeyDetails;
      expect(keyDetails?.modulusLength).toBeGreaterThanOrEqual(4096);
    });

    it('should generate a key pair with custom modulus length', async () => {
      const keyPair = await generateKeyPair({
        modulusLength: 4096,
        publicExponent: 65537,
      });

      const publicKeyObject = createPublicKey(keyPair.publicKey);
      const keyDetails = publicKeyObject.asymmetricKeyDetails;
      expect(keyDetails?.modulusLength).toBe(4096);
    });

    it('should reject key sizes less than 4096 bits', async () => {
      await expect(
        generateKeyPair({
          modulusLength: 2048,
          publicExponent: 65537,
        })
      ).rejects.toThrow('Key size must be at least 4096 bits');
    });

    it('should generate different key pairs on each call', async () => {
      const keyPair1 = await generateKeyPair();
      const keyPair2 = await generateKeyPair();

      expect(keyPair1.publicKey).not.toBe(keyPair2.publicKey);
      expect(keyPair1.privateKey).not.toBe(keyPair2.privateKey);
    });

    it('should generate keys that can encrypt and decrypt', async () => {
      const { publicEncrypt, privateDecrypt, constants } = await import('crypto');
      const keyPair = await generateKeyPair();

      const testData = Buffer.from('test message');
      const encrypted = publicEncrypt(
        {
          key: keyPair.publicKey,
          padding: constants.RSA_PKCS1_OAEP_PADDING,
        },
        testData
      );

      const decrypted = privateDecrypt(
        {
          key: keyPair.privateKey,
          padding: constants.RSA_PKCS1_OAEP_PADDING,
        },
        encrypted
      );

      expect(decrypted.toString()).toBe('test message');
    });
  });

  describe('exportPublicKey', () => {
    it('should export the public key from a key pair', async () => {
      const keyPair = await generateKeyPair();
      const publicKey = exportPublicKey(keyPair);

      expect(publicKey).toBe(keyPair.publicKey);
      expect(publicKey).toContain('-----BEGIN PUBLIC KEY-----');
      expect(publicKey).toContain('-----END PUBLIC KEY-----');
    });

    it('should export a valid public key that can be used for encryption', async () => {
      const { publicEncrypt, constants } = await import('crypto');
      const keyPair = await generateKeyPair();
      const publicKey = exportPublicKey(keyPair);

      const testData = Buffer.from('test');
      const encrypted = publicEncrypt(
        {
          key: publicKey,
          padding: constants.RSA_PKCS1_OAEP_PADDING,
        },
        testData
      );

      expect(encrypted).toBeDefined();
      expect(encrypted.length).toBeGreaterThan(0);
    });
  });

  describe('importPrivateKey', () => {
    it('should import a valid PEM-encoded private key', async () => {
      const keyPair = await generateKeyPair();
      const imported = await importPrivateKey(keyPair.privateKey);

      expect(imported).toBe(keyPair.privateKey);
    });

    it('should reject invalid PEM format', async () => {
      await expect(importPrivateKey('not a valid key')).rejects.toThrow(
        'Invalid private key format'
      );
    });

    it('should reject malformed PEM keys', async () => {
      const malformedKey = `-----BEGIN PRIVATE KEY-----
invalid base64 content!!!
-----END PRIVATE KEY-----`;

      await expect(importPrivateKey(malformedKey)).rejects.toThrow('Invalid private key');
    });

    it('should accept RSA PRIVATE KEY format', async () => {
      // Generate a key in PKCS1 format
      const { generateKeyPairSync } = await import('crypto');
      const { privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        privateKeyEncoding: {
          type: 'pkcs1',
          format: 'pem',
        },
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
      });

      const imported = await importPrivateKey(privateKey);
      expect(imported).toBe(privateKey);
    });

    it('should validate that imported key can decrypt', async () => {
      const { publicEncrypt, privateDecrypt, constants } = await import('crypto');
      const keyPair = await generateKeyPair();
      const imported = await importPrivateKey(keyPair.privateKey);

      const testData = Buffer.from('test message');
      const encrypted = publicEncrypt(
        {
          key: keyPair.publicKey,
          padding: constants.RSA_PKCS1_OAEP_PADDING,
        },
        testData
      );

      const decrypted = privateDecrypt(
        {
          key: imported,
          padding: constants.RSA_PKCS1_OAEP_PADDING,
        },
        encrypted
      );

      expect(decrypted.toString()).toBe('test message');
    });
  });

  describe('Key pair compatibility', () => {
    it('should generate compatible public and private keys', async () => {
      const { publicEncrypt, privateDecrypt, constants } = await import('crypto');
      const keyPair = await generateKeyPair();

      // Test multiple messages
      const messages = ['short', 'a longer test message', '123456789'];

      for (const message of messages) {
        const testData = Buffer.from(message);
        const encrypted = publicEncrypt(
          {
            key: keyPair.publicKey,
            padding: constants.RSA_PKCS1_OAEP_PADDING,
          },
          testData
        );

        const decrypted = privateDecrypt(
          {
            key: keyPair.privateKey,
            padding: constants.RSA_PKCS1_OAEP_PADDING,
          },
          encrypted
        );

        expect(decrypted.toString()).toBe(message);
      }
    });
  });
});
