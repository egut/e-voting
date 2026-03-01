# Approved Dependencies

This document tracks all external dependencies used in the Digital Voting System, following Requirement 16.7.

## Dependency Approval Criteria

Dependencies must meet ONE of the following criteria:

- More than 1000 GitHub stars
- More than 100k weekly downloads on npm
- Standard library (Node.js crypto, etc.)

All dependencies are checked against CVE database before approval.

## Backend Dependencies

### Core Framework

- **express** (v4.18.2)
  - Purpose: Web framework for REST API
  - License: MIT
  - Downloads: 30M+/week
  - Review Date: 2024-01-15
  - CVE Status: Clean

- **pg** (v8.11.3)
  - Purpose: PostgreSQL client
  - License: MIT
  - Downloads: 3M+/week
  - Review Date: 2024-01-15
  - CVE Status: Clean

### Security

- **helmet** (v7.1.0)
  - Purpose: Security headers middleware
  - License: MIT
  - Downloads: 3M+/week
  - Review Date: 2024-01-15
  - CVE Status: Clean

- **cors** (v2.8.5)
  - Purpose: CORS middleware
  - License: MIT
  - Downloads: 10M+/week
  - Review Date: 2024-01-15
  - CVE Status: Clean

- **express-rate-limit** (v7.1.5)
  - Purpose: Rate limiting
  - License: MIT
  - Downloads: 500k+/week
  - Review Date: 2024-01-15
  - CVE Status: Clean

- **bcrypt** (v5.1.1)
  - Purpose: Password hashing
  - License: MIT
  - Downloads: 2M+/week
  - Review Date: 2024-01-15
  - CVE Status: Clean

- **jsonwebtoken** (v9.0.2)
  - Purpose: JWT token generation/verification
  - License: MIT
  - Downloads: 10M+/week
  - Review Date: 2024-01-15
  - CVE Status: Clean

### Utilities

- **dotenv** (v16.3.1)
  - Purpose: Environment variable management
  - License: BSD-2-Clause
  - Downloads: 20M+/week
  - Review Date: 2024-01-15
  - CVE Status: Clean

- **ws** (v8.16.0)
  - Purpose: WebSocket server
  - License: MIT
  - Downloads: 20M+/week
  - Review Date: 2024-01-15
  - CVE Status: Clean

## Frontend Dependencies

### Core Framework

- **react** (v18.2.0)
  - Purpose: UI framework
  - License: MIT
  - Downloads: 20M+/week
  - Review Date: 2024-01-15
  - CVE Status: Clean

- **react-dom** (v18.2.0)
  - Purpose: React DOM renderer
  - License: MIT
  - Downloads: 20M+/week
  - Review Date: 2024-01-15
  - CVE Status: Clean

- **react-router-dom** (v6.21.1)
  - Purpose: Client-side routing
  - License: MIT
  - Downloads: 8M+/week
  - Review Date: 2024-01-15
  - CVE Status: Clean

### HTTP Client

- **axios** (v1.6.5)
  - Purpose: HTTP client for API calls
  - License: MIT
  - Downloads: 40M+/week
  - Review Date: 2024-01-15
  - CVE Status: Clean

## Cryptography

### Standard Library Only

All cryptographic operations use Node.js standard library `crypto` module:

- RSA key generation and encryption
- SHA-256 hashing
- Random number generation
- HMAC operations

**NO custom cryptographic libraries are used** (Requirement 16.1, 16.2).

## Development Dependencies

Development dependencies (testing, linting, building) are not listed here as they don't affect production security. See package.json files for complete lists.

## Copied Code

No code has been copied from external sources yet. When code is copied:

- Source URL must be documented
- License must be compatible (MIT, BSD, Apache 2.0)
- Copy date must be recorded
- Original license text must be preserved

## Review Schedule

Dependencies are reviewed:

- Before each major release
- When security advisories are published
- At least quarterly

Last full review: 2024-01-15
Next scheduled review: 2024-04-15
