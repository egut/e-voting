/**
 * Session Repository
 *
 * Database operations for authentication sessions.
 *
 * Requirements: 5.1, 5.5
 */

import { query } from '../db/connection';
import { ISessionRepository } from './interfaces';
import { Session } from './types';
import { AuthSession } from '../db/models/types';

export class SessionRepository implements ISessionRepository {
  /**
   * Create a new session in the database
   */
  async create(session: Omit<Session, 'id'>): Promise<Session> {
    const result = await query<AuthSession>(
      `INSERT INTO auth_sessions
       (member_id, session_token, auth_method, security_level, ip_address, user_agent, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        session.memberId,
        session.sessionToken,
        session.authMethod,
        session.securityLevel,
        session.ipAddress || null,
        session.userAgent || null,
        session.expiresAt,
      ]
    );

    return this.mapToSession(result.rows[0]);
  }

  /**
   * Find session by token
   */
  async findByToken(sessionToken: string): Promise<Session | null> {
    const result = await query<AuthSession>(
      `SELECT * FROM auth_sessions
       WHERE session_token = $1
       AND revoked_at IS NULL
       AND expires_at > NOW()`,
      [sessionToken]
    );

    return result.rows[0] ? this.mapToSession(result.rows[0]) : null;
  }

  /**
   * Find active sessions for a member
   */
  async findActiveSessions(memberId: string): Promise<Session[]> {
    const result = await query<AuthSession>(
      `SELECT * FROM auth_sessions
       WHERE member_id = $1
       AND revoked_at IS NULL
       AND expires_at > NOW()
       ORDER BY created_at DESC`,
      [memberId]
    );

    return result.rows.map((row) => this.mapToSession(row));
  }

  /**
   * Revoke a session
   */
  async revoke(sessionToken: string): Promise<boolean> {
    const result = await query(
      `UPDATE auth_sessions
       SET revoked_at = NOW()
       WHERE session_token = $1
       AND revoked_at IS NULL`,
      [sessionToken]
    );

    return result.rowCount !== null && result.rowCount > 0;
  }

  /**
   * Revoke all sessions for a member
   */
  async revokeAllForMember(memberId: string): Promise<number> {
    const result = await query(
      `UPDATE auth_sessions
       SET revoked_at = NOW()
       WHERE member_id = $1
       AND revoked_at IS NULL`,
      [memberId]
    );

    return result.rowCount || 0;
  }

  /**
   * Clean up expired sessions
   */
  async cleanupExpired(): Promise<number> {
    const result = await query(
      `DELETE FROM auth_sessions
       WHERE expires_at < NOW() - INTERVAL '7 days'`
    );

    return result.rowCount || 0;
  }

  /**
   * Map database row to Session type
   */
  private mapToSession(row: AuthSession): Session {
    return {
      id: row.id,
      memberId: row.member_id,
      sessionToken: row.session_token,
      authMethod: row.auth_method,
      securityLevel: row.security_level,
      ipAddress: row.ip_address,
      userAgent: row.user_agent,
      createdAt: row.created_at,
      expiresAt: row.expires_at,
      revokedAt: row.revoked_at,
    };
  }
}
