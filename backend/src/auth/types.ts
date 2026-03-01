/**
 * Authentication Module Types
 *
 * Types and interfaces for authentication, session management, and member verification.
 *
 * Requirements: 5.1-5.7, 6.1-6.7, 25.1-25.8
 */

import { AuthMethod, SecurityLevel, MemberStatus } from '../db/models/types';

/**
 * Result of an authentication attempt
 */
export interface AuthResult {
  success: boolean;
  memberId?: string;
  sessionToken?: string;
  securityLevel: SecurityLevel;
  error?: string;
  errorCode?: string;
}

/**
 * Session information
 */
export interface Session {
  id: string;
  memberId: string;
  sessionToken: string;
  authMethod: AuthMethod;
  securityLevel: SecurityLevel;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
}

/**
 * Member status information
 */
export interface MemberStatusInfo {
  memberId: string;
  status: MemberStatus;
  isActive: boolean;
  memberNumber: string;
  email: string;
  name: string;
}

/**
 * Magic link token data
 */
export interface MagicLinkToken {
  token: string;
  memberId: string;
  email: string;
  expiresAt: Date;
  used: boolean;
}

/**
 * Member data for import/verification
 */
export interface MemberData {
  memberNumber: string;
  email: string;
  name: string;
  country?: string;
  status: MemberStatus;
}

/**
 * Member register integration type
 */
export enum MemberRegisterType {
  CSV = 'csv',
  API = 'api',
  LDAP = 'ldap',
  HYBRID = 'hybrid',
}

/**
 * Member register integration configuration
 */
export interface MemberRegisterConfig {
  type: MemberRegisterType;
  apiUrl?: string;
  apiKey?: string;
  ldapUrl?: string;
  ldapBaseDn?: string;
  ldapBindDn?: string;
  ldapBindPassword?: string;
}

/**
 * Member import result
 */
export interface MemberImportResult {
  success: boolean;
  imported: number;
  failed: number;
  errors: Array<{
    memberNumber: string;
    email: string;
    error: string;
  }>;
}

/**
 * Security level determination based on auth method and member register integration
 *
 * Requirements: 25.1-25.6
 */
export interface SecurityLevelMapping {
  authMethod: AuthMethod;
  memberRegisterType: MemberRegisterType;
  hasMFA: boolean;
  securityLevel: SecurityLevel;
}

/**
 * Session creation options
 */
export interface SessionOptions {
  memberId: string;
  authMethod: AuthMethod;
  securityLevel: SecurityLevel;
  ipAddress?: string;
  userAgent?: string;
  expirationMinutes?: number; // Default: 480 (8 hours)
}

/**
 * Freja eID+ authentication request
 */
export interface FrejaAuthRequest {
  personalNumber: string; // Swedish personal number (personnummer)
  userInfo?: {
    name?: string;
    email?: string;
  };
}

/**
 * Freja eID+ authentication response
 */
export interface FrejaAuthResponse {
  success: boolean;
  personalNumber?: string;
  name?: string;
  email?: string;
  error?: string;
}

/**
 * SSO provider configuration
 */
export interface SSOProviderConfig {
  provider: 'active_directory' | 'entra_id' | 'google_workspace';
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  domain?: string;
  hasMFA: boolean;
}

/**
 * SSO authentication token
 */
export interface SSOToken {
  accessToken: string;
  idToken?: string;
  refreshToken?: string;
  expiresIn: number;
}

/**
 * QR code authentication data
 */
export interface QRCodeData {
  code: string;
  memberId: string;
  expiresAt: Date;
  used: boolean;
}

/**
 * Password authentication with optional MFA
 */
export interface PasswordAuthRequest {
  username: string;
  password: string;
  mfaCode?: string; // TOTP code or SMS code
}

/**
 * Rate limiting configuration
 */
export interface RateLimitConfig {
  maxAttempts: number;
  windowMinutes: number;
  blockDurationMinutes: number;
}

/**
 * Authentication attempt tracking
 */
export interface AuthAttempt {
  identifier: string; // Email, member number, or IP address
  timestamp: Date;
  success: boolean;
  authMethod: AuthMethod;
}
