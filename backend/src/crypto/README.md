# Crypto Engine Module

This module implements the cryptographic foundation for the digital voting system. It provides blind signatures for anonymous voting, ballot box encryption/decryption, and receipt code generation.

## Overview

The crypto engine ensures cryptographic separation between voter identity and vote content using:

- **Blind Signatures**: RSA blind signature protocol for anonymous voting
- **Ballot Box Encryption**: RSA-4096 encryption for vote confidentiality
- **Receipt Codes**: Cryptographic hashes for end-to-end verifiability

## Requirements

- **Requirement 1.2**: Use blind signature cryptography to separate identity from vote content
- **Requirement 1.4**: Ballot box shall encrypt all votes using asymmetric encryption (RSA-4096 or stronger)
- **Requirement 2.1**: Encrypt all votes in real-time using the Chair's public key
- **Requirement 3.1**: Generate unique receipt code when member casts vote
- **Requirement 16.1**: Use only standard library cryptography (Node.js crypto module)

## Implementation Status

### Task 2.1: Core Cryptographic Interfaces and Types ✅

**Completed:**

- Core types defined (`types.ts`)
- Interfaces defined (`interfaces.ts`)
- Key generation implemented (`key-generation.ts`)
- CryptoEngine class structure created (`crypto-engine.ts`)
- Comprehensive unit tests (13 tests, all passing)

**Key Features:**

- RSA-4096 minimum key size enforcement
- PEM-encoded key import/export
- Full test coverage for key generation

### Task 2.2: Blind Signature Protocol (Pending)

Will implement:

- `generateBlindToken()`
- `signBlindToken()`
- `unblindSignature()`
- `verifyBlindSignature()`

### Task 2.4: Ballot Box Encryption/Decryption (Pending)

Will implement:

- `encryptVote()`
- `decryptVote()`
- `decryptBallotBox()`

### Task 2.6: Receipt Code Generation (Pending)

Will implement:

- `generateReceiptCode()`
- `verifyReceiptCode()`

## Usage

```typescript
import { CryptoEngine } from './crypto';

const crypto = new CryptoEngine();

// Generate key pair for ballot box
const keyPair = await crypto.generateKeyPair();
console.log('Public key:', keyPair.publicKey);

// Export public key for distribution
const publicKey = crypto.exportPublicKey(keyPair);

// Import private key (chair only)
const privateKey = await crypto.importPrivateKey(keyPair.privateKey);
```

## Testing

Run tests:

```bash
npm test key-generation.test.ts
```

Run with coverage:

```bash
npm run test:coverage
```

**Current Coverage**: 100% for key generation module

## Security Notes

1. **Key Size**: Minimum RSA-4096 enforced (Requirement 1.4)
2. **Standard Library Only**: Uses Node.js built-in `crypto` module (Requirement 16.1)
3. **No Custom Crypto**: All cryptographic operations use standard, well-tested implementations
4. **PEM Format**: Keys are stored in standard PEM format for interoperability

## Next Steps

1. Implement blind signature protocol (Task 2.2)
2. Add property tests for blind signature unlinkability (Task 2.3)
3. Implement ballot box encryption/decryption (Task 2.4)
4. Add property tests for vote encryption (Task 2.5)
5. Implement receipt code generation (Task 2.6)
6. Add property tests for receipt codes (Task 2.7)
