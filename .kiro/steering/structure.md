---
inclusion: always
---

# Project Structure and Organization

## Repository Layout

```
/
├── doc/                          # All documentation
│   ├── README.md                 # Documentation index
│   ├── OVERSIKT.md              # Project overview (Swedish)
│   ├── CHANGELOG-KRAV.md        # Requirements changelog
│   ├── krav/                    # Requirements documents
│   │   ├── README.md            # Requirements index
│   │   ├── FUNKTIONELLA-KRAV.md
│   │   ├── PRESTANDA-OCH-TEKNISKA-KRAV.md
│   │   ├── SAKERHET-OCH-KRYPTERING.md
│   │   ├── AUTENTISERING-OCH-MEDLEMSREGISTER.md
│   │   ├── INFRASTRUKTUR-OCH-HOSTING.md
│   │   ├── PRESENTATION-OCH-ROSTNINGSFLODE.md
│   │   ├── PERSONAS-OCH-FUNKTIONER.md
│   │   ├── KOSTNADSUPPSKATTNING.md
│   │   ├── ARBETSFLODE.md
│   │   ├── UI-UX-KRAV.md
│   │   ├── PLAYFULNESS-OCH-TEMAN.md
│   │   ├── ROSTNING-OCH-VALMETODER.md
│   │   ├── WIZARD-OCH-ANVANDARVANLIGHET.md
│   │   └── ANALYS-OCH-BRISTER.md
│   └── mensa/                   # Reference documents
│       ├── Mensa-Sverige-Stadgar-2024.pdf
│       ├── Mensa-Sverige-Stadgar-2024.txt
│       ├── Valbilaga_2025_webb.pdf
│       └── digital-motion.md
├── .kiro/                       # Kiro IDE configuration
│   ├── settings/                # IDE settings
│   └── steering/                # AI assistant guidance
│       ├── product.md           # Product overview
│       ├── tech.md              # Technical stack
│       └── structure.md         # This file
├── .trunk/                      # Code quality tools
│   ├── trunk.yaml               # Trunk configuration
│   └── configs/                 # Linter configurations
└── .git/                        # Version control
```

## Documentation Organization

### Primary Documentation (`doc/`)

All project documentation lives in the `doc/` directory, written in Swedish as the primary language.

### Requirements Documents (`doc/krav/`)

Comprehensive requirements organized by domain:

- **Functional**: What the system does
- **Technical**: Performance, testing, code quality
- **Security**: Cryptography, threat modeling, GDPR
- **Infrastructure**: Hosting, deployment, scaling
- **User Experience**: UI/UX, accessibility, workflows
- **Analysis**: Gap analysis and improvement areas

### Reference Documents (`doc/mensa/`)

Legal and organizational reference materials:

- Association bylaws (stadgar)
- Election supplements
- Approved motions

## Code Organization (Future)

When implementation begins, follow this structure:

```
/
├── backend/                     # Backend application
│   ├── src/
│   │   ├── api/                # API endpoints
│   │   ├── auth/               # Authentication (critical code)
│   │   ├── crypto/             # Cryptography (critical code)
│   │   ├── voting/             # Voting logic (critical code)
│   │   ├── audit/              # Audit logging (critical code)
│   │   ├── db/                 # Database models
│   │   └── utils/              # Utilities
│   ├── tests/                  # Backend tests
│   ├── Dockerfile
│   └── package.json            # or requirements.txt, go.mod
├── frontend/                    # Frontend application
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API clients
│   │   └── utils/              # Utilities
│   ├── public/                 # Static assets
│   ├── tests/                  # Frontend tests
│   ├── Dockerfile
│   └── package.json
├── infrastructure/              # Infrastructure as code
│   ├── docker-compose.yml      # Local development
│   ├── kubernetes/             # K8s manifests
│   └── helm/                   # Helm charts
├── docs/                        # Generated API docs
│   └── openapi.yaml            # API specification
├── DEPENDENCIES.md              # Approved dependencies
├── CHANGELOG.md                 # Version history
└── README.md                    # Project readme
```

## File Naming Conventions

### Documentation

- **Swedish documents**: UPPERCASE-WITH-DASHES.md (e.g., `FUNKTIONELLA-KRAV.md`)
- **English documents**: lowercase-with-dashes.md (e.g., `readme.md`)
- **Mixed content**: Use primary language convention

### Code

- **Backend**: Follow language conventions (camelCase for JS, snake_case for Python, etc.)
- **Frontend**: camelCase for components, kebab-case for files
- **Config files**: lowercase with dots (e.g., `docker-compose.yml`)

## Critical Code Identification

Code affecting security and legal compliance requires special attention:

### Critical Modules

- `auth/` - Authentication and authorization
- `crypto/` - Cryptographic operations
- `voting/` - Vote casting and counting
- `audit/` - Audit logging and trails

### Testing Requirements

- Critical code: >95% test coverage
- Standard code: >70% test coverage
- All critical code: Manual review by 2+ developers

## Configuration Management

### Environment-Specific Config

- `.env.example` - Template for environment variables
- `.env` - Local config (never committed)
- `config/` - Application configuration files

### Secrets

- Never commit secrets to version control
- Use environment variables or secrets management
- Document all required secrets in README

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Emergency fixes

### Commit Messages

Follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test additions/changes
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

## Language Usage

### Primary Language: Swedish

- All requirements documents
- User-facing content
- Meeting protocols
- Association-specific terminology

### Secondary Language: English

- Code and comments
- Technical documentation
- API documentation
- International collaboration

### Bilingual Elements

- UI strings (i18n support)
- Error messages
- Help documentation
