# Implementation Plan: Digital Voting System

## Overview

This implementation plan breaks down the digital voting system into four phases, following the architecture and design specified in the design document. The system uses TypeScript/Node.js for the backend, React PWA for the frontend, PostgreSQL for the database, and Docker for deployment.

Each task references specific requirements from the requirements document and includes property-based tests for correctness validation. All tests are enabled and required for production readiness.

## Git Commit Strategy

After completing each task (including implementation, tests, documentation, and code quality checks):

1. Run all tests: `npm test` (backend) and `npm run test` (frontend)
2. Run code quality checks: `trunk check --fix` and `trunk fmt`
3. Verify test coverage meets requirements (>95% for critical code, >70% for standard code)
4. Stage changes: `git add .`
5. Commit with descriptive message: `git commit -m "feat: [task-number] [task-description]"`
   - Example: `git commit -m "feat: 2.1 Implement core cryptographic interfaces and types"`
   - Use conventional commit prefixes: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`
6. Push to remote: `git push origin main` (or your feature branch)

This ensures each task is a complete, tested, and documented unit of work with full traceability in git history.

## Phase 1: Core Security and Voting (Critical Path)

This phase establishes the foundational security infrastructure and basic voting capabilities. All cryptographic operations, authentication, and vote handling must be implemented with the highest security standards.

- [x] 1. Set up project structure and development environment
  - Create monorepo structure with backend/, frontend/, and infrastructure/ directories
  - Configure TypeScript for both backend and frontend
  - Set up Docker Compose with PostgreSQL, Redis, and Caddy
  - Configure ESLint, Prettier, and testing frameworks (Jest for backend, Vitest for frontend)
  - Set up CI/CD pipeline with GitHub Actions
  - _Requirements: 21.1, 21.2_

- [x] 2. Implement Crypto Engine with blind signatures
  - [x] 2.1 Create core cryptographic interfaces and types
    - Define TypeScript interfaces for BlindToken, EncryptedVote, KeyPair, Receipt
    - Implement key generation using Node.js crypto module (RSA-4096 minimum)
    - _Requirements: 1.4, 16.1, 16.2_

  - [x] 2.2 Implement blind signature protocol
    - Implement RSA blind signature generation using Node.js crypto
    - Implement signature verification without identity linkage
    - Ensure blinding factor remains client-side only
    - _Requirements: 1.2, 1.5_

  - [x] 2.3 Write property test for blind signature unlinkability
    - **Property 1: Blind Signature Unlinkability**
    - **Validates: Requirements 1.2**

  - [x] 2.4 Implement ballot box encryption/decryption
    - Implement vote encryption with chair's public key (RSA-4096)
    - Implement batch decryption after voting closes
    - Handle decryption failures with recovery options
    - _Requirements: 2.1, 2.4, 2.5_

  - [x] 2.5 Write property test for vote encryption during open voting
    - **Property 2: Vote Encryption During Open Voting**
    - **Validates: Requirements 2.1, 2.2**

  - [x] 2.6 Implement receipt code generation and verification
    - Generate unique receipt codes using cryptographic hash
    - Implement receipt verification against published vote list
    - _Requirements: 3.1, 3.2, 3.4_

  - [x] 2.7 Write property tests for receipt codes
    - **Property 4: Receipt Code Uniqueness**
    - **Property 5: Receipt Verification**
    - **Validates: Requirements 3.1, 3.4**

- [-] 3. Implement database schema and models
  - [ ] 3.1 Create core database tables
    - Implement members table with security_level and status fields
    - Implement auth_sessions table with session management
    - Implement blind_tokens table (NO foreign key to members)
    - Implement meetings and agenda_items tables
    - _Requirements: 1.1, 6.7_

  - [ ] 3.2 Create voting-related tables
    - Implement voting_sessions table with quorum configuration
    - Implement encrypted_votes table (NO foreign key to members, only blind_token_hash)
    - Implement decrypted_votes table for post-voting storage
    - Implement vote_roll table linking members to voting sessions
    - Add indexes for performance optimization
    - _Requirements: 1.1, 8.1, 15.5_

  - [ ] 3.3 Create audit and protocol tables
    - Implement audit_log table with append-only structure and cryptographic chain
    - Implement protocols and protocol_signatures tables
    - Implement documents and document_versions tables
    - _Requirements: 17.6, 17.7_

- [~] 4. Implement Authentication Module
  - [ ] 4.1 Create authentication service with session management
    - Implement session creation, validation, and revocation
    - Implement security level assignment based on auth method
    - Store sessions in database with expiration
    - _Requirements: 5.1, 5.5_

  - [ ] 4.2 Implement Freja eID+ authentication
    - Integrate with Freja eID+ API for Swedish personal number verification
    - Assign "Very High" security level for API integration
    - Handle authentication failures gracefully
    - _Requirements: 5.1, 5.6, 25.2_

  - [ ] 4.3 Implement Magic Link authentication
    - Generate secure magic link tokens with expiration
    - Send magic links via email service
    - Verify tokens and create sessions
    - Assign security level based on member register integration
    - _Requirements: 5.3, 25.4_

  - [ ] 4.4 Implement member status verification
    - Check member status is "active" before allowing authentication
    - Support CSV, API, and LDAP member register integration
    - Validate imported member data for format and duplicates
    - _Requirements: 6.1, 6.2, 6.3, 6.5, 6.6_

  - [ ] 4.5 Write property test for inactive member rejection
    - **Property 8: Inactive Member Authentication Rejection**
    - **Validates: Requirements 6.5**

  - [ ] 4.6 Write property test for member data validation
    - **Property 9: Member Data Validation**
    - **Validates: Requirements 6.6**

  - [ ] 4.7 Write property test for security badge assignment
    - **Property 18: Security Badge Assignment**
    - **Validates: Requirements 25.1-25.6**

- [~] 5. Checkpoint - Ensure authentication and crypto tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [~] 6. Implement Voting Module
  - [ ] 6.1 Create voting session management
    - Implement openVoting, closeVoting, extendVoting functions
    - Store voting configuration (method, quorum, options)
    - Generate chair's key pair for ballot box encryption
    - _Requirements: 7.7, 31.1_

  - [ ] 6.2 Implement vote casting with blind tokens
    - Verify blind token signature without identity check
    - Encrypt vote with chair's public key
    - Store encrypted vote with receipt code and blind_token_hash
    - Generate and return receipt code to voter
    - _Requirements: 1.2, 2.1, 3.1, 3.2_

  - [ ] 6.3 Implement vote change functionality
    - Allow unlimited vote changes during pre-voting
    - Mark previous votes as superseded (replaced_by field)
    - Ensure only most recent vote is counted
    - Hide vote change count from all users
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ] 6.4 Write property test for vote change idempotency
    - **Property 6: Vote Change Idempotency**
    - **Validates: Requirements 4.1, 4.2, 4.3**

  - [ ] 6.5 Write property test for vote change privacy
    - **Property 7: Vote Change Privacy**
    - **Validates: Requirements 4.4**

  - [ ] 6.6 Implement simple majority vote counting
    - Decrypt ballot box after voting closes
    - Count yes/no/abstain votes
    - Calculate percentages and determine winner
    - _Requirements: 7.1, 7.2_

  - [ ] 6.7 Implement STV (Single Transferable Vote) algorithm
    - Parse ranked preference votes
    - Implement vote transfer logic when candidates eliminated/elected
    - Handle exhausted ballots correctly
    - Support configurable number of positions
    - _Requirements: 7.3, 7.6, 30.6_

  - [ ] 6.8 Write property test for STV vote transfer correctness
    - **Property 10: STV Vote Transfer Correctness**
    - **Validates: Requirements 7.6**

  - [ ] 6.9 Implement vote roll generation
    - Create vote_roll entry when member casts vote
    - Record presence type (physical/digital) and security level
    - Ensure vote roll includes exactly those who voted
    - Support manual verification by election committee
    - _Requirements: 8.1, 8.2, 8.3, 24.9_

  - [ ] 6.10 Write property test for vote roll accuracy
    - **Property 11: Vote Roll Accuracy**
    - **Validates: Requirements 8.1, 8.2, 8.3**

  - [ ] 6.11 Implement quorum checking
    - Support simple, absolute, and qualified majority quorum types
    - Calculate quorum based on votes cast vs eligible voters
    - Display quorum status to chair
    - Document quorum in voting results
    - _Requirements: 31.1, 31.2, 31.3, 31.4, 31.5_

  - [ ] 6.12 Write property test for quorum determination
    - **Property 19: Quorum Determination**
    - **Validates: Requirements 31.1-31.5**

  - [ ] 6.13 Write property test for vote counting after decryption
    - **Property 3: Vote Counting After Decryption**
    - **Validates: Requirements 2.4**

- [~] 7. Implement Audit Logger
  - [ ] 7.1 Create audit logging service with cryptographic chain
    - Implement append-only log structure
    - Calculate hash of each entry including previous hash
    - Store timestamp, actor, action, resource, result
    - _Requirements: 17.6, 17.7_

  - [ ] 7.2 Implement event logging functions
    - Log authentication attempts (success and failure)
    - Log administrative changes with user and timestamp
    - Log vote counts without revealing individual votes
    - Log system errors and data access
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5_

  - [ ] 7.3 Implement downtime detection and logging
    - Monitor system health with periodic checks
    - Log downtime start and end timestamps
    - Calculate and log downtime duration
    - Suggest voting extension based on downtime
    - _Requirements: 9.2, 9.3_

  - [ ] 7.4 Write property test for downtime logging completeness
    - **Property 12: Downtime Logging Completeness**
    - **Validates: Requirements 9.2**

  - [ ] 7.5 Write property test for audit event logging
    - **Property 17: Audit Event Logging**
    - **Validates: Requirements 17.1-17.5**

  - [ ] 7.6 Implement GDPR anonymization
    - Anonymize personal data in logs after meeting
    - Preserve protocol and vote roll per archive law
    - Provide data export for member requests
    - _Requirements: 23.4, 23.6, 23.7_

- [~] 8. Implement REST API endpoints for Phase 1
  - [ ] 8.1 Create authentication endpoints
    - POST /api/v1/auth/freja - Freja eID+ authentication
    - POST /api/v1/auth/magic-link - Request magic link
    - GET /api/v1/auth/magic-link/:token - Verify magic link
    - POST /api/v1/auth/logout - Logout
    - GET /api/v1/auth/session - Get current session
    - _Requirements: 5.1, 5.3_

  - [ ] 8.2 Create voting endpoints
    - POST /api/v1/voting/sessions - Open voting session (chair only)
    - POST /api/v1/voting/sessions/:id/vote - Cast vote
    - PUT /api/v1/voting/sessions/:id/vote - Change vote
    - POST /api/v1/voting/sessions/:id/close - Close voting (chair only)
    - GET /api/v1/voting/sessions/:id/results - Get results
    - POST /api/v1/voting/verify - Verify receipt code
    - _Requirements: 3.4, 4.1_

  - [ ] 8.3 Create member management endpoints
    - GET /api/v1/members - List members (admin only)
    - POST /api/v1/members - Add member (admin only)
    - GET /api/v1/members/pending - List pending approvals
    - POST /api/v1/members/:id/approve - Approve member
    - _Requirements: 6.1, 24.1, 24.3, 24.4_

  - [ ] 8.4 Implement error handling and validation
    - Define error codes for all error categories
    - Return consistent error response format
    - Validate all inputs with clear error messages
    - Implement rate limiting to prevent abuse
    - _Requirements: 22.2_

- [~] 9. Implement basic frontend (React PWA)
  - [ ] 9.1 Set up React project with PWA configuration
    - Configure Create React App or Vite with PWA plugin
    - Set up service worker for offline support
    - Configure manifest.json for mobile installation
    - Set up React Router for navigation
    - _Requirements: 21.4_

  - [ ] 9.2 Create authentication UI components
    - Login page with method selection (Freja eID+, Magic Link)
    - Magic link request form with email input
    - Session management and logout
    - Security level badge display
    - _Requirements: 5.1, 5.3, 25.2-25.6_

  - [ ] 9.3 Create voting UI components
    - Voting interface for yes/no/abstain
    - Ranked choice voting interface for STV
    - Vote confirmation with receipt code display
    - Vote change interface during pre-voting
    - Receipt verification interface
    - _Requirements: 3.2, 4.1, 7.1, 7.3_

  - [ ] 9.4 Implement accessibility features
    - Keyboard navigation for all interactive elements
    - ARIA labels and semantic HTML
    - Focus indicators with 4.5:1 contrast ratio
    - Screen reader announcements for dynamic content
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

  - [ ] 9.5 Implement responsive design
    - Mobile-first layout with breakpoints
    - Touch-friendly buttons and inputs (min 44x44px)
    - Readable text sizes (min 16px)
    - Test on various screen sizes
    - _Requirements: 18.9, 18.10_

- [~] 10. Checkpoint - Ensure Phase 1 integration tests pass
  - Run complete voting flow from authentication to results
  - Test vote changes and receipt verification
  - Verify audit logging captures all events
  - Ensure all tests pass, ask the user if questions arise.

## Phase 2: Meeting Management

This phase adds meeting orchestration, document handling, and protocol generation capabilities.

- [~] 11. Implement Meeting and Agenda Management
  - [ ] 11.1 Create meeting management service
    - Implement meeting creation with type (annual/extraordinary)
    - Implement meeting start, pause, and close functions
    - Store meeting metadata (chair, secretary, location, times)
    - Track meeting status (planned, active, paused, closed)
    - _Requirements: 9.4, 9.5, 9.6_

  - [ ] 11.2 Create agenda management
    - Implement agenda item creation with numbering (§1, §2, etc.)
    - Support different item types (opening, election, motion, closing)
    - Allow reordering of agenda items
    - Link voting sessions to agenda items
    - _Requirements: 11.1, 11.8_

  - [ ] 11.3 Implement meeting state persistence
    - Save meeting state during pauses
    - Support meeting resumption from saved state
    - Export meeting status for protocol documentation
    - _Requirements: 9.5, 9.6, 9.7_

  - [ ] 11.4 Write integration tests for meeting flow
    - Test complete meeting from start to close
    - Test pause and resume functionality
    - Test agenda item progression

- [~] 12. Implement Document Manager
  - [ ] 12.1 Create document upload and storage
    - Accept PDF, DOCX, DOC, MD, JPG, PNG, WebP formats
    - Store original files in file system or object storage
    - Generate unique document IDs
    - Link documents to agenda items
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ] 12.2 Implement document conversion to Markdown
    - Integrate Pandoc for DOCX/DOC to Markdown conversion
    - Integrate pdftotext for PDF to text extraction
    - Format extracted text as Markdown with headings
    - Handle conversion failures gracefully
    - _Requirements: 10.6, 10.9_

  - [ ] 12.3 Create conversion preview and approval workflow
    - Display side-by-side preview of original and converted
    - Allow manual editing of converted Markdown
    - Save approved conversions
    - Fall back to original PDF if conversion rejected
    - _Requirements: 10.7, 10.8_

  - [ ] 12.4 Implement document version control
    - Track document versions with timestamps
    - Store change reason and author
    - Allow viewing previous versions
    - _Requirements: 10.8_

  - [ ] 12.5 Write property test for document conversion round-trip
    - **Property 13: Document Conversion Round-Trip**
    - **Validates: Requirements 10.6, 10.7, 10.8, 10.9**

- [~] 13. Implement Protocol Generator
  - [ ] 13.1 Create protocol structure generation
    - Generate protocol from meeting and agenda data
    - Include opening (time, place, chair, secretary, adjusters)
    - Include attendance list (physical and digital)
    - Include all agenda items with numbering
    - Include closing with time
    - _Requirements: 11.1, 11.6, 11.7, 11.8, 11.10_

  - [ ] 13.2 Implement decision recording
    - Number decisions sequentially (ÅM2025-001, etc.)
    - Categorize decisions (statute_change, budget, election, other)
    - Include voting results with timestamps
    - Link decisions to agenda items
    - _Requirements: 11.2, 11.3, 11.4_

  - [ ] 13.3 Add secretary notes and comments
    - Allow secretary to add notes during meeting
    - Attach notes to specific agenda items
    - Include notes in protocol
    - _Requirements: 11.5_

  - [ ] 13.4 Implement protocol export
    - Export protocol as PDF with formatting
    - Export protocol as Markdown for editing
    - Export protocol as DOCX for compatibility
    - Calculate SHA-256 checksum for integrity
    - _Requirements: 12.5, 12.6_

  - [ ] 13.5 Implement digital signature support
    - Support Freja eID and BankID signatures
    - Require signatures from chair and two adjusters
    - Add cryptographic timestamps to signatures
    - Embed signatures in PDF export
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [ ] 13.6 Write integration tests for protocol generation
    - Test complete protocol generation from meeting data
    - Test decision numbering and categorization
    - Test protocol export in all formats

- [~] 14. Implement Data Dump and Recovery
  - [ ] 14.1 Create data dump functionality
    - Export all meeting data to JSON format
    - Include members, votes, agenda, documents, configuration
    - Calculate checksum for integrity verification
    - Compress dump for efficient storage
    - _Requirements: 13.1, 13.2, 13.3_

  - [ ] 14.2 Implement automatic dump scheduling
    - Create dump every 15 minutes during active meeting
    - Create final dump when meeting ends
    - Store dumps with timestamps
    - _Requirements: 13.5, 13.6_

  - [ ] 14.3 Create restoration functionality
    - Parse and validate dump file
    - Restore database state from dump
    - Complete restoration in less than 5 minutes
    - Verify restored data integrity
    - _Requirements: 13.4, 13.7_

  - [ ] 14.4 Write property test for data dump round-trip
    - **Property 14: Data Dump Round-Trip**
    - **Validates: Requirements 13.1, 13.2, 13.7**

- [~] 15. Implement API endpoints for Phase 2
  - [ ] 15.1 Create meeting endpoints
    - GET /api/v1/meetings - List meetings
    - POST /api/v1/meetings - Create meeting
    - GET /api/v1/meetings/:id - Get meeting details
    - GET /api/v1/meetings/:id/agenda - Get agenda
    - POST /api/v1/meetings/:id/start - Start meeting
    - POST /api/v1/meetings/:id/pause - Pause meeting
    - POST /api/v1/meetings/:id/close - Close meeting
    - _Requirements: 9.4, 9.5, 9.6_

  - [ ] 15.2 Create document endpoints
    - GET /api/v1/documents - List documents
    - POST /api/v1/documents - Upload document
    - GET /api/v1/documents/:id/original - Download original
    - GET /api/v1/documents/:id/markdown - Get Markdown version
    - PUT /api/v1/documents/:id - Update document
    - _Requirements: 10.1, 10.5, 10.7_

  - [ ] 15.3 Create protocol endpoints
    - GET /api/v1/protocols/:meetingId - Get protocol
    - POST /api/v1/protocols/:id/sign - Sign protocol
    - GET /api/v1/protocols/:id/export - Export protocol
    - GET /api/v1/protocols/:id/verify - Verify signatures
    - _Requirements: 12.4, 12.5_

  - [ ] 15.4 Create system endpoints
    - GET /api/v1/system/health - Health check
    - POST /api/v1/system/dump - Create data dump
    - POST /api/v1/system/restore - Restore from dump
    - _Requirements: 13.1, 13.4_

- [~] 16. Implement frontend for Phase 2
  - [ ] 16.1 Create meeting management UI
    - Meeting creation form with configuration
    - Meeting control panel (start, pause, close)
    - Agenda display with current item highlighting
    - Meeting status indicators
    - _Requirements: 9.4, 9.5, 9.6_

  - [ ] 16.2 Create document management UI
    - Document upload with drag-and-drop
    - Document list with preview
    - Conversion preview with side-by-side comparison
    - Markdown editor for manual corrections
    - _Requirements: 10.1, 10.7, 10.8_

  - [ ] 16.3 Create protocol UI
    - Protocol preview during meeting
    - Secretary notes interface
    - Digital signature interface
    - Protocol export with format selection
    - _Requirements: 11.5, 12.1, 12.5_

- [~] 17. Checkpoint - Ensure Phase 2 integration tests pass
  - Test complete meeting with documents and protocol
  - Test data dump and restoration
  - Verify protocol generation accuracy
  - Ensure all tests pass, ask the user if questions arise.

## Phase 3: Advanced Features

This phase adds additional voting methods, authentication options, real-time features, and election committee tools.

- [~] 18. Implement additional voting methods
  - [ ] 18.1 Implement Schulze method (Condorcet)
    - Parse pairwise candidate preferences
    - Calculate strongest paths between candidates
    - Determine Condorcet winner
    - Handle ties appropriately
    - _Requirements: 7.5_

  - [ ] 18.2 Implement Approval Voting
    - Allow voters to approve multiple candidates
    - Count approvals per candidate
    - Determine winner by most approvals
    - Support configurable max selections
    - _Requirements: 7.4_

  - [ ] 18.3 Write property tests for voting algorithms
    - Test Schulze method correctness
    - Test Approval Voting correctness
    - Test edge cases (ties, single candidate, etc.)

- [~] 19. Implement additional authentication methods
  - [ ] 19.1 Implement SSO authentication
    - Integrate with Active Directory via LDAP
    - Integrate with Entra ID (Azure AD) via OAuth
    - Integrate with Google Workspace via OAuth
    - Assign security level based on MFA status
    - _Requirements: 5.2, 25.3_

  - [ ] 19.2 Implement QR code authentication
    - Generate unique QR codes for members
    - Display QR codes for scanning
    - Verify QR codes and create sessions
    - Support manual member addition by election committee
    - _Requirements: 5.4, 24.6_

  - [ ] 19.3 Implement password authentication with MFA
    - Hash passwords with bcrypt or Argon2
    - Implement TOTP-based MFA
    - Support SMS-based MFA as fallback
    - Assign appropriate security level
    - _Requirements: 5.5, 25.4, 25.6_

- [~] 20. Implement real-time dashboard and WebSocket
  - [ ] 20.1 Set up WebSocket server
    - Configure WebSocket endpoint
    - Implement channel subscription (meeting, voting, dashboard)
    - Handle connection lifecycle and reconnection
    - _Requirements: 26.9_

  - [ ] 20.2 Implement real-time voting statistics
    - Broadcast vote count updates every second
    - Send voting opened/closed events
    - Send voting results when available
    - Calculate and send percentage of voters
    - _Requirements: 26.4, 26.5, 26.6_

  - [ ] 20.3 Create dashboard with real-time metrics
    - Display logged-in member count
    - Display physical vs digital presence counts
    - Display countdown timer during voting
    - Display historical vote results
    - _Requirements: 26.1, 26.2, 26.3, 26.7_

  - [ ] 20.4 Add system health monitoring
    - Monitor CPU, memory, database connections
    - Track API response times and error rates
    - Monitor WebSocket connection count
    - Display metrics to technical administrators
    - _Requirements: 26.8_

- [~] 21. Implement Election Committee interface
  - [ ] 21.1 Create member approval interface
    - Display pending member approvals with details
    - Show member name, number, email, country, request date
    - Allow approve/reject with reason
    - Log all approval actions
    - _Requirements: 24.1, 24.2, 24.3, 24.8_

  - [ ] 21.2 Implement manual member addition
    - Form for adding members with reason
    - Generate Magic Link for email delivery
    - Generate QR code for on-site scanning
    - Generate temporary password for manual transfer
    - _Requirements: 24.4, 24.5, 24.6, 24.7_

  - [ ] 21.3 Create security level dashboard
    - Display distribution of security levels
    - Show warning if >10% have low security
    - Allow filtering members by security level
    - Export security report
    - _Requirements: 25.7, 25.8_

- [~] 22. Implement Candidate Management
  - [ ] 22.1 Create candidate management interface
    - Form for adding candidates with all fields
    - Image upload with cropping tool
    - Markdown editor for presentations (max 500 words)
    - Preview of candidate card
    - _Requirements: 30.1, 30.2, 30.3, 30.4_

  - [ ] 22.2 Configure election voting settings
    - Select voting method per election (STV, Approval, Simple)
    - Configure number of positions to fill
    - Set candidate ordering
    - _Requirements: 30.5, 30.6_

  - [ ] 22.3 Create candidate display UI
    - Display candidate cards with consistent formatting
    - Show profile picture, name, position, presentation
    - Support responsive layout for all screen sizes
    - _Requirements: 30.7_

- [~] 23. Implement Web Application Firewall
  - [ ] 23.1 Configure Caddy WAF in Docker stack
    - Set up Caddy as reverse proxy
    - Configure automatic HTTPS with Let's Encrypt
    - Enable security headers (CSP, HSTS, X-Frame-Options)
    - _Requirements: 22.1_

  - [ ] 23.2 Implement rate limiting
    - Limit authentication attempts (5 per minute per IP)
    - Limit API requests (100 per minute per user)
    - Limit vote submissions (1 per session per voting)
    - _Requirements: 22.2_

  - [ ] 23.3 Configure attack filtering
    - Filter SQL injection patterns
    - Filter XSS attempts in user inputs
    - Log all blocked requests
    - _Requirements: 22.3, 22.4, 22.7_

  - [ ] 23.4 Set up Cloudflare integration (optional)
    - Configure Authenticated Origin Pulls
    - Accept traffic only from Cloudflare IPs
    - Enable DDoS protection
    - _Requirements: 22.5, 22.6_

- [~] 24. Implement performance optimizations
  - [ ] 24.1 Add database query optimization
    - Review and optimize all queries
    - Add missing indexes
    - Implement connection pooling
    - _Requirements: 15.5_

  - [ ] 24.2 Implement caching layer
    - Cache static data (agenda, documents) in Redis
    - Cache member status lookups
    - Implement cache invalidation strategy
    - _Requirements: 15.6_

  - [ ] 24.3 Optimize API response times
    - Ensure voting completes in <150ms including encryption
    - Ensure authentication completes in <200ms (excluding external)
    - Ensure document delivery <100ms for files <1MB
    - Ensure results display <500ms for <500 votes
    - _Requirements: 14.1, 14.2, 14.3, 14.4_

  - [ ] 24.4 Conduct load testing
    - Test with 50 concurrent users (normal load)
    - Test with 200 concurrent users (peak load)
    - Test with 500 concurrent users (maximum load)
    - Verify response times under load
    - _Requirements: 15.1, 15.2, 15.3_

- [~] 25. Checkpoint - Ensure Phase 3 integration tests pass
  - Test all voting methods (Simple, STV, Schulze, Approval)
  - Test all authentication methods
  - Test real-time dashboard updates
  - Verify performance under load
  - Ensure all tests pass, ask the user if questions arise.

## Phase 4: Production Readiness

This phase adds internationalization, configuration tools, advisory motions, and production documentation.

- [~] 26. Implement multi-language support (i18n)
  - [ ] 26.1 Set up i18n framework
    - Configure i18next for React frontend
    - Configure i18n for backend error messages
    - Create translation file structure
    - _Requirements: 19.6_

  - [ ] 26.2 Create Swedish translations
    - Translate all UI strings to Swedish
    - Translate error messages
    - Translate email templates
    - Use correct Swedish terminology (förtidsröstning, årsmöte, etc.)
    - _Requirements: 19.1_

  - [ ] 26.3 Create English translations
    - Translate all UI strings to English
    - Translate error messages
    - Translate email templates
    - _Requirements: 19.1_

  - [ ] 26.4 Implement language selection
    - Add language selector on login page
    - Remember user's language preference
    - Allow language change during meeting
    - _Requirements: 19.2, 19.3, 19.4_

  - [ ] 26.5 Implement timezone support
    - Display times in Swedish time and user's local timezone
    - Handle timezone conversions correctly
    - Show timezone in all timestamp displays
    - _Requirements: 19.5_

  - [ ] 26.6 Write property test for configuration round-trip
    - **Property 15: Configuration Round-Trip**
    - **Validates: Requirements 34.4**

  - [ ] 26.7 Write property test for vote data round-trip
    - **Property 16: Vote Data Round-Trip**
    - **Validates: Requirements 34.6**

- [~] 27. Implement white-label configuration
  - [ ] 27.1 Create configuration system
    - Define configuration schema (YAML or JSON)
    - Support organization name, logo, colors
    - Support 13+ predefined color themes
    - Allow custom color configuration
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5_

  - [ ] 27.2 Implement configuration UI
    - Configuration editor with live preview
    - Logo upload with format validation
    - Color picker for custom themes
    - Theme preview with sample components
    - _Requirements: 20.2, 20.3, 20.4_

  - [ ] 27.3 Add configuration persistence
    - Save configuration to file (config.yaml or settings.json)
    - Load configuration on startup
    - Support version control of config files
    - _Requirements: 20.5, 20.6, 20.7_

- [~] 28. Implement LLM-assisted configuration wizard
  - [ ] 28.1 Create configuration wizard UI
    - Step-by-step wizard interface
    - Bylaws upload (PDF or Word)
    - Interactive question flow
    - Configuration preview
    - _Requirements: 29.3, 29.4_

  - [ ] 28.2 Implement bylaws parsing
    - Extract text from PDF/Word documents
    - Identify relevant sections (quorum, voting methods, etc.)
    - Generate follow-up questions for clarification
    - _Requirements: 29.2, 29.4, 29.5_

  - [ ] 28.3 Create configuration templates
    - Template for non-profit associations
    - Template for economic associations
    - Template for housing cooperatives
    - Template for student organizations
    - _Requirements: 29.10_

  - [ ] 28.4 Implement configuration validation
    - Validate generated configuration for correctness
    - Display warnings for potential problems
    - Provide recommendations based on best practices
    - _Requirements: 29.7, 29.8, 29.9_

  - [ ] 28.5 Create LLM prompt template
    - Design prompt for configuration generation
    - Include bylaws context and questions
    - Generate structured configuration output
    - _Requirements: 29.1, 29.6_

- [~] 29. Implement advisory motions and "Other Business"
  - [ ] 29.1 Create motion submission interface
    - Markdown editor with preview for motion writing
    - Templates for common motion types
    - Submission deadline configuration
    - _Requirements: 28.1, 28.2, 28.3_

  - [ ] 29.2 Implement motion review workflow
    - Notify chair when motion submitted
    - Chair approval/rejection interface with reason
    - Add approved motions to agenda
    - Document all motions (approved and rejected)
    - _Requirements: 28.4, 28.5, 28.6, 28.7_

  - [ ] 29.3 Create motion status tracking
    - Display motion status to submitter
    - Show all submitted motions to chair
    - Mark advisory decisions as non-binding
    - _Requirements: 28.8, 28.9_

  - [ ] 29.4 Implement "Other Business" functionality
    - Allow secretary to add items during meeting
    - Add items to agenda dynamically
    - Support voting on other business items
    - _Requirements: 28.10_

- [~] 30. Implement automatic reminders and notifications
  - [ ] 30.1 Create notification system
    - Email service integration
    - Template system for notifications
    - Scheduling system for reminders
    - _Requirements: 32.1, 32.2, 32.4_

  - [ ] 30.2 Implement meeting notices
    - Send first notice per bylaws (configurable weeks before)
    - Send second notice per bylaws (configurable weeks before)
    - Verify all required documents attached before sending
    - _Requirements: 32.1, 32.2, 32.3_

  - [ ] 30.3 Implement reminder system
    - Send reminder 1 week before meeting
    - Send reminder when pre-voting opens
    - Send reminder before pre-voting closes
    - _Requirements: 32.4_

- [~] 31. Create transparency and security documentation
  - [ ] 31.1 Create transparency page
    - Design /transparency page layout
    - Explain system architecture in accessible language
    - Explain cryptographic methods used
    - Explain end-to-end verifiability
    - _Requirements: 27.1, 27.6, 27.7, 27.9_

  - [ ] 31.2 Publish security documentation
    - Publish Data Protection Impact Assessment (DPIA)
    - Publish threat modeling document
    - Publish audit trail explanation
    - Maintain version history of documents
    - _Requirements: 27.2, 27.3, 27.8, 27.11_

  - [ ] 31.3 Add security audit results
    - Publish independent security audit results
    - Publish penetration test results (anonymized)
    - Update after each security review
    - _Requirements: 27.4, 27.5_

  - [ ] 31.4 Implement document downloads
    - Allow PDF download of all transparency documents
    - Generate PDFs with proper formatting
    - Include version and date in PDFs
    - _Requirements: 27.10_

- [~] 32. Implement audit log export and verification
  - [ ] 32.1 Create audit log export
    - Export logs in JSON format
    - Export logs in CSV format
    - Filter logs by date range and event type
    - _Requirements: 17.8_

  - [ ] 32.2 Implement log integrity verification
    - Verify cryptographic chain of log entries
    - Detect any tampering or missing entries
    - Display verification results
    - _Requirements: 17.7_

  - [ ] 32.3 Create auditor interface
    - Display audit logs with filtering
    - Show log integrity status
    - Export functionality for auditors
    - _Requirements: 17.8_

- [~] 33. Complete accessibility compliance
  - [ ] 33.1 Run automated accessibility tests
    - Run axe-core tests on all pages
    - Run Pa11y in CI/CD pipeline
    - Run Lighthouse accessibility audits
    - Fix all automated issues

  - [ ] 33.2 Conduct manual accessibility testing
    - Test with NVDA screen reader
    - Test with JAWS screen reader
    - Test with VoiceOver (macOS/iOS)
    - Test keyboard-only navigation
    - Test with high contrast mode
    - Test text scaling up to 200%
    - Test with color blindness simulation
    - _Requirements: 18.1-18.12_

  - [ ] 33.3 Document accessibility features
    - Create accessibility statement
    - Document keyboard shortcuts
    - Document screen reader support
    - Provide contact for accessibility issues

- [~] 34. Create deployment documentation
  - [ ] 34.1 Write installation guide
    - Document system requirements
    - Document Docker installation steps
    - Document environment variable configuration
    - Document first-time setup process
    - _Requirements: 21.1, 21.2_

  - [ ] 34.2 Write deployment guides
    - Guide for laptop deployment
    - Guide for VPS deployment
    - Guide for cloud deployment (AWS, Azure, GCP)
    - Guide for Kubernetes deployment
    - _Requirements: 21.3, 21.6, 21.7, 21.8_

  - [ ] 34.3 Create operations documentation
    - Backup and restore procedures
    - Monitoring and alerting setup
    - Troubleshooting common issues
    - Security best practices
    - _Requirements: 13.7_

  - [ ] 34.4 Create API documentation
    - Generate OpenAPI/Swagger specification
    - Document all endpoints with examples
    - Document authentication methods
    - Document error codes and responses
    - _Requirements: API design section_

  - [ ] 34.5 Write user documentation
    - User guide for members (Swedish and English)
    - Administrator guide for meeting setup
    - Chair guide for meeting management
    - Election committee guide
    - Secretary guide for protocol generation

- [~] 35. Implement dependency management
  - [ ] 35.1 Create DEPENDENCIES.md
    - Document all external libraries
    - Include name, version, license, purpose
    - Include review date and CVE check date
    - _Requirements: 16.7_

  - [ ] 35.2 Review and minimize dependencies
    - Audit all dependencies for necessity
    - Copy single functions instead of importing libraries where possible
    - Document all copied code with source, license, date
    - _Requirements: 16.3, 16.4_

  - [ ] 35.3 Verify dependency security
    - Check all dependencies have >1000 stars or >100k downloads
    - Check CVE database for vulnerabilities
    - Set up automated dependency scanning
    - _Requirements: 16.5, 16.6_

- [~] 36. Conduct security testing
  - [ ] 36.1 Run automated security scans
    - Run npm audit / yarn audit
    - Run Snyk for dependency vulnerabilities
    - Run TruffleHog for secret detection
    - Run Checkov for infrastructure security
    - Fix all critical and high severity issues

  - [ ] 36.2 Conduct penetration testing
    - Engage independent security firm
    - Test authentication bypass attempts
    - Test cryptographic implementation
    - Test for common web vulnerabilities (OWASP Top 10)
    - Document and fix all findings

  - [ ] 36.3 Conduct cryptographic review
    - Review blind signature implementation
    - Review encryption/decryption implementation
    - Review key management
    - Verify no linkage between identity and vote
    - _Requirements: 1.1, 1.2, 1.5_

  - [ ] 36.4 Conduct GDPR compliance audit
    - Review data collection and purpose
    - Review data retention policies
    - Review anonymization procedures
    - Verify archive law exceptions
    - Complete Data Protection Impact Assessment (DPIA)
    - _Requirements: 23.1-23.9_

- [~] 37. Conduct pilot testing
  - [ ] 37.1 Prepare pilot test environment
    - Set up production-like environment
    - Create test meeting with realistic agenda
    - Prepare test documents
    - Recruit 20+ test participants

  - [ ] 37.2 Run pilot test meeting
    - Test complete meeting flow from start to finish
    - Test all authentication methods
    - Test all voting methods
    - Test document management
    - Test protocol generation
    - Collect feedback from participants

  - [ ] 37.3 Analyze pilot test results
    - Review system logs for errors
    - Analyze performance metrics
    - Review user feedback
    - Identify usability issues
    - Document lessons learned

  - [ ] 37.4 Implement pilot test improvements
    - Fix critical bugs found during pilot
    - Improve usability based on feedback
    - Optimize performance bottlenecks
    - Update documentation based on findings

- [~] 38. Final checkpoint - Production readiness review
  - Verify all critical tests pass (>95% coverage)
  - Verify all standard tests pass (>70% coverage)
  - Verify all security scans pass
  - Verify all accessibility tests pass
  - Verify all documentation is complete
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All tasks are required for production readiness (no optional tasks)
- Each task references specific requirements for traceability
- Each completed task must be committed to git individually with proper documentation and tests
- Checkpoints ensure incremental validation at the end of each phase
- Property tests validate universal correctness properties (19 properties total)
- Unit tests validate specific examples and edge cases
- Critical code (auth, crypto, voting, audit) requires >95% test coverage
- Standard code requires >70% test coverage
- All cryptographic operations use Node.js standard library (crypto module)
- Database schema enforces NO foreign key between encrypted_votes and members tables
- The system uses TypeScript for type safety throughout

## Implementation Order

The phases should be implemented in order:

1. Phase 1 establishes core security and voting - this is the critical path
2. Phase 2 adds meeting orchestration and protocol generation
3. Phase 3 adds advanced features and optimizations
4. Phase 4 prepares the system for production use

Within each phase, tasks should generally be completed in order, though some tasks can be parallelized (e.g., frontend and backend development).

## Testing Strategy

- Write property tests for all 19 correctness properties defined in design document
- Write unit tests for specific examples and edge cases
- Write integration tests for complete user flows
- Write E2E tests for critical paths (authentication → voting → results)
- Conduct load testing to verify performance requirements
- Conduct accessibility testing (automated and manual)
- Conduct security testing (automated scans and penetration testing)
- Conduct pilot testing with real users before production deployment

## Success Criteria

The implementation is complete when:

- All non-optional tasks are completed
- All tests pass (unit, property, integration, E2E)
- Test coverage meets requirements (>95% critical, >70% standard)
- Performance requirements are met (response times, load capacity)
- Accessibility requirements are met (WCAG 2.1 AA)
- Security requirements are met (penetration testing, GDPR compliance)
- Documentation is complete (user guides, API docs, deployment guides)
- Pilot testing is successful with positive user feedback
