# Database Schema Documentation

This directory contains the database schema, migrations, and data access layer for the digital voting system.

## Overview

The database is designed with **cryptographic separation** between voter identity and vote content as the core security principle. This ensures that no one, including database administrators, can determine which member cast which vote.

## Key Security Features

### 1. No Direct Link Between Members and Votes

The `encrypted_votes` table does **NOT** have a foreign key to the `members` table. Instead:

- Members authenticate and receive a `blind_token`
- The blind token is hashed and stored with the vote
- Only the `blind_token_hash` links votes to authentication, not to member identity
- This cryptographic separation is enforced at the database schema level

### 2. Cryptographic Chain in Audit Log

The `audit_log` table implements an append-only structure with cryptographic chaining:

- Each entry contains a hash of the previous entry
- This creates a tamper-evident chain
- Any modification to historical entries breaks the chain

### 3. Soft Deletes for GDPR Compliance

The `members` table uses soft deletes (`deleted_at` timestamp) to comply with GDPR while preserving archive law requirements for protocols and vote rolls.

## Database Structure

### Identity Domain

Tables that handle member identity and authentication:

- `members` - Member information and status
- `auth_sessions` - Active authentication sessions
- `blind_tokens` - Cryptographic tokens for anonymous voting

### Vote Domain

Tables that handle voting (cryptographically separated from identity):

- `voting_sessions` - Voting configuration per agenda item
- `encrypted_votes` - Encrypted votes in the ballot box
- `decrypted_votes` - Decrypted votes after voting closes
- `vote_roll` - Record of who voted (not what they voted)
- `candidates` - Candidates for elections

### Meeting Domain

Tables that handle meeting structure:

- `meetings` - Meeting metadata
- `agenda_items` - Agenda structure
- `documents` - Meeting documents
- `document_versions` - Document version history

### Protocol Domain

Tables that handle protocol generation:

- `protocols` - Generated meeting protocols
- `protocol_signatures` - Digital signatures on protocols

### Audit Domain

Tables that handle audit and compliance:

- `audit_log` - Append-only audit trail with cryptographic chain
- `system_config` - System configuration
- `data_dumps` - Backup dumps for recovery

## Migrations

Migrations are SQL files in the `migrations/` directory, numbered sequentially:

- `001_create_core_tables.sql` - Members, sessions, tokens, meetings, agenda
- `002_create_voting_tables.sql` - Voting sessions, votes, vote roll, candidates
- `003_create_audit_protocol_tables.sql` - Documents, protocols, audit log

### Running Migrations

```bash
# Run all pending migrations
npm run migrate

# Or manually
node -r tsx/register src/db/migrate.ts
```

The migration runner:

1. Creates a `migrations` table to track executed migrations
2. Loads all `.sql` files from `migrations/` directory
3. Executes pending migrations in order
4. Records each migration as executed

## Database Connection

The `connection.ts` module provides:

- Connection pool management
- Query execution
- Transaction support
- Connection testing

### Usage Examples

```typescript
import { query, transaction, getClient } from './db/connection';

// Simple query
const result = await query('SELECT * FROM members WHERE id = $1', [memberId]);

// Transaction
await transaction(async (client) => {
  await client.query('INSERT INTO members ...');
  await client.query('INSERT INTO auth_sessions ...');
});

// Get client for complex operations
const client = await getClient();
try {
  await client.query('BEGIN');
  // ... multiple queries
  await client.query('COMMIT');
} finally {
  client.release();
}
```

## Repository Pattern

Repositories provide a clean interface for database operations:

- `MemberRepository` - Member CRUD operations

### Usage Example

```typescript
import { MemberRepository } from './db/models/member.repository';

const memberRepo = new MemberRepository();

// Find member
const member = await memberRepo.findByEmail('user@example.com');

// Create member
const newMember = await memberRepo.create({
  member_number: '12345',
  email: 'user@example.com',
  name: 'John Doe',
  status: MemberStatus.ACTIVE,
  security_level: SecurityLevel.HIGH,
});

// Update member
await memberRepo.update(member.id, {
  status: MemberStatus.INACTIVE,
});
```

## Type Safety

All database entities have TypeScript interfaces in `models/types.ts`:

- Enums for all constrained values
- Interfaces matching database schema
- Type-safe query results

## Performance Considerations

### Indexes

All tables have appropriate indexes for:

- Primary keys (automatic)
- Foreign keys
- Frequently queried columns
- Composite indexes for common query patterns

### Connection Pooling

The connection pool is configured with:

- Min connections: 2 (configurable via `DATABASE_POOL_MIN`)
- Max connections: 10 (configurable via `DATABASE_POOL_MAX`)
- Idle timeout: 30 seconds
- Connection timeout: 10 seconds

## Security Considerations

### SQL Injection Prevention

All queries use parameterized statements:

```typescript
// GOOD - Parameterized
await query('SELECT * FROM members WHERE email = $1', [email]);

// BAD - String concatenation (never do this!)
await query(`SELECT * FROM members WHERE email = '${email}'`);
```

### Sensitive Data

- Passwords are never stored (use external auth or bcrypt hashes)
- Session tokens are stored hashed
- Blind tokens are stored as SHA-256 hashes
- IP addresses are anonymized after meetings

### Audit Trail

All security-relevant operations are logged to `audit_log`:

- Authentication attempts
- Administrative changes
- Vote casting (count only, not content)
- Data access

## GDPR Compliance

### Data Retention

- Member data: Deleted after meeting (soft delete)
- Session data: Deleted after expiration
- Audit logs: Anonymized after meeting
- Protocols: Preserved per archive law (overrides GDPR)
- Vote rolls: Preserved per archive law

### Right to Access

Members can request their data through the audit log and member records.

### Right to Erasure

Implemented via soft deletes, with exceptions for archive law requirements.

## Testing

Database tests should:

1. Use a separate test database
2. Run migrations before tests
3. Clean up after each test
4. Test repository methods
5. Test transaction rollback behavior

## Troubleshooting

### Connection Issues

```bash
# Test database connection
psql -h localhost -U voting -d voting_db

# Check if database is running
docker ps | grep voting-db

# View database logs
docker logs voting-db
```

### Migration Issues

```bash
# Check migration status
psql -h localhost -U voting -d voting_db -c "SELECT * FROM migrations ORDER BY id"

# Manually rollback (if needed)
# Note: Migrations don't have automatic rollback - handle carefully
```

### Performance Issues

```bash
# Check slow queries
psql -h localhost -U voting -d voting_db -c "SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10"

# Check index usage
psql -h localhost -U voting -d voting_db -c "SELECT * FROM pg_stat_user_indexes"
```

## Future Enhancements

Planned improvements:

1. Additional repositories for all entities
2. Query builder for complex queries
3. Database seeding for development
4. Automated backup scripts
5. Read replicas for scaling
6. Connection pool monitoring
