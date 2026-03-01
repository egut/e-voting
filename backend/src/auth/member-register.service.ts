/**
 * Member Register Service
 *
 * Handles integration with external member registers (CSV, API, LDAP).
 *
 * Requirements: 6.1-6.7
 */

import { IMemberRegisterService } from './interfaces';
import { MemberData, MemberImportResult, MemberRegisterConfig } from './types';
import { MemberRepository } from '../db/models/member.repository';
import { MemberStatus, SecurityLevel } from '../db/models/types';

export class MemberRegisterService implements IMemberRegisterService {
  constructor(
    private memberRepository: MemberRepository,
    private config: MemberRegisterConfig
  ) {}

  /**
   * Import members from CSV file
   *
   * Requirement 6.1: Support CSV file upload for member data import
   * Requirement 6.6: Validate imported member data for format correctness and duplicates
   */
  async importFromCSV(csvData: string): Promise<MemberImportResult> {
    const result: MemberImportResult = {
      success: true,
      imported: 0,
      failed: 0,
      errors: [],
    };

    try {
      // Parse CSV data (simple implementation, could use a CSV library)
      const lines = csvData.trim().split('\n');
      if (lines.length === 0) {
        result.success = false;
        return result;
      }

      // Skip header row
      const dataLines = lines.slice(1);

      for (const line of dataLines) {
        const fields = line.split(',').map((f) => f.trim());

        if (fields.length < 3) {
          result.failed++;
          result.errors.push({
            memberNumber: fields[0] || 'unknown',
            email: fields[1] || 'unknown',
            error: 'Invalid CSV format: insufficient fields',
          });
          continue;
        }

        const memberData: MemberData = {
          memberNumber: fields[0],
          email: fields[1],
          name: fields[2],
          country: fields[3] || undefined,
          status: (fields[4] as MemberStatus) || MemberStatus.ACTIVE,
        };

        // Validate member data
        const validationErrors = this.validateMemberData(memberData);
        if (validationErrors.length > 0) {
          result.failed++;
          result.errors.push({
            memberNumber: memberData.memberNumber,
            email: memberData.email,
            error: validationErrors.join(', '),
          });
          continue;
        }

        // Check for duplicates
        const isDuplicate = await this.checkDuplicate(memberData.memberNumber, memberData.email);
        if (isDuplicate) {
          result.failed++;
          result.errors.push({
            memberNumber: memberData.memberNumber,
            email: memberData.email,
            error: 'Duplicate member number or email',
          });
          continue;
        }

        // Import member
        try {
          await this.memberRepository.create({
            member_number: memberData.memberNumber,
            email: memberData.email,
            name: memberData.name,
            country: memberData.country || undefined,
            status: memberData.status,
            security_level: SecurityLevel.MANUAL, // Will be updated on authentication
          });
          result.imported++;
        } catch (error) {
          result.failed++;
          result.errors.push({
            memberNumber: memberData.memberNumber,
            email: memberData.email,
            error: `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          });
        }
      }

      result.success = result.failed === 0;
    } catch (error) {
      result.success = false;
      result.errors.push({
        memberNumber: 'N/A',
        email: 'N/A',
        error: `CSV parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }

    return result;
  }

  /**
   * Verify member via REST API
   *
   * Requirement 6.2: Support REST API integration with real-time member verification
   */
  async verifyViaAPI(memberNumber: string): Promise<MemberData | null> {
    if (!this.config.apiUrl || !this.config.apiKey) {
      throw new Error('API configuration not provided');
    }

    try {
      // TODO: Implement actual API integration
      // This is a placeholder that would call the member register API
      console.log(`Verifying member ${memberNumber} via API: ${this.config.apiUrl}`);

      // Mock response for testing
      return null;
    } catch (error) {
      console.error('API verification error:', error);
      return null;
    }
  }

  /**
   * Verify member via LDAP/Active Directory
   *
   * Requirement 6.3: Support LDAP/Active Directory integration for directory services
   */
  async verifyViaLDAP(username: string): Promise<MemberData | null> {
    if (!this.config.ldapUrl || !this.config.ldapBaseDn) {
      throw new Error('LDAP configuration not provided');
    }

    try {
      // TODO: Implement actual LDAP integration
      // This would use an LDAP library like ldapjs
      console.log(`Verifying member ${username} via LDAP: ${this.config.ldapUrl}`);

      // Mock response for testing
      return null;
    } catch (error) {
      console.error('LDAP verification error:', error);
      return null;
    }
  }

  /**
   * Validate member data format
   *
   * Requirement 6.6: Validate imported member data for format correctness
   */
  validateMemberData(data: MemberData): string[] {
    const errors: string[] = [];

    // Validate member number
    if (!data.memberNumber || data.memberNumber.trim().length === 0) {
      errors.push('Member number is required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }

    // Validate name
    if (!data.name || data.name.trim().length === 0) {
      errors.push('Name is required');
    }

    // Validate country code (if provided)
    if (data.country && data.country.length !== 2) {
      errors.push('Country code must be 2 characters (ISO 3166-1 alpha-2)');
    }

    // Validate status
    const validStatuses = Object.values(MemberStatus);
    if (!validStatuses.includes(data.status)) {
      errors.push(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    return errors;
  }

  /**
   * Check for duplicate members
   *
   * Requirement 6.6: Validate imported member data for duplicates
   */
  async checkDuplicate(memberNumber: string, email: string): Promise<boolean> {
    // Check if member number already exists
    const existingByNumber = await this.memberRepository.findByMemberNumber(memberNumber);
    if (existingByNumber) {
      return true;
    }

    // Check if email already exists
    const existingByEmail = await this.memberRepository.findByEmail(email);
    if (existingByEmail) {
      return true;
    }

    return false;
  }
}
