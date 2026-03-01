/**
 * Member Repository
 * Database operations for members table
 */

import { query } from '../connection';
import { Member, MemberStatus, SecurityLevel } from './types';

export class MemberRepository {
  /**
   * Find member by ID
   */
  async findById(id: string): Promise<Member | null> {
    const result = await query<Member>(
      'SELECT * FROM members WHERE id = $1 AND deleted_at IS NULL',
      [id]
    );
    return result.rows[0] || null;
  }

  /**
   * Find member by email
   */
  async findByEmail(email: string): Promise<Member | null> {
    const result = await query<Member>(
      'SELECT * FROM members WHERE email = $1 AND deleted_at IS NULL',
      [email]
    );
    return result.rows[0] || null;
  }

  /**
   * Find member by member number
   */
  async findByMemberNumber(memberNumber: string): Promise<Member | null> {
    const result = await query<Member>(
      'SELECT * FROM members WHERE member_number = $1 AND deleted_at IS NULL',
      [memberNumber]
    );
    return result.rows[0] || null;
  }

  /**
   * Find all active members
   */
  async findActive(): Promise<Member[]> {
    const result = await query<Member>(
      'SELECT * FROM members WHERE status = $1 AND deleted_at IS NULL ORDER BY name',
      [MemberStatus.ACTIVE]
    );
    return result.rows;
  }

  /**
   * Find members by status
   */
  async findByStatus(status: MemberStatus): Promise<Member[]> {
    const result = await query<Member>(
      'SELECT * FROM members WHERE status = $1 AND deleted_at IS NULL ORDER BY name',
      [status]
    );
    return result.rows;
  }

  /**
   * Create a new member
   */
  async create(data: {
    member_number: string;
    email: string;
    name: string;
    country?: string;
    status: MemberStatus;
    security_level: SecurityLevel;
  }): Promise<Member> {
    const result = await query<Member>(
      `INSERT INTO members (member_number, email, name, country, status, security_level)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        data.member_number,
        data.email,
        data.name,
        data.country || null,
        data.status,
        data.security_level,
      ]
    );
    return result.rows[0];
  }

  /**
   * Update member
   */
  async update(
    id: string,
    data: Partial<{
      email: string;
      name: string;
      country: string;
      status: MemberStatus;
      security_level: SecurityLevel;
    }>
  ): Promise<Member | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (data.email !== undefined) {
      fields.push(`email = $${paramIndex++}`);
      values.push(data.email);
    }
    if (data.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(data.name);
    }
    if (data.country !== undefined) {
      fields.push(`country = $${paramIndex++}`);
      values.push(data.country);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramIndex++}`);
      values.push(data.status);
    }
    if (data.security_level !== undefined) {
      fields.push(`security_level = $${paramIndex++}`);
      values.push(data.security_level);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const result = await query<Member>(
      `UPDATE members SET ${fields.join(', ')} WHERE id = $${paramIndex} AND deleted_at IS NULL RETURNING *`,
      values
    );

    return result.rows[0] || null;
  }

  /**
   * Soft delete member
   */
  async softDelete(id: string): Promise<boolean> {
    const result = await query(
      'UPDATE members SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL',
      [id]
    );
    return result.rowCount !== null && result.rowCount > 0;
  }

  /**
   * Count members by status
   */
  async countByStatus(status: MemberStatus): Promise<number> {
    const result = await query<{ count: string }>(
      'SELECT COUNT(*) as count FROM members WHERE status = $1 AND deleted_at IS NULL',
      [status]
    );
    return parseInt(result.rows[0].count, 10);
  }

  /**
   * Count members by security level
   */
  async countBySecurityLevel(securityLevel: SecurityLevel): Promise<number> {
    const result = await query<{ count: string }>(
      'SELECT COUNT(*) as count FROM members WHERE security_level = $1 AND deleted_at IS NULL',
      [securityLevel]
    );
    return parseInt(result.rows[0].count, 10);
  }
}
