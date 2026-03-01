/**
 * Database Migration Runner
 * Executes SQL migration files in order
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { getPool, query } from './connection';

interface Migration {
  id: number;
  name: string;
  filename: string;
  sql: string;
}

/**
 * Create migrations tracking table if it doesn't exist
 */
async function createMigrationsTable(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      filename VARCHAR(255) NOT NULL,
      executed_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
}

/**
 * Get list of executed migrations
 */
async function getExecutedMigrations(): Promise<Set<number>> {
  const result = await query<{ id: number }>('SELECT id FROM migrations ORDER BY id');
  return new Set(result.rows.map((row) => row.id));
}

/**
 * Load migration files from migrations directory
 */
function loadMigrations(): Migration[] {
  const migrationsDir = join(__dirname, 'migrations');
  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  return files.map((filename) => {
    const match = filename.match(/^(\d+)_(.+)\.sql$/);
    if (!match) {
      throw new Error(`Invalid migration filename: ${filename}`);
    }

    const id = parseInt(match[1], 10);
    const name = match[2].replace(/_/g, ' ');
    const filepath = join(migrationsDir, filename);
    const sql = readFileSync(filepath, 'utf-8');

    return { id, name, filename, sql };
  });
}

/**
 * Execute a single migration
 */
async function executeMigration(migration: Migration): Promise<void> {
  console.log(`Executing migration ${migration.id}: ${migration.name}`);

  // Execute migration SQL
  await query(migration.sql);

  // Record migration as executed
  await query('INSERT INTO migrations (id, name, filename) VALUES ($1, $2, $3)', [
    migration.id,
    migration.name,
    migration.filename,
  ]);

  console.log(`✓ Migration ${migration.id} completed`);
}

/**
 * Run all pending migrations
 */
export async function runMigrations(): Promise<void> {
  try {
    console.log('Starting database migrations...');

    // Ensure migrations table exists
    await createMigrationsTable();

    // Get executed migrations
    const executed = await getExecutedMigrations();

    // Load all migrations
    const migrations = loadMigrations();

    // Filter pending migrations
    const pending = migrations.filter((m) => !executed.has(m.id));

    if (pending.length === 0) {
      console.log('No pending migrations');
      return;
    }

    console.log(`Found ${pending.length} pending migration(s)`);

    // Execute each pending migration
    for (const migration of pending) {
      await executeMigration(migration);
    }

    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

/**
 * Main function for running migrations from command line
 */
async function main() {
  try {
    // Initialize database pool
    getPool();

    // Run migrations
    await runMigrations();

    process.exit(0);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}
