/**
 * Database Connection Module
 * Manages PostgreSQL connection pool and provides query interface
 */

import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';

let pool: Pool | null = null;

/**
 * Database configuration from environment variables
 */
interface DatabaseConfig {
  connectionString: string;
  max?: number;
  min?: number;
  idleTimeoutMillis?: number;
  connectionTimeoutMillis?: number;
}

/**
 * Get database configuration from environment
 */
function getDatabaseConfig(): DatabaseConfig {
  const connectionString =
    process.env.DATABASE_URL || 'postgresql://voting:voting@localhost:5432/voting_db';

  return {
    connectionString,
    max: parseInt(process.env.DATABASE_POOL_MAX || '10', 10),
    min: parseInt(process.env.DATABASE_POOL_MIN || '2', 10),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  };
}

/**
 * Initialize database connection pool
 */
export function initializePool(): Pool {
  if (pool) {
    return pool;
  }

  const config = getDatabaseConfig();
  pool = new Pool(config);

  // Handle pool errors
  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
  });

  return pool;
}

/**
 * Get the database connection pool
 */
export function getPool(): Pool {
  if (!pool) {
    return initializePool();
  }
  return pool;
}

/**
 * Execute a query with parameters
 */
export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const pool = getPool();
  return pool.query<T>(text, params);
}

/**
 * Get a client from the pool for transactions
 */
export async function getClient(): Promise<PoolClient> {
  const pool = getPool();
  return pool.connect();
}

/**
 * Execute a function within a transaction
 */
export async function transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await getClient();

  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Close the database connection pool
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const result = await query('SELECT NOW() as now');
    return result.rows.length > 0;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}
