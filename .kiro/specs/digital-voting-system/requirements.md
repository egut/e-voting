# Requirements Document - Digital Voting System

## Introduction

Detta är ett digitalt röstningssystem för svenska föreningar som ersätter pappersbaserad poströstning. Systemet möjliggör säker förtidsröstning och live-röstning under möten med kryptografisk separation mellan röstares identitet och röstinnehåll, samtidigt som det uppfyller svenska föreningslagar, GDPR och arkivlagen.

Systemet är designat för att vara portabelt (laptop till molntjänst), open source, och användbart för små föreningar (< 100 medlemmar) men skalbart till tusentals medlemmar.

## Glossary

- **System**: Det digitala röstningssystemet
- **Voting_Module**: Komponent som hanterar röstlagring och rösträkning
- **Authentication_Module**: Komponent som hanterar inloggning och identitetsverifiering
- **Crypto_Engine**: Komponent som hanterar kryptering och dekryptering av röster
- **Protocol_Generator**: Komponent som genererar mötesprotokoll
- **Member**: Röstberättigad medlem i föreningen
- **Chair**: Mötesordförande
- **Secretary**: Mötessekreterare
- **Election_Committee**: Valkommitté som verifierar medlemmar
- **Auditor**: Revisor som granskar systemet
- **Vote**: En enskild röst (Ja, Nej, Avstår, eller rangordning)
- **Ballot_Box**: Krypterad valurna som innehåller alla röster
- **Pre_Vote**: Förtidsröst avlagd innan mötet
- **Live_Vote**: Röst avlagd under mötet
- **Vote_Roll**: Röstlängd som visar vilka som röstat (men inte vad)
- **Receipt_Code**: Kvittokod för att verifiera att röst räknats
- **Agenda**: Dagordning för mötet
- **Agenda_Item**: Enskild punkt på dagordningen
- **Document**: Handling kopplad till möte (verksamhetsberättelse, budget, etc.)
- **Candidate**: Kandidat i personval
- **Meeting**: Ett årsmöte eller extra årsmöte
- **Quorum**: Beslutsmässighet enligt stadgar
- **WAF**: Web Application Firewall för säkerhet

## Requirements

### Requirement 1: Kryptografisk Separation av Identitet och Röst

**User Story:** As a member, I want my vote to be anonymous, so that no one can see what I voted for.

#### Acceptance Criteria

1. THE Crypto_Engine SHALL store voter identity and vote content in separate database tables with no direct foreign key relationship
2. WHEN a Member casts a vote, THE Crypto_Engine SHALL use blind signature cryptography to separate identity from vote content
3. WHEN a Meeting is archived, THE System SHALL permanently delete all mappings between Member identity and Vote content
4. THE Ballot_Box SHALL encrypt all votes using asymmetric encryption (RSA-4096 or stronger)
5. THE System SHALL ensure that database administrators cannot determine which Member cast which Vote

### Requirement 2: Encrypted Ballot Box with Delayed Decryption

**User Story:** As a meeting chair, I want results to remain hidden until I strike the gavel, so that no one can influence voting based on trends.

#### Acceptance Criteria

1. WHEN voting is open, THE Crypto_Engine SHALL encrypt all votes in real-time using the Chair's public key
2. THE System SHALL prevent all users including administrators from viewing vote contents while voting is open
3. WHEN the Chair closes voting with gavel strike, THE Crypto_Engine SHALL decrypt the Ballot_Box using the Chair's private key
4. THE Voting_Module SHALL count votes only after decryption is complete
5. IF decryption fails, THEN THE System SHALL log the error and notify the Chair with recovery options

### Requirement 3: End-to-End Verifiability

**User Story:** As a member, I want to be able to verify that my vote was counted correctly, so that I can trust the result.

#### Acceptance Criteria

1. WHEN a Member casts a vote, THE System SHALL generate a unique Receipt_Code
2. THE System SHALL display the Receipt_Code to the Member immediately after voting
3. WHEN voting is closed, THE System SHALL publish an anonymized list of all Receipt_Codes with corresponding votes
4. THE System SHALL allow any Member to verify their Receipt_Code appears in the published list
5. THE System SHALL ensure that Receipt_Codes cannot be linked back to Member identities by anyone except the Member who received it

### Requirement 4: Unlimited Vote Changes (Coercion Protection)

**User Story:** As a member, I want to be able to change my pre-vote unlimited times, so that I can vote freely even if someone tries to influence me.

#### Acceptance Criteria

1. WHILE pre-voting is open, THE System SHALL allow a Member to change their Pre_Vote unlimited times
2. WHEN a Member changes their vote, THE Voting_Module SHALL replace the previous vote with the new vote
3. THE System SHALL count only the most recent vote from each Member
4. THE System SHALL not reveal to anyone how many times a Member has changed their vote
5. WHEN the Chair closes voting, THE System SHALL finalize all votes and prevent further changes

### Requirement 5: Multiple Authentication Methods

**User Story:** As a member, I want to be able to log in using a method that works for me, so that I can participate regardless of my technical situation.

#### Acceptance Criteria

1. THE Authentication_Module SHALL support Freja eID+ authentication with Swedish personal number verification
2. THE Authentication_Module SHALL support SSO via Active Directory, Entra ID, or Google Workspace
3. THE Authentication_Module SHALL support passwordless Magic Link authentication via email
4. THE Authentication_Module SHALL support QR code authentication for on-site verification
5. THE Authentication_Module SHALL support username/password with optional MFA (TOTP or SMS)
6. WHERE Freja eID+ is used, THE System SHALL automatically verify Member status against the member register
7. WHERE manual verification is required, THE Election_Committee SHALL approve Member access through admin interface

### Requirement 6: Member Register Integration

**User Story:** As an administrator, I want to be able to integrate with our member register, so that only eligible members get access.

#### Acceptance Criteria

1. THE System SHALL support CSV file upload for member data import
2. THE System SHALL support REST API integration with real-time member verification
3. THE System SHALL support LDAP/Active Directory integration for directory services
4. THE System SHALL support hybrid integration combining multiple methods
5. WHEN a Member attempts to log in, THE Authentication_Module SHALL verify Member status is active
6. THE System SHALL validate imported member data for format correctness and duplicates
7. THE System SHALL encrypt all member data at rest using AES-256 or stronger

### Requirement 7: Multiple Voting Methods

**User Story:** As a meeting chair, I want to be able to choose the appropriate voting method for each question, so that voting follows the organization's bylaws.

#### Acceptance Criteria

1. THE Voting_Module SHALL support simple majority (plurality) voting for yes/no questions
2. THE Voting_Module SHALL support absolute majority (>50%) voting requiring more than half of votes
3. THE Voting_Module SHALL support Single Transferable Vote (STV) with ranked candidate preferences
4. THE Voting_Module SHALL support Approval Voting where voters approve multiple candidates
5. THE Voting_Module SHALL support Schulze method (Condorcet) with pairwise candidate comparisons
6. WHERE STV is used, THE Voting_Module SHALL automatically transfer votes according to STV algorithm
7. THE System SHALL allow the Chair to configure voting method per Agenda_Item

### Requirement 8: Dynamic Vote Roll

**User Story:** As a meeting chair, I want the vote roll to be based on those who actually vote, so that the system follows the adopted motion.

#### Acceptance Criteria

1. THE System SHALL create a Vote_Roll per Agenda_Item based only on Members who actively cast votes
2. THE System SHALL not include logged-in Members in Vote_Roll unless they cast a vote
3. THE System SHALL distinguish between physically present and digitally present Members
4. THE System SHALL allow the Chair to view real-time statistics of votes cast vs eligible voters
5. THE System SHALL include both physical and digital participants in the same Vote_Roll

### Requirement 9: Technical Failure Handling

**User Story:** As a meeting chair, I want to be able to handle technical problems, so that the meeting can continue even during system failures.

#### Acceptance Criteria

1. IF system downtime is less than 30 minutes, THEN THE System SHALL allow the Chair to extend voting time
2. THE System SHALL automatically log all downtime with timestamps
3. THE System SHALL suggest voting time extension based on downtime duration
4. IF system downtime exceeds 30 minutes, THEN THE System SHALL allow the Chair to pause the Meeting
5. WHEN a Meeting is paused, THE System SHALL securely save all cast votes
6. THE System SHALL allow the Chair to resume the Meeting from the exact point where it was paused
7. IF the system cannot be restored, THEN THE System SHALL export current Meeting status for protocol documentation

### Requirement 10: Document Management and Conversion

**User Story:** As a meeting coordinator, I want to be able to upload documents in various formats, so that they display responsively on all devices.

#### Acceptance Criteria

1. THE System SHALL accept Markdown (.md) files for direct display
2. THE System SHALL accept PDF files and convert them to Markdown for responsive display
3. THE System SHALL accept Word documents (.docx, .doc) and convert them to Markdown
4. THE System SHALL accept image files (JPEG, PNG, WebP) for direct display
5. WHEN a Document is uploaded, THE System SHALL preserve the original file for download
6. THE System SHALL use pandoc or pdftotext for document conversion
7. THE System SHALL allow users to preview converted Markdown before approval
8. THE System SHALL allow manual editing of converted Markdown
9. IF conversion fails, THEN THE System SHALL display the original PDF directly

### Requirement 11: Automatic Protocol Generation

**User Story:** As a secretary, I want the protocol to be generated automatically, so that I can avoid manual work.

#### Acceptance Criteria

1. THE Protocol_Generator SHALL automatically create protocol structure based on Agenda
2. WHEN voting closes, THE Protocol_Generator SHALL automatically record vote results with timestamps
3. THE Protocol_Generator SHALL number decisions sequentially (e.g., ÅM2025-001)
4. THE Protocol_Generator SHALL categorize decisions (statute change, budget, election, etc.)
5. THE System SHALL allow the Secretary to add comments and notes during the Meeting
6. THE Protocol_Generator SHALL include meeting opening (time, place, chair, secretary, adjusters)
7. THE Protocol_Generator SHALL include attendance list (physical and digital participants)
8. THE Protocol_Generator SHALL include all Agenda_Items with decisions and vote results
9. THE Protocol_Generator SHALL include all Documents as appendices
10. THE Protocol_Generator SHALL include meeting closing with time

### Requirement 12: Digital Protocol Signing

**User Story:** As a meeting chair, I want to be able to sign the protocol digitally, so that the adjustment process is efficient.

#### Acceptance Criteria

1. THE System SHALL support digital signatures using Freja eID, BankID, or equivalent
2. THE Protocol_Generator SHALL require signatures from Chair and two adjusters
3. WHEN a signature is added, THE System SHALL add cryptographic timestamp
4. THE System SHALL allow signature verification by any Member
5. THE System SHALL export signed protocol as PDF with embedded signatures
6. THE System SHALL calculate SHA-256 checksum for protocol integrity verification

### Requirement 13: Data Dump and Quick Recovery

**User Story:** As a technical administrator, I want to be able to move the system to a new computer quickly, so that the meeting can continue in case of failure.

#### Acceptance Criteria

1. THE System SHALL generate complete data dump of all current data in JSON format
2. THE System SHALL include members, votes, agenda, documents, and configuration in data dump
3. THE System SHALL calculate checksum for data dump integrity verification
4. WHEN restoring from data dump, THE System SHALL complete restoration in less than 5 minutes
5. WHILE a Meeting is active, THE System SHALL automatically create data dump every 15 minutes
6. WHEN a Meeting ends, THE System SHALL create final data dump
7. THE System SHALL provide clear documentation for restoration process

### Requirement 14: API Response Time Performance

**User Story:** As a member, I want the system to be fast, so that voting feels responsive.

#### Acceptance Criteria

1. WHEN a Member casts a vote, THE System SHALL complete the transaction in less than 150ms including encryption
2. WHEN a Member logs in, THE Authentication_Module SHALL complete authentication in less than 200ms excluding external services
3. WHEN a Member requests a Document less than 1MB, THE System SHALL deliver it in less than 100ms
4. WHEN voting closes, THE System SHALL present results in less than 500ms for elections with fewer than 500 votes
5. THE System SHALL maintain these response times under normal load (50 concurrent users)
6. WHEN load exceeds 200 concurrent users, THE System SHALL accept response times up to 2x normal (300ms for voting)

### Requirement 15: Load Capacity and Scalability

**User Story:** As a technical administrator, I want the system to handle expected load, so that everyone can vote simultaneously.

#### Acceptance Criteria

1. THE System SHALL support 50 concurrent users under normal load without performance degradation
2. THE System SHALL support 200 concurrent users during peak load (live voting)
3. THE System SHALL support 500 concurrent users at maximum load
4. WHEN load exceeds capacity, THE System SHALL implement queuing with clear feedback to users
5. THE System SHALL use database indexing for all frequently accessed queries
6. THE System SHALL cache static data (agenda, documents) in memory
7. THE System SHALL support horizontal scaling by adding more backend servers

### Requirement 16: Minimal External Dependencies

**User Story:** As a security officer, I want to minimize external dependencies, so that the attack surface is small.

#### Acceptance Criteria

1. THE System SHALL use only standard library cryptography implementations (Node.js crypto, Python cryptography, Go crypto/\*)
2. THE System SHALL never use custom cryptographic algorithms or unknown libraries
3. WHERE a single function is needed from a library, THE System SHALL copy the function instead of importing entire library
4. THE System SHALL document all copied code with source URL, license, and date
5. THE System SHALL only use external libraries with more than 1000 GitHub stars or 100k weekly downloads
6. THE System SHALL check CVE database for known vulnerabilities before adding dependencies
7. THE System SHALL maintain DEPENDENCIES.md with all approved libraries including name, version, license, purpose, and review date

### Requirement 17: Comprehensive Audit Logging

**User Story:** As an auditor, I want to be able to review all administrative changes, so that I can verify that the system has been used correctly.

#### Acceptance Criteria

1. THE System SHALL log all successful and failed authentication attempts with timestamp and IP address
2. THE System SHALL log all administrative changes (agenda, configuration, member management) with user, action, and timestamp
3. THE System SHALL log vote counts per question without revealing individual vote contents
4. THE System SHALL log all system errors and warnings
5. THE System SHALL log all access to sensitive data (member register, logs)
6. THE System SHALL use append-only log structure that cannot be modified or deleted
7. THE System SHALL create cryptographic chain where each log entry contains hash of previous entry
8. THE System SHALL allow Auditor to export logs in JSON or CSV format
9. THE System SHALL anonymize personal data in logs after Meeting according to GDPR

### Requirement 18: WCAG 2.1 Level AA Accessibility

**User Story:** As a member with disabilities, I want to be able to use the system, so that I can participate on equal terms.

#### Acceptance Criteria

1. THE System SHALL make all functions accessible via keyboard navigation
2. THE System SHALL follow visual tab order for keyboard navigation
3. THE System SHALL display clear and visible focus indicators
4. THE System SHALL use semantic HTML with correct ARIA attributes
5. THE System SHALL provide clear headings and landmarks for screen reader navigation
6. THE System SHALL use descriptive link text (not "click here")
7. THE System SHALL announce progress indicators to screen readers
8. THE System SHALL announce error messages immediately to screen readers
9. THE System SHALL maintain minimum 4.5:1 contrast ratio for normal text and 3:1 for large text
10. THE System SHALL never convey information through color alone
11. THE System SHALL provide alternative text for all images
12. THE System SHALL allow Escape key to close dialogs

### Requirement 19: Multi-language Support

**User Story:** As an international member, I want to be able to use the system in English, so that I understand what is happening.

#### Acceptance Criteria

1. THE System SHALL provide complete Swedish and English translations for all interface text
2. THE System SHALL display language selector on login page
3. THE System SHALL remember Member's language preference for future sessions
4. THE System SHALL allow Members to change language at any time during Meeting
5. THE System SHALL display time in both Swedish time and Member's local timezone
6. THE System SHALL use i18n framework to support additional languages
7. THE System SHALL use consistent terminology throughout the interface

### Requirement 20: White-label Configuration

**User Story:** As an organization administrator, I want to be able to customize the system for our organization, so that it looks professional.

#### Acceptance Criteria

1. THE System SHALL allow configuration of organization name displayed on login screen, header, and protocol
2. THE System SHALL allow upload of organization logo in SVG or PNG format
3. THE System SHALL provide 13+ predefined color themes
4. THE System SHALL allow custom color theme configuration (primary and secondary colors)
5. THE System SHALL store all organization-specific configuration in config.yaml or settings.json file
6. THE System SHALL allow configuration file to be saved and reused for next year's meeting
7. THE System SHALL support version control of configuration files

### Requirement 21: Portable Deployment

**User Story:** As a technical administrator, I want to be able to run the system on different platforms, so that I can choose appropriate hosting.

#### Acceptance Criteria

1. THE System SHALL package all components (frontend, backend, database, WAF) in Docker containers
2. THE System SHALL start with single command: docker-compose up -d
3. THE System SHALL run on a standard laptop with 8GB RAM
4. THE System SHALL support SQLite for small installations (< 100 members)
5. THE System SHALL support PostgreSQL for larger installations
6. THE System SHALL provide Kubernetes Helm charts for cloud deployment
7. THE System SHALL use stateless backend design (except database) for horizontal scaling
8. THE System SHALL support deployment on laptop, VPS, or cloud services (AWS, Azure, GCP)

### Requirement 22: Web Application Firewall Protection

**User Story:** As a security officer, I want the system to be protected against attacks, so that voting cannot be manipulated.

#### Acceptance Criteria

1. THE System SHALL include lightweight WAF (Caddy, Traefik, or Nginx with ModSecurity/Coraza) in Docker stack
2. THE WAF SHALL implement rate limiting to prevent brute-force attacks
3. THE WAF SHALL filter SQL injection attempts
4. THE WAF SHALL filter XSS (Cross-Site Scripting) attempts
5. THE System SHALL support Cloudflare integration for DDoS protection
6. WHERE Cloudflare is used, THE WAF SHALL accept traffic only from Cloudflare IP ranges using Authenticated Origin Pulls
7. THE System SHALL log all blocked requests with timestamp and IP address

### Requirement 23: GDPR Compliance with Archive Law Exception

**User Story:** As a data protection officer, I want the system to comply with GDPR, so that we handle personal data correctly.

#### Acceptance Criteria

1. THE System SHALL collect only necessary personal data with documented purpose
2. THE System SHALL encrypt all personal data at rest using AES-256 or stronger
3. THE System SHALL encrypt all personal data in transit using TLS 1.3 or stronger
4. THE System SHALL delete member information after Meeting according to retention policy
5. THE System SHALL preserve protocol with Vote_Roll according to archive law (overrides GDPR)
6. THE System SHALL anonymize logs after Meeting where possible
7. THE System SHALL allow Members to request their personal data
8. THE System SHALL provide clear information to Members about data handling
9. THE System SHALL require Data Protection Impact Assessment (DPIA) before first use

### Requirement 24: Election Committee Member Management

**User Story:** As an election committee member, I want to be able to handle special cases, so that all eligible members get access.

#### Acceptance Criteria

1. THE System SHALL display list of Members awaiting manual approval
2. THE System SHALL show Member name, member number, email, country, and request date for pending approvals
3. THE System SHALL allow Election_Committee to approve or reject Member access requests
4. THE System SHALL allow Election_Committee to manually add Members with reason (late payment, new member, technical problem, international member)
5. THE System SHALL allow Election_Committee to generate Magic Link sent via email
6. THE System SHALL allow Election_Committee to generate QR code displayed on screen for scanning
7. THE System SHALL allow Election_Committee to generate temporary password for manual transfer
8. THE System SHALL log all manual approvals with approver name, timestamp, and reason
9. THE System SHALL mark manually verified Members in Vote_Roll with verification method and approver

### Requirement 25: Security Level Badges

**User Story:** As an election committee member, I want to see the security level for each member, so that I can identify potential risks.

#### Acceptance Criteria

1. THE System SHALL assign security badge to each Member based on authentication method and member register integration
2. THE System SHALL display "Very High" (green) badge for Freja eID+ with API integration
3. THE System SHALL display "High" (light green) badge for SSO with MFA and Directory Services, or Freja eID+ with CSV
4. THE System SHALL display "Medium" (yellow) badge for Magic Link with API, or Username/Password with MFA and CSV
5. THE System SHALL display "Low" (orange) badge for QR code with manual addition, or Magic Link with CSV
6. THE System SHALL display "Manual" (red) badge for Username/Password without MFA
7. THE System SHALL show Election_Committee a security overview dashboard with distribution of security levels
8. IF more than 10% of Members have low security level, THEN THE System SHALL display warning to Election_Committee

### Requirement 26: Real-time Dashboard and Statistics

**User Story:** As a meeting chair, I want to see real-time statistics, so that I can make informed decisions during the meeting.

#### Acceptance Criteria

1. THE System SHALL display real-time count of logged-in Members
2. THE System SHALL display count of physically present Members
3. THE System SHALL display count of digitally present Members
4. THE System SHALL display count of votes cast for current question
5. THE System SHALL display percentage of present Members who have voted
6. THE System SHALL display countdown timer during voting
7. THE System SHALL display historical vote results for previous questions
8. WHERE user is technical administrator, THE System SHALL display system health metrics (CPU, memory, database connections, API response times, error rate, WebSocket connections)
9. THE System SHALL update dashboard every second via WebSocket
10. THE System SHALL allow export of statistics as CSV or JSON

### Requirement 27: Transparency and Security Documentation

**User Story:** As a curious member, I want to be able to read about the system's security, so that I can trust the voting.

#### Acceptance Criteria

1. THE System SHALL provide dedicated transparency page (e.g., /transparency)
2. THE System SHALL publish Data Protection Impact Assessment (DPIA)
3. THE System SHALL publish threat modeling with identified threats and mitigations
4. THE System SHALL publish results from independent security audits
5. THE System SHALL publish results from penetration tests (anonymized)
6. THE System SHALL publish system architecture overview
7. THE System SHALL publish explanation of cryptographic methods used
8. THE System SHALL publish explanation of audit trail and what is logged
9. THE System SHALL publish explanation of End-to-End Verifiability
10. THE System SHALL allow all documents to be downloaded as PDF
11. THE System SHALL maintain version history of all transparency documents

### Requirement 28: Advisory Motions and "Other Business"

**User Story:** As a member, I want to be able to submit advisory motions, so that I can influence the organization's future.

#### Acceptance Criteria

1. THE System SHALL allow Members to submit advisory motions before configurable deadline
2. THE System SHALL provide Markdown editor with preview for motion writing
3. THE System SHALL provide templates for common motion types
4. WHEN a Member submits a motion, THE System SHALL notify the Chair for review
5. THE System SHALL allow the Chair to approve or reject motions with reason
6. WHERE motion is approved, THE System SHALL add it to Agenda under "Advisory Motions" or "Other Business"
7. THE System SHALL document all submitted motions (both approved and rejected)
8. THE System SHALL allow Members to view status of their submitted motions
9. THE System SHALL mark advisory decisions clearly as non-binding
10. WHEN "Other Business" is reached, THE System SHALL allow Secretary to add items raised during Meeting

### Requirement 29: LLM-Assisted Configuration

**User Story:** As an organization administrator, I want help configuring the system, so that it follows our bylaws.

#### Acceptance Criteria

1. THE System SHALL provide prompt template for LLM configuration generation
2. THE System SHALL accept organization bylaws as input (PDF or Word)
3. THE System SHALL provide interactive configuration wizard as alternative to LLM
4. WHEN bylaws are uploaded, THE System SHALL attempt to extract relevant information
5. THE System SHALL ask follow-up questions to clarify ambiguous requirements
6. THE System SHALL generate configuration file (YAML or JSON) based on bylaws
7. THE System SHALL validate generated configuration for correctness
8. THE System SHALL display warnings for potential configuration problems
9. THE System SHALL provide recommendations based on best practices
10. THE System SHALL provide templates for common organization types (non-profit, economic association, housing cooperative, student organization)

### Requirement 30: Candidate Management

**User Story:** As an election committee member, I want to be able to add candidates, so that members can make informed choices.

#### Acceptance Criteria

1. THE System SHALL allow Election_Committee to add Candidates with name, email, phone, position, profile picture, and presentation
2. THE System SHALL provide image cropping tool for profile pictures
3. THE System SHALL support Markdown formatting for Candidate presentations (max 500 words)
4. THE System SHALL display preview of candidate card before publishing
5. THE System SHALL allow Election_Committee to configure voting method per election (STV, Approval Voting, Simple Majority)
6. THE System SHALL allow Election_Committee to configure number of positions per election (e.g., 3 board members)
7. THE System SHALL display all Candidates for an election in consistent format

### Requirement 31: Configurable Quorum

**User Story:** As a meeting chair, I want the system to check quorum, so that decisions are valid according to the bylaws.

#### Acceptance Criteria

1. THE System SHALL support configurable quorum levels per question type
2. THE System SHALL support simple majority (> 50% of votes)
3. THE System SHALL support absolute majority (> 50% of eligible voters)
4. THE System SHALL support qualified majority (2/3 or other fraction of votes)
5. WHEN voting opens, THE System SHALL check if Meeting has quorum
6. IF quorum is not met, THEN THE System SHALL display warning to Chair
7. THE System SHALL allow Chair to postpone decision to next Meeting
8. THE System SHALL document quorum status in protocol

### Requirement 32: Automatic Reminders and Notifications

**User Story:** As a member, I want to receive reminders about the meeting, so that I don't miss voting.

#### Acceptance Criteria

1. THE System SHALL send first notice according to organization bylaws (configurable weeks before Meeting)
2. THE System SHALL send second notice according to organization bylaws (configurable weeks before Meeting)
3. THE System SHALL automatically check that all required Documents are attached before sending notice
4. THE System SHALL send reminder 1 week before Meeting
5. THE System SHALL notify Members when Documents are published
6. THE System SHALL notify Members when pre-voting opens
7. IF Documents are changed, THEN THE System SHALL clearly mark which version is current
8. THE System SHALL log all Document changes with timestamp and responsible person

### Requirement 33: Auditor Interface

**User Story:** As an auditor, I want to be able to review the system, so that I can verify that everything was done correctly.

#### Acceptance Criteria

1. THE System SHALL provide special Auditor role with read-only access to logs
2. THE System SHALL allow Auditor to view all logs without seeing mapping between Member and Vote
3. THE System SHALL allow Auditor to export data for external review
4. THE System SHALL allow Auditor to view all administrative changes
5. THE System SHALL allow Auditor to upload audit report as appendix to protocol
6. THE System SHALL automatically link audit report to agenda item about discharge from liability
7. THE System SHALL display Auditor's statement before voting on discharge
8. THE System SHALL provide clear guide for Auditor explaining system functionality
9. THE System SHALL document what Auditor can and cannot access

### Requirement 34: Parser and Serializer Round-trip Testing

**User Story:** As a developer, I want parsers and serializers to be correct, so that data is not corrupted.

#### Acceptance Criteria

1. WHERE the System parses configuration files, THE System SHALL include a pretty printer to format Configuration objects back to files
2. WHERE the System parses Documents, THE System SHALL include a serializer to format Document objects back to original format
3. WHERE the System parses vote data, THE System SHALL include a serializer to format Vote objects back to structured format
4. FOR ALL valid Configuration objects, parsing then printing then parsing SHALL produce an equivalent object (round-trip property)
5. FOR ALL valid Document objects, parsing then serializing then parsing SHALL produce an equivalent object (round-trip property)
6. FOR ALL valid Vote objects, parsing then serializing then parsing SHALL produce an equivalent object (round-trip property)
7. THE System SHALL test round-trip properties with property-based testing for at least 1000 random inputs

### Requirement 35: Simulation Testing with LLM Personas

**User Story:** As a tester, I want to be able to simulate realistic users, so that I can find problems before production use.

#### Acceptance Criteria

1. THE System SHALL support load testing with 50, 200, and 500 concurrent users
2. THE System SHALL measure API response times (p50, p95, p99) under load
3. THE System SHALL measure throughput (requests per second) under load
4. THE System SHALL measure error rate (percentage of failed requests) under load
5. THE System SHALL support LLM-based persona testing using Ollama or similar
6. THE System SHALL provide at least 6 different persona types (engaged member, disinterested member, technically challenged member, critical member, stickler for rules, remote participant)
7. THE System SHALL run simulation tests with 20-50 LLM personas interacting with the system
8. THE System SHALL measure how many personas successfully log in, vote, request to speak, and experience technical problems
9. THE System SHALL identify usability problems, performance problems, and security problems from simulation results

### Requirement 36: Pilot Testing Before Production

**User Story:** As a project manager, I want to test the system with real users, so that I can find problems before the annual meeting.

#### Acceptance Criteria

1. THE System SHALL undergo pilot testing with at least 20 test participants before first production use
2. THE pilot test SHALL include representation from different roles and technical competence levels
3. THE pilot test SHALL include at least one person with disabilities for accessibility testing
4. THE pilot test SHALL include at least one person with limited technical experience
5. THE pilot test SHALL include independent observer who documents the testing
6. THE pilot test SHALL simulate complete annual meeting from start to finish
7. THE pilot test SHALL test all voting methods (simple majority, STV, etc.)
8. THE pilot test SHALL simulate technical failure and recovery
9. THE System SHALL collect feedback from all participants via survey
10. THE pilot test SHALL be conducted at least 3 months before first production use
11. IF major changes are made after pilot test, THEN THE System SHALL conduct new pilot test
