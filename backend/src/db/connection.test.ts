/**
 * Database Connection Tests
 * Note: Integration tests require a running PostgreSQL database
 * Run: docker-compose up -d postgres (from infrastructure directory)
 */

import {
  initializePool,
  getPool,
  query,
  transaction,
  testConnection,
  closePool,
} from './connection';

describe('Database Connection', () => {
  afterAll(async () => {
    await closePool();
  });

  describe('initializePool', () => {
    it('should initialize a connection pool', () => {
      const pool = initializePool();
      expect(pool).toBeDefined();
    });

    it('should return the same pool on subsequent calls', () => {
      const pool1 = initializePool();
      const pool2 = initializePool();
      expect(pool1).toBe(pool2);
    });
  });

  describe('getPool', () => {
    it('should return the connection pool', () => {
      const pool = getPool();
      expect(pool).toBeDefined();
    });
  });

  // Integration tests - require database
  describe.skip('Integration tests (require database)', () => {
    describe('testConnection', () => {
      it('should successfully test database connection', async () => {
        const result = await testConnection();
        expect(result).toBe(true);
      });
    });

    describe('query', () => {
      it('should execute a simple query', async () => {
        const result = await query('SELECT NOW() as now');
        expect(result.rows).toHaveLength(1);
        expect(result.rows[0].now).toBeDefined();
      });

      it('should execute a parameterized query', async () => {
        const result = await query('SELECT $1::text as value', ['test']);
        expect(result.rows[0].value).toBe('test');
      });
    });

    describe('transaction', () => {
      it('should commit a successful transaction', async () => {
        const result = await transaction(async (client) => {
          const res = await client.query('SELECT 1 as value');
          return res.rows[0].value;
        });
        expect(result).toBe(1);
      });

      it('should rollback a failed transaction', async () => {
        await expect(
          transaction(async (client) => {
            await client.query('SELECT 1');
            throw new Error('Test error');
          })
        ).rejects.toThrow('Test error');
      });
    });
  });
});
