# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial project structure with monorepo layout
- Backend setup with Node.js, TypeScript, and Express
- Frontend setup with React, TypeScript, and Vite PWA
- Docker Compose infrastructure with PostgreSQL, Redis, and Caddy
- CI/CD pipeline with GitHub Actions
- ESLint and Prettier configuration for code quality
- Jest (backend) and Vitest (frontend) testing frameworks
- Basic health check endpoints
- Development environment configuration

### Infrastructure

- Docker containerization for all services
- Caddy WAF with rate limiting and security headers
- PostgreSQL 16 database
- Redis cache (optional)
- Nginx for frontend static file serving

### Documentation

- README with quick start guide
- DEPENDENCIES.md tracking approved libraries
- Environment variable templates (.env.example)

## [0.1.0] - 2024-01-15

### Added

- Project initialization
- Repository structure following Swedish association requirements
- Comprehensive requirements documentation (Swedish)
- Design document with architecture and data models
- Implementation task breakdown

[Unreleased]: https://github.com/yourusername/digital-voting-system/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/yourusername/digital-voting-system/releases/tag/v0.1.0
