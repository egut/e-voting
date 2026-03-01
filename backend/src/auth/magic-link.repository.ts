/**
 * Magic Link Token Repository
 *
 * Handles storage and retrieval of magic link tokens.
 *
 * Requirements: 5.3, 25.4
 */

import { MagicLinkToken } from './types';

export interface IMagicLinkRepository {
  store(token: MagicLinkToken): Promise<void>;
  findByToken(token: string): Promise<MagicLinkToken | null>;
  markAsUsed(token: string): Promise<void>;
  cleanupExpired(): Promise<number>;
}

/**
 * In-memory implementation for testing
 * TODO: Replace with database implementation in production
 */
export class MagicLinkRepository implements IMagicLinkRepository {
  private tokens: Map<string, MagicLinkToken> = new Map();

  async store(token: MagicLinkToken): Promise<void> {
    this.tokens.set(token.token, token);
  }

  async findByToken(token: string): Promise<MagicLinkToken | null> {
    const magicLink = this.tokens.get(token);
    if (!magicLink) {
      return null;
    }

    // Check if expired
    if (magicLink.expiresAt < new Date()) {
      return null;
    }

    // Check if already used
    if (magicLink.used) {
      return null;
    }

    return magicLink;
  }

  async markAsUsed(token: string): Promise<void> {
    const magicLink = this.tokens.get(token);
    if (magicLink) {
      magicLink.used = true;
      this.tokens.set(token, magicLink);
    }
  }

  async cleanupExpired(): Promise<number> {
    const now = new Date();
    let count = 0;

    for (const [token, magicLink] of this.tokens.entries()) {
      if (magicLink.expiresAt < now) {
        this.tokens.delete(token);
        count++;
      }
    }

    return count;
  }
}
