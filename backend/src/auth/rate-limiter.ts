/**
 * Rate Limiter
 *
 * Prevents brute-force attacks on authentication endpoints.
 *
 * Requirement: 22.2 (Rate limiting to prevent brute-force attacks)
 */

import { IRateLimiter } from './interfaces';
import { AuthMethod } from '../db/models/types';
import { AuthAttempt, RateLimitConfig } from './types';

/**
 * In-memory rate limiter
 *
 * For production, this should be replaced with Redis-based implementation
 * to support distributed rate limiting across multiple servers.
 */
export class RateLimiter implements IRateLimiter {
  private attempts: Map<string, AuthAttempt[]> = new Map();
  private config: RateLimitConfig;

  constructor(config?: Partial<RateLimitConfig>) {
    this.config = {
      maxAttempts: config?.maxAttempts || 5,
      windowMinutes: config?.windowMinutes || 15,
      blockDurationMinutes: config?.blockDurationMinutes || 30,
    };
  }

  /**
   * Check if an identifier is rate limited
   */
  async isRateLimited(identifier: string): Promise<boolean> {
    const attempts = this.getRecentAttempts(identifier);

    // Count failed attempts in the window
    const failedAttempts = attempts.filter((a) => !a.success);

    if (failedAttempts.length >= this.config.maxAttempts) {
      // Check if block duration has passed since last failed attempt
      const lastFailedAttempt = failedAttempts[failedAttempts.length - 1];
      const blockUntil = new Date(
        lastFailedAttempt.timestamp.getTime() + this.config.blockDurationMinutes * 60 * 1000
      );

      if (new Date() < blockUntil) {
        return true;
      }
    }

    return false;
  }

  /**
   * Record an authentication attempt
   */
  async recordAttempt(identifier: string, success: boolean, authMethod: AuthMethod): Promise<void> {
    const attempts = this.attempts.get(identifier) || [];

    attempts.push({
      identifier,
      timestamp: new Date(),
      success,
      authMethod,
    });

    this.attempts.set(identifier, attempts);

    // Clean up old attempts
    this.cleanupOldAttempts(identifier);
  }

  /**
   * Reset rate limit for an identifier
   */
  async reset(identifier: string): Promise<void> {
    this.attempts.delete(identifier);
  }

  /**
   * Get recent attempts within the time window
   */
  private getRecentAttempts(identifier: string): AuthAttempt[] {
    const attempts = this.attempts.get(identifier) || [];
    const windowStart = new Date(Date.now() - this.config.windowMinutes * 60 * 1000);

    return attempts.filter((a) => a.timestamp >= windowStart);
  }

  /**
   * Clean up attempts older than the window
   */
  private cleanupOldAttempts(identifier: string): void {
    const recentAttempts = this.getRecentAttempts(identifier);

    if (recentAttempts.length === 0) {
      this.attempts.delete(identifier);
    } else {
      this.attempts.set(identifier, recentAttempts);
    }
  }

  /**
   * Clean up all old attempts (should be called periodically)
   */
  async cleanupAll(): Promise<void> {
    const identifiers = Array.from(this.attempts.keys());

    for (const identifier of identifiers) {
      this.cleanupOldAttempts(identifier);
    }
  }
}
