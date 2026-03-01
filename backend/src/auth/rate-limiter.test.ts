/**
 * Rate Limiter Unit Tests
 */

import { RateLimiter } from './rate-limiter';
import { AuthMethod } from '../db/models/types';

describe('RateLimiter', () => {
  let rateLimiter: RateLimiter;

  beforeEach(() => {
    rateLimiter = new RateLimiter({
      maxAttempts: 3,
      windowMinutes: 15,
      blockDurationMinutes: 30,
    });
  });

  describe('isRateLimited', () => {
    it('should not rate limit with no attempts', async () => {
      const limited = await rateLimiter.isRateLimited('test@example.com');
      expect(limited).toBe(false);
    });

    it('should not rate limit with successful attempts', async () => {
      await rateLimiter.recordAttempt('test@example.com', true, AuthMethod.PASSWORD);
      await rateLimiter.recordAttempt('test@example.com', true, AuthMethod.PASSWORD);
      await rateLimiter.recordAttempt('test@example.com', true, AuthMethod.PASSWORD);

      const limited = await rateLimiter.isRateLimited('test@example.com');
      expect(limited).toBe(false);
    });

    it('should rate limit after max failed attempts', async () => {
      await rateLimiter.recordAttempt('test@example.com', false, AuthMethod.PASSWORD);
      await rateLimiter.recordAttempt('test@example.com', false, AuthMethod.PASSWORD);
      await rateLimiter.recordAttempt('test@example.com', false, AuthMethod.PASSWORD);

      const limited = await rateLimiter.isRateLimited('test@example.com');
      expect(limited).toBe(true);
    });

    it('should not rate limit mixed success/failure under threshold', async () => {
      await rateLimiter.recordAttempt('test@example.com', false, AuthMethod.PASSWORD);
      await rateLimiter.recordAttempt('test@example.com', true, AuthMethod.PASSWORD);
      await rateLimiter.recordAttempt('test@example.com', false, AuthMethod.PASSWORD);

      const limited = await rateLimiter.isRateLimited('test@example.com');
      expect(limited).toBe(false);
    });

    it('should track different identifiers separately', async () => {
      await rateLimiter.recordAttempt('user1@example.com', false, AuthMethod.PASSWORD);
      await rateLimiter.recordAttempt('user1@example.com', false, AuthMethod.PASSWORD);
      await rateLimiter.recordAttempt('user1@example.com', false, AuthMethod.PASSWORD);

      await rateLimiter.recordAttempt('user2@example.com', false, AuthMethod.PASSWORD);

      const limited1 = await rateLimiter.isRateLimited('user1@example.com');
      const limited2 = await rateLimiter.isRateLimited('user2@example.com');

      expect(limited1).toBe(true);
      expect(limited2).toBe(false);
    });
  });

  describe('recordAttempt', () => {
    it('should record authentication attempts', async () => {
      await rateLimiter.recordAttempt('test@example.com', false, AuthMethod.PASSWORD);

      const limited = await rateLimiter.isRateLimited('test@example.com');
      expect(limited).toBe(false); // Not yet at threshold
    });

    it('should record different auth methods', async () => {
      await rateLimiter.recordAttempt('test@example.com', false, AuthMethod.PASSWORD);
      await rateLimiter.recordAttempt('test@example.com', false, AuthMethod.MAGIC_LINK);
      await rateLimiter.recordAttempt('test@example.com', false, AuthMethod.FREJA_EID);

      const limited = await rateLimiter.isRateLimited('test@example.com');
      expect(limited).toBe(true);
    });
  });

  describe('reset', () => {
    it('should reset rate limit for identifier', async () => {
      await rateLimiter.recordAttempt('test@example.com', false, AuthMethod.PASSWORD);
      await rateLimiter.recordAttempt('test@example.com', false, AuthMethod.PASSWORD);
      await rateLimiter.recordAttempt('test@example.com', false, AuthMethod.PASSWORD);

      let limited = await rateLimiter.isRateLimited('test@example.com');
      expect(limited).toBe(true);

      await rateLimiter.reset('test@example.com');

      limited = await rateLimiter.isRateLimited('test@example.com');
      expect(limited).toBe(false);
    });
  });

  describe('cleanupAll', () => {
    it('should clean up old attempts', async () => {
      await rateLimiter.recordAttempt('test@example.com', false, AuthMethod.PASSWORD);

      await rateLimiter.cleanupAll();

      // Attempts should still be there (not old enough)
      const limited = await rateLimiter.isRateLimited('test@example.com');
      expect(limited).toBe(false);
    });
  });
});
