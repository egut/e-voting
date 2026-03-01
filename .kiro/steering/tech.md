---
inclusion: always
---

# Technical Stack and Build System

## Technology Choices

### Backend Options

- **Frameworks**: Express, Fastify (Node.js) | Flask, FastAPI (Python) | Gin (Go)
- **Database**: PostgreSQL (recommended), MySQL/MariaDB, or SQLite (small installations)
- **Cryptography**: ONLY standard library implementations (Node.js `crypto`, Python `cryptography`/`pycryptodome`, Go `crypto/*`)

### Frontend Options

- **Frameworks**: React, Vue, or Svelte (choose one)
- **Architecture**: PWA (Progressive Web App) for mobile-first experience
- **Offline Support**: Critical functionality works without network

### Infrastructure

- **Containerization**: Docker + Docker Compose (required)
- **Orchestration**: Kubernetes support with Helm charts
- **WAF**: Caddy, Traefik, or Nginx with ModSecurity/Coraza
- **Deployment**: Laptop, VPS, or cloud (AWS/Azure/GCP)

## Dependency Management

### Critical Rules

- **Minimize dependencies**: Copy single functions instead of importing entire libraries
- **Attribution required**: All copied code must include source URL, license, and date
- **Approved libraries only**: Must have >1000 GitHub stars or >100k weekly downloads
- **Security scanning**: Check CVE database before adding dependencies
- **NEVER custom crypto**: Only use standard library cryptographic implementations

### Documentation

- Maintain `DEPENDENCIES.md` with all approved libraries
- Include: name, version, license, purpose, review date

## Build and Development

### Common Commands

```bash
# Start development environment
docker-compose up -d

# Run tests
npm test          # or pytest, go test
npm run test:coverage

# Linting and formatting
trunk check --fix      # Run all linters
trunk fmt         # Format code

# Database migrations
npm run migrate   # or alembic upgrade head

# Build for production
docker build -t voting-system .
```

### Code Quality Tools

- **Linters**: markdownlint, yamllint, prettier
- **Security**: checkov, trufflehog
- **Git hooks**: trunk-fmt-pre-commit, trunk-check-pre-push

## Performance Requirements

### API Response Times

- **Voting**: Max 150ms (with encryption)
- **Authentication**: Max 200ms (excluding external services)
- **Document loading**: Max 100ms (< 1MB files)
- **Results**: Max 500ms (< 500 votes)

### Load Capacity

- Normal: 50 concurrent users
- Peak: 200 concurrent users
- Maximum: 500 concurrent users

## Testing Requirements

### Critical Code (>95% coverage)

- Authentication and authorization
- Cryptography and key management
- Voting logic and vote counting
- Audit logging

### Standard Code (>70% coverage)

- UI components
- Document display
- Formatting and sorting

### Test Types

- Unit tests (Jest/Vitest, Pytest, Go test)
- Integration tests
- E2E tests (Playwright/Cypress)
- Load tests (JMeter, k6, Locust)
- Security tests (OWASP ZAP, penetration testing)

## Security Practices

### Defensive Coding

- Validate all inputs
- Fail-safe defaults (deny by default)
- Least privilege principle
- Defense in depth
- Comprehensive audit logging

### Secrets Management

- Use environment variables (`.env` files, not committed)
- Support Docker Secrets, Kubernetes Secrets, HashiCorp Vault
- Auto-generate keys on first start if not provided
- Enable key rotation without code changes

## Documentation Standards

### Required Diagrams (Mermaid)

All critical functions need:

- Flowcharts for step-by-step operations
- Architecture diagrams for system components
- Sequence diagrams for component interactions

### API Documentation

- OpenAPI/Swagger specification
- Request/response examples
- Error codes and handling
- Authentication methods

## Version Control

### Semantic Versioning

- MAJOR: Breaking changes (1.0.0 → 2.0.0)
- MINOR: New features, backward compatible (1.0.0 → 1.1.0)
- PATCH: Bug fixes, backward compatible (1.0.0 → 1.0.1)

### Release Process

1. Code review (minimum 2 reviewers)
2. All tests pass
3. Documentation updated
4. CHANGELOG.md updated
5. Git tag with version number
6. Release notes published
