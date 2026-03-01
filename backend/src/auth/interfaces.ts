/**
 * Authentication Module Interfaces
 *
 * Core interfaces for authentication, session management, and member verification.
 *
 * Requirements: 5.1-5.7, 6.1-6.7, 24.1-24.9, 25.1-25.8
 */

import {
  AuthResult,
  Session,
  SessionOptions,
  MemberStatusInfo,
  MagicLinkToken,
  MemberData,
  MemberImportResult,
  MemberRegisterConfig,
  FrejaAuthRequest,
  FrejaAuthResponse,
  SSOProviderConfig,
  SSOToken,
  QRCodeData,
  PasswordAuthRequest,
} from './types';
import { AuthMethod, SecurityLevel } from '../db/models/types';

/**
 * Main authentication service interface
 *
 * Handles all authentication methods and session management.
 */
export interface IAuthenticationService {
  /**
   * Authenticate with Freja eID+
   *
   * Requirement 5.1: Support Freja eID+ authentication with Swedish personal number verification
   * Requirement 5.6: Automatically verify Member status against the member register
   * Requirement 25.2: Assign "Very High" security level for API integration
   *
   * @param request - Freja eID+ authentication request
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @returns Promise resolving to AuthResult
   */
  authenticateFrejaEID(
    request: FrejaAuthRequest,
    ipAddress?: string,
    userAgent?: string
  ): Promise<AuthResult>;

  /**
   * Authenticate with Magic Link
   *
   * Requirement 5.3: Support passwordless Magic Link authentication via email
   * Requirement 25.4: Assign security level based on member register integration
   *
   * @param token - Magic link token
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @returns Promise resolving to AuthResult
   */
  authenticateMagicLink(token: string, ipAddress?: string, userAgent?: string): Promise<AuthResult>;

  /**
   * Generate and send a magic link
   *
   * @param email - Member email address
   * @returns Promise resolving to true if link was sent
   */
  generateMagicLink(email: string): Promise<boolean>;

  /**
   * Authenticate with SSO
   *
   * Requirement 5.2: Support SSO via Active Directory, Entra ID, or Google Workspace
   * Requirement 25.3: Assign "High" security level for SSO with MFA
   *
   * @param provider - SSO provider configuration
   * @param token - SSO token
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @returns Promise resolving to AuthResult
   */
  authenticateSSO(
    provider: SSOProviderConfig,
    token: SSOToken,
    ipAddress?: string,
    userAgent?: string
  ): Promise<AuthResult>;

  /**
   * Authenticate with QR code
   *
   * Requirement 5.4: Support QR code authentication for on-site verification
   * Requirement 25.5: Assign "Low" security level for QR with manual addition
   *
   * @param code - QR code value
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @returns Promise resolving to AuthResult
   */
  authenticateQRCode(code: string, ipAddress?: string, userAgent?: string): Promise<AuthResult>;

  /**
   * Authenticate with username/password
   *
   * Requirement 5.5: Support username/password with optional MFA (TOTP or SMS)
   * Requirement 25.6: Assign "Manual" security level for password without MFA
   *
   * @param request - Password authentication request
   * @param ipAddress - Client IP address
   * @param userAgent - Client user agent
   * @returns Promise resolving to AuthResult
   */
  authenticatePassword(
    request: PasswordAuthRequest,
    ipAddress?: string,
    userAgent?: string
  ): Promise<AuthResult>;

  /**
   * Verify member status is active
   *
   * Requirement 6.5: Verify Member status is active before allowing authentication
   *
   * @param memberId - Member identifier
   * @returns Promise resolving to MemberStatusInfo
   */
  verifyMemberStatus(memberId: string): Promise<MemberStatusInfo>;

  /**
   * Create a new session
   *
   * Requirement 5.1: Implement session creation with security level assignment
   *
   * @param options - Session creation options
   * @returns Promise resolving to Session
   */
  createSession(options: SessionOptions): Promise<Session>;

  /**
   * Validate an existing session
   *
   * @param sessionToken - Session token to validate
   * @returns Promise resolving to Session or null if invalid
   */
  validateSession(sessionToken: string): Promise<Session | null>;

  /**
   * Revoke a session (logout)
   *
   * @param sessionToken - Session token to revoke
   * @returns Promise resolving to true if revoked
   */
  revokeSession(sessionToken: string): Promise<boolean>;

  /**
   * Determine security level based on auth method and member register integration
   *
   * Requirements: 25.1-25.6
   *
   * @param authMethod - Authentication method used
   * @param memberRegisterType - Type of member register integration
   * @param hasMFA - Whether MFA was used
   * @returns SecurityLevel
   */
  determineSecurityLevel(
    authMethod: AuthMethod,
    memberRegisterType: string,
    hasMFA: boolean
  ): SecurityLevel;
}

/**
 * Member register integration interface
 *
 * Handles integration with external member registers (CSV, API, LDAP).
 */
export interface IMemberRegisterService {
  /**
   * Import members from CSV file
   *
   * Requirement 6.1: Support CSV file upload for member data import
   * Requirement 6.6: Validate imported member data for format correctness and duplicates
   *
   * @param csvData - CSV file content
   * @returns Promise resolving to MemberImportResult
   */
  importFromCSV(csvData: string): Promise<MemberImportResult>;

  /**
   * Verify member via REST API
   *
   * Requirement 6.2: Support REST API integration with real-time member verification
   *
   * @param memberNumber - Member number to verify
   * @returns Promise resolving to MemberData or null
   */
  verifyViaAPI(memberNumber: string): Promise<MemberData | null>;

  /**
   * Verify member via LDAP/Active Directory
   *
   * Requirement 6.3: Support LDAP/Active Directory integration for directory services
   *
   * @param username - LDAP username
   * @returns Promise resolving to MemberData or null
   */
  verifyViaLDAP(username: string): Promise<MemberData | null>;

  /**
   * Validate member data format
   *
   * Requirement 6.6: Validate imported member data for format correctness and duplicates
   *
   * @param data - Member data to validate
   * @returns Array of validation errors (empty if valid)
   */
  validateMemberData(data: MemberData): string[];

  /**
   * Check for duplicate members
   *
   * Requirement 6.6: Validate imported member data for duplicates
   *
   * @param memberNumber - Member number to check
   * @param email - Email to check
   * @returns Promise resolving to true if duplicate exists
   */
  checkDuplicate(memberNumber: string, email: string): Promise<boolean>;
}

/**
 * Session repository interface
 *
 * Handles database operations for sessions.
 */
export interface ISessionRepository {
  /**
   * Create a new session in the database
   */
  create(session: Omit<Session, 'id'>): Promise<Session>;

  /**
   * Find session by token
   */
  findByToken(sessionToken: string): Promise<Session | null>;

  /**
   * Find active sessions for a member
   */
  findActiveSessions(memberId: string): Promise<Session[]>;

  /**
   * Revoke a session
   */
  revoke(sessionToken: string): Promise<boolean>;

  /**
   * Revoke all sessions for a member
   */
  revokeAllForMember(memberId: string): Promise<number>;

  /**
   * Clean up expired sessions
   */
  cleanupExpired(): Promise<number>;
}

/**
 * Rate limiter interface
 *
 * Prevents brute-force attacks on authentication.
 */
export interface IRateLimiter {
  /**
   * Check if an identifier is rate limited
   *
   * @param identifier - Email, member number, or IP address
   * @returns Promise resolving to true if rate limited
   */
  isRateLimited(identifier: string): Promise<boolean>;

  /**
   * Record an authentication attempt
   *
   * @param identifier - Email, member number, or IP address
   * @param success - Whether the attempt was successful
   * @param authMethod - Authentication method used
   */
  recordAttempt(identifier: string, success: boolean, authMethod: AuthMethod): Promise<void>;

  /**
   * Reset rate limit for an identifier
   *
   * @param identifier - Email, member number, or IP address
   */
  reset(identifier: string): Promise<void>;
}
