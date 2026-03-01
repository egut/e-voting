# Digital Voting System

Secure digital voting system for Swedish associations (föreningar), specifically developed for Mensa Sverige's annual meetings.

## Overview

This system replaces paper-based postal voting with a cryptographically secure, transparent, and accessible digital solution that complies with Swedish association law, GDPR, and WCAG 2.1 AA accessibility standards.

### Key Features

- **Cryptographic Security**: Blind signature protocol separates voter identity from vote content
- **End-to-End Verifiability**: Members can verify their votes were counted correctly
- **Multiple Voting Methods**: Simple majority, STV, Schulze, Approval voting
- **Flexible Authentication**: Freja eID+, SSO, Magic Link, QR codes, password with MFA
- **Automatic Protocol Generation**: Digital signatures with Freja eID/BankID
- **Real-time Dashboard**: Live voting statistics and system health monitoring
- **Progressive Web App**: Works on all devices, mobile-first design
- **Portable Deployment**: Runs on laptop, VPS, or cloud with single command

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)
- PostgreSQL 16+ (or use Docker)

### Start with Docker Compose

```bash
cd infrastructure
docker-compose up -d
```

The system will be available at:

- Frontend: <http://localhost:80> (via Caddy)
- Backend API: <http://localhost:3000>
- Direct Frontend: <http://localhost:8080>

### Local Development

#### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
/
├── backend/          # Node.js/TypeScript backend
├── frontend/         # React PWA frontend
├── infrastructure/   # Docker Compose and deployment
├── doc/             # Swedish documentation
└── .github/         # CI/CD workflows
```

## Testing

### Backend Tests

```bash
cd backend
npm test                # Run tests once
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage report
```

### Frontend Tests

```bash
cd frontend
npm test                # Run tests once
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage report
```

### Integration Tests

```bash
cd infrastructure
docker-compose up -d
# Run integration tests
docker-compose down
```

## Code Quality

```bash
# Run linters
cd backend && npm run lint
cd frontend && npm run lint

# Format code
cd backend && npm run format
cd frontend && npm run format

# Or use Trunk
trunk check
trunk fmt
```

## Documentation

- [Requirements (Swedish)](doc/krav/) - Comprehensive requirements documentation
- [Project Overview (Swedish)](doc/OVERSIKT.md) - System overview
- [API Documentation](docs/openapi.yaml) - OpenAPI specification (coming soon)

## Technology Stack

- **Backend**: Node.js 20, TypeScript, Express, PostgreSQL
- **Frontend**: React 18, TypeScript, Vite, PWA
- **Infrastructure**: Docker, Docker Compose, Caddy WAF
- **Testing**: Jest (backend), Vitest (frontend)
- **Cryptography**: Node.js crypto module (standard library only)

## Security

This system implements:

- Blind signature protocol for anonymous voting
- RSA-4096 encryption for ballot box
- End-to-end verifiability with receipt codes
- Comprehensive audit logging with cryptographic chain
- Web Application Firewall (Caddy)
- Rate limiting and attack filtering

See [Security Requirements (Swedish)](doc/krav/SAKERHET-OCH-KRYPTERING.md) for details.

## Compliance

- Swedish association bylaws (stadgar)
- GDPR with archive law exceptions
- WCAG 2.1 Level AA accessibility
- Swedish and English language support

## License

AGPL-3.0-or-later

## Contributing

This project follows conventional commits and requires:

- All tests passing
- Code coverage >95% for critical code (auth, crypto, voting, audit)
- Code coverage >70% for standard code
- Linting and formatting checks passing

## Support

For questions and support, see the documentation in the `doc/` directory.
