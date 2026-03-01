/**
 * Authentication Service
 *
 * Core authentication service implementing multiple authentication methods
 * and session management.
 *
 * Requirements: 5.1-5.7, 6.5, 25.1-25.8
 */

import crypto from 'crypto';
import { IAuthenticationService, ISessionRepository, IRateLimiter } from './interfaces';
import {
  AuthResult,
  Session,
  SessionOptions,
  MemberStatusInfo,
  FrejaAuthRequest,
  SSOProviderConfig,
  SSOToken,
  PasswordAuthRequest,
  MemberRegisterType,
  MagicLinkToken,
} from './types';
import { AuthMethod, SecurityLevel, MemberStatus } from '../db/models/types';
import { MemberRepository } from '../db/models/member.repository';
import { ICryptoEngine } from '../crypto/interfaces';
import { FrejaEIDMock } from './freja-eid.mock';
import { IMagicLinkRepository } from './magic-link.repository';
import { EmailServiceMock } from './email.service.mock';
export class AuthenticationService implements IAuthenticationService {
  private frejaEIDMock: FrejaEIDMock;
  private emailService: EmailServiceMock;

  constructor(
    private sessionRepository: ISessionRepository,
    private memberRepository: MemberRepository,
    private cryptoEngine: ICryptoEngine,
    private rateLimiter: IRateLimiter,
    private magicLinkRepository: IMagicLinkRepository,
    private memberRegisterType: MemberRegisterType = MemberRegisterType.CSV,
    private baseUrl: string = 'http://localhost:3000'
  ) {
    this.frejaEIDMock = new FrejaEIDMock();
    this.emailService = new EmailServiceMock();
  }

  /**
   * Authenticate with Freja eID+
   *
   * Requirements: 5.1, 5.6, 25.2
   */
  async authenticateFrejaEID(
    request: FrejaAuthRequest,
    ipAddress?: string,
    userAgent?: string
  ): Promise<AuthResult> {
    try {
      // Check rate limiting
      if (await this.rateLimiter.isRateLimited(request.personalNumber)) {
        await this.rateLimiter.recordAttempt(request.personalNumber, false, AuthMethod.FREJA_EID);
        return {
          success: false,
          securityLevel: SecurityLevel.MANUAL,
          error: 'Too many authentication attempts. Please try again later.',
          errorCode: 'AUTH_RATE_LIMITED',
        };
      }

      // TODO: Integrate with actual Freja eID+ API
      // For now, this is a placeholder that would call the Freja eID+ service
      const frejaResponse = await this.callFrejaEIDAPI(request);

      if (!frejaResponse.success) {
        await this.rateLimiter.recordAttempt(request.personalNumber, false, AuthMethod.FREJA_EID);
        return {
          success: false,
          securityLevel: SecurityLevel.MANUAL,
          error: frejaResponse.error || 'Freja eID+ authentication failed',
          errorCode: 'AUTH_FREJA_FAILED',
        };
      }

      // Find member by email or personal number
      const member = await this.findMemberByFrejaData(frejaResponse);

      if (!member) {
        await this.rateLimiter.recordAttempt(request.personalNumber, false, AuthMethod.FREJA_EID);
        return {
          success: false,
          securityLevel: SecurityLevel.MANUAL,
          error: 'Member not found in register',
          errorCode: 'AUTH_MEMBER_NOT_FOUND',
        };
      }

      // Verify member status is active (Requirement 6.5)
      const statusInfo = await this.verifyMemberStatus(member.id);
      if (!statusInfo.isActive) {
        await this.rateLimiter.recordAttempt(request.personalNumber, false, AuthMethod.FREJA_EID);
        return {
          success: false,
          securityLevel: SecurityLevel.MANUAL,
          error: 'Member account is not active',
          errorCode: 'AUTH_MEMBER_INACTIVE',
        };
      }

      // Determine security level (Requirement 25.2: Very High for Freja eID+ with API)
      const securityLevel = this.determineSecurityLevel(
        AuthMethod.FREJA_EID,
        this.memberRegisterType,
        false
      );

      // Create session
      const session = await this.createSession({
        memberId: member.id,
        authMethod: AuthMethod.FREJA_EID,
        securityLevel,
        ipAddress,
        userAgent,
      });

      await this.rateLimiter.recordAttempt(request.personalNumber, true, AuthMethod.FREJA_EID);

      return {
        success: true,
        memberId: member.id,
        sessionToken: session.sessionToken,
        securityLevel,
      };
    } catch (error) {
      console.error('Freja eID+ authentication error:', error);
      return {
        success: false,
        securityLevel: SecurityLevel.MANUAL,
        error: 'Internal authentication error',
        errorCode: 'AUTH_INTERNAL_ERROR',
      };
    }
  }

  /**
   * Authenticate with Magic Link
   *
   * Requirements: 5.3, 25.4
   */
  async authenticateMagicLink(
    token: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<AuthResult> {
    try {
      // Verify magic link token
      const tokenData = await this.verifyMagicLinkToken(token);

      if (!tokenData) {
        return {
          success: false,
          securityLevel: SecurityLevel.MANUAL,
          error: 'Invalid or expired magic link',
          errorCode: 'AUTH_INVALID_TOKEN',
        };
      }

      // Verify member status is active
      const statusInfo = await this.verifyMemberStatus(tokenData.memberId);
      if (!statusInfo.isActive) {
        return {
          success: false,
          securityLevel: SecurityLevel.MANUAL,
          error: 'Member account is not active',
          errorCode: 'AUTH_MEMBER_INACTIVE',
        };
      }

      // Determine security level (Requirement 25.4: based on member register integration)
      const securityLevel = this.determineSecurityLevel(
        AuthMethod.MAGIC_LINK,
        this.memberRegisterType,
        false
      );

      // Create session
      const session = await this.createSession({
        memberId: tokenData.memberId,
        authMethod: AuthMethod.MAGIC_LINK,
        securityLevel,
        ipAddress,
        userAgent,
      });

      // Mark token as used
      await this.markMagicLinkTokenUsed(token);

      return {
        success: true,
        memberId: tokenData.memberId,
        sessionToken: session.sessionToken,
        securityLevel,
      };
    } catch (error) {
      console.error('Magic link authentication error:', error);
      return {
        success: false,
        securityLevel: SecurityLevel.MANUAL,
        error: 'Internal authentication error',
        errorCode: 'AUTH_INTERNAL_ERROR',
      };
    }
  }

  /**
   * Generate and send a magic link
   *
   * Requirement 5.3
   */
  async generateMagicLink(email: string): Promise<boolean> {
    try {
      // Find member by email
      const member = await this.memberRepository.findByEmail(email);

      if (!member) {
        // Don't reveal if email exists or not (security)
        return true;
      }

      // Verify member is active
      if (member.status !== MemberStatus.ACTIVE) {
        return true; // Don't reveal status
      }

      // Generate secure token
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      // Store token in database
      await this.storeMagicLinkToken(token, member.id, email, expiresAt);

      // TODO: Send email with magic link
      // This would integrate with an email service
      await this.sendMagicLinkEmail(email, token);

      return true;
    } catch (error) {
      console.error('Magic link generation error:', error);
      return false;
    }
  }

  /**
   * Authenticate with SSO
   *
   * Requirements: 5.2, 25.3
   */
  async authenticateSSO(
    provider: SSOProviderConfig,
    token: SSOToken,
    ipAddress?: string,
    userAgent?: string
  ): Promise<AuthResult> {
    try {
      // TODO: Verify SSO token with provider
      // This would integrate with AD, Entra ID, or Google Workspace
      const ssoUser = await this.verifySSOToken(provider, token);

      if (!ssoUser) {
        return {
          success: false,
          securityLevel: SecurityLevel.MANUAL,
          error: 'SSO authentication failed',
          errorCode: 'AUTH_SSO_FAILED',
        };
      }

      // Find member by email
      const member = await this.memberRepository.findByEmail(ssoUser.email);

      if (!member) {
        return {
          success: false,
          securityLevel: SecurityLevel.MANUAL,
          error: 'Member not found in register',
          errorCode: 'AUTH_MEMBER_NOT_FOUND',
        };
      }

      // Verify member status is active
      const statusInfo = await this.verifyMemberStatus(member.id);
      if (!statusInfo.isActive) {
        return {
          success: false,
          securityLevel: SecurityLevel.MANUAL,
          error: 'Member account is not active',
          errorCode: 'AUTH_MEMBER_INACTIVE',
        };
      }

      // Determine security level (Requirement 25.3: High for SSO with MFA)
      const securityLevel = this.determineSecurityLevel(
        AuthMethod.SSO,
        this.memberRegisterType,
        provider.hasMFA
      );

      // Create session
      const session = await this.createSession({
        memberId: member.id,
        authMethod: AuthMethod.SSO,
        securityLevel,
        ipAddress,
        userAgent,
      });

      return {
        success: true,
        memberId: member.id,
        sessionToken: session.sessionToken,
        securityLevel,
      };
    } catch (error) {
      console.error('SSO authentication error:', error);
      return {
        success: false,
        securityLevel: SecurityLevel.MANUAL,
        error: 'Internal authentication error',
        errorCode: 'AUTH_INTERNAL_ERROR',
      };
    }
  }

  /**
   * Authenticate with QR code
   *
   * Requirements: 5.4, 25.5
   */
  async authenticateQRCode(
    code: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<AuthResult> {
    try {
      // Verify QR code
      const qrData = await this.verifyQRCode(code);

      if (!qrData) {
        return {
          success: false,
          securityLevel: SecurityLevel.MANUAL,
          error: 'Invalid or expired QR code',
          errorCode: 'AUTH_INVALID_QR',
        };
      }

      // Verify member status is active
      const statusInfo = await this.verifyMemberStatus(qrData.memberId);
      if (!statusInfo.isActive) {
        return {
          success: false,
          securityLevel: SecurityLevel.MANUAL,
          error: 'Member account is not active',
          errorCode: 'AUTH_MEMBER_INACTIVE',
        };
      }

      // Determine security level (Requirement 25.5: Low for QR with manual addition)
      const securityLevel = this.determineSecurityLevel(
        AuthMethod.QR_CODE,
        this.memberRegisterType,
        false
      );

      // Create session
      const session = await this.createSession({
        memberId: qrData.memberId,
        authMethod: AuthMethod.QR_CODE,
        securityLevel,
        ipAddress,
        userAgent,
      });

      // Mark QR code as used
      await this.markQRCodeUsed(code);

      return {
        success: true,
        memberId: qrData.memberId,
        sessionToken: session.sessionToken,
        securityLevel,
      };
    } catch (error) {
      console.error('QR code authentication error:', error);
      return {
        success: false,
        securityLevel: SecurityLevel.MANUAL,
        error: 'Internal authentication error',
        errorCode: 'AUTH_INTERNAL_ERROR',
      };
    }
  }

  /**
   * Authenticate with username/password
   *
   * Requirements: 5.5, 25.6
   */
  async authenticatePassword(
    request: PasswordAuthRequest,
    ipAddress?: string,
    userAgent?: string
  ): Promise<AuthResult> {
    try {
      // Check rate limiting
      if (await this.rateLimiter.isRateLimited(request.username)) {
        await this.rateLimiter.recordAttempt(request.username, false, AuthMethod.PASSWORD);
        return {
          success: false,
          securityLevel: SecurityLevel.MANUAL,
          error: 'Too many authentication attempts. Please try again later.',
          errorCode: 'AUTH_RATE_LIMITED',
        };
      }

      // Find member by email or member number
      const member =
        (await this.memberRepository.findByEmail(request.username)) ||
        (await this.memberRepository.findByMemberNumber(request.username));

      if (!member) {
        await this.rateLimiter.recordAttempt(request.username, false, AuthMethod.PASSWORD);
        return {
          success: false,
          securityLevel: SecurityLevel.MANUAL,
          error: 'Invalid credentials',
          errorCode: 'AUTH_INVALID_CREDENTIALS',
        };
      }

      // Verify member status is active BEFORE checking password (Requirement 6.5)
      const statusInfo = await this.verifyMemberStatus(member.id);
      if (!statusInfo.isActive) {
        await this.rateLimiter.recordAttempt(request.username, false, AuthMethod.PASSWORD);
        return {
          success: false,
          securityLevel: SecurityLevel.MANUAL,
          error: 'Member account is not active',
          errorCode: 'AUTH_MEMBER_INACTIVE',
        };
      }

      // TODO: Verify password hash
      // This would use bcrypt or Argon2 to verify the password
      const passwordValid = await this.verifyPassword(member.id, request.password);

      if (!passwordValid) {
        await this.rateLimiter.recordAttempt(request.username, false, AuthMethod.PASSWORD);
        return {
          success: false,
          securityLevel: SecurityLevel.MANUAL,
          error: 'Invalid credentials',
          errorCode: 'AUTH_INVALID_CREDENTIALS',
        };
      }

      // Verify MFA if provided
      const hasMFA = !!request.mfaCode;
      if (hasMFA) {
        const mfaValid = await this.verifyMFA(member.id, request.mfaCode!);
        if (!mfaValid) {
          await this.rateLimiter.recordAttempt(request.username, false, AuthMethod.PASSWORD);
          return {
            success: false,
            securityLevel: SecurityLevel.MANUAL,
            error: 'Invalid MFA code',
            errorCode: 'AUTH_INVALID_MFA',
          };
        }
      }

      // Determine security level (Requirement 25.6: Manual for password without MFA)
      const securityLevel = this.determineSecurityLevel(
        AuthMethod.PASSWORD,
        this.memberRegisterType,
        hasMFA
      );

      // Create session
      const session = await this.createSession({
        memberId: member.id,
        authMethod: AuthMethod.PASSWORD,
        securityLevel,
        ipAddress,
        userAgent,
      });

      await this.rateLimiter.recordAttempt(request.username, true, AuthMethod.PASSWORD);

      return {
        success: true,
        memberId: member.id,
        sessionToken: session.sessionToken,
        securityLevel,
      };
    } catch (error) {
      console.error('Password authentication error:', error);
      return {
        success: false,
        securityLevel: SecurityLevel.MANUAL,
        error: 'Internal authentication error',
        errorCode: 'AUTH_INTERNAL_ERROR',
      };
    }
  }

  /**
   * Verify member status is active
   *
   * Requirement 6.5
   */
  async verifyMemberStatus(memberId: string): Promise<MemberStatusInfo> {
    const member = await this.memberRepository.findById(memberId);

    if (!member) {
      throw new Error('Member not found');
    }

    return {
      memberId: member.id,
      status: member.status,
      isActive: member.status === MemberStatus.ACTIVE,
      memberNumber: member.member_number,
      email: member.email,
      name: member.name,
    };
  }

  /**
   * Create a new session
   *
   * Requirement 5.1
   */
  async createSession(options: SessionOptions): Promise<Session> {
    // Generate secure session token
    const sessionToken = crypto.randomBytes(32).toString('hex');

    // Calculate expiration (default 8 hours)
    const expirationMinutes = options.expirationMinutes || 480;
    const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000);

    // Create session in database
    const session = await this.sessionRepository.create({
      memberId: options.memberId,
      sessionToken,
      authMethod: options.authMethod,
      securityLevel: options.securityLevel,
      ipAddress: options.ipAddress || null,
      userAgent: options.userAgent || null,
      createdAt: new Date(),
      expiresAt,
      revokedAt: null,
    });

    // Generate blind token for anonymous voting
    await this.cryptoEngine.generateBlindToken(options.memberId);

    return session;
  }

  /**
   * Validate an existing session
   */
  async validateSession(sessionToken: string): Promise<Session | null> {
    return this.sessionRepository.findByToken(sessionToken);
  }

  /**
   * Revoke a session (logout)
   */
  async revokeSession(sessionToken: string): Promise<boolean> {
    return this.sessionRepository.revoke(sessionToken);
  }

  /**
   * Determine security level based on auth method and member register integration
   *
   * Requirements: 25.1-25.6
   */
  public determineSecurityLevel(
    authMethod: AuthMethod,
    memberRegisterType: string,
    hasMFA: boolean
  ): SecurityLevel {
    // Requirement 25.2: Very High for Freja eID+ with API
    if (authMethod === AuthMethod.FREJA_EID && memberRegisterType === MemberRegisterType.API) {
      return SecurityLevel.VERY_HIGH;
    }

    // Requirement 25.3: High for SSO with MFA and Directory Services, or Freja eID+ with CSV
    if (
      (authMethod === AuthMethod.SSO && hasMFA && memberRegisterType === MemberRegisterType.LDAP) ||
      (authMethod === AuthMethod.FREJA_EID && memberRegisterType === MemberRegisterType.CSV)
    ) {
      return SecurityLevel.HIGH;
    }

    // Requirement 25.4: Medium for Magic Link with API, or Password with MFA and CSV
    if (
      (authMethod === AuthMethod.MAGIC_LINK && memberRegisterType === MemberRegisterType.API) ||
      (authMethod === AuthMethod.PASSWORD &&
        hasMFA &&
        memberRegisterType === MemberRegisterType.CSV)
    ) {
      return SecurityLevel.MEDIUM;
    }

    // Requirement 25.5: Low for QR code with manual addition, or Magic Link with CSV
    if (
      authMethod === AuthMethod.QR_CODE ||
      (authMethod === AuthMethod.MAGIC_LINK && memberRegisterType === MemberRegisterType.CSV)
    ) {
      return SecurityLevel.LOW;
    }

    // Requirement 25.6: Manual for Password without MFA
    if (authMethod === AuthMethod.PASSWORD && !hasMFA) {
      return SecurityLevel.MANUAL;
    }

    // Default to manual for unknown combinations
    return SecurityLevel.MANUAL;
  }

  // Private helper methods (placeholders for external integrations)

  private async callFrejaEIDAPI(request: FrejaAuthRequest): Promise<any> {
    // Use mock implementation for now
    // TODO: Replace with actual Freja eID+ API integration in production
    return await this.frejaEIDMock.authenticate(request);
  }

  private async findMemberByFrejaData(frejaResponse: any): Promise<any> {
    // Try to find member by email from Freja response
    if (frejaResponse.email) {
      return await this.memberRepository.findByEmail(frejaResponse.email);
    }
    // Could also search by personal number if stored in member data
    return null;
  }

  private async verifyMagicLinkToken(token: string): Promise<any> {
    const magicLink = await this.magicLinkRepository.findByToken(token);
    if (!magicLink) {
      return null;
    }
    return {
      memberId: magicLink.memberId,
      email: magicLink.email,
    };
  }

  private async storeMagicLinkToken(
    token: string,
    memberId: string,
    email: string,
    expiresAt: Date
  ): Promise<void> {
    const magicLink: MagicLinkToken = {
      token,
      memberId,
      email,
      expiresAt,
      used: false,
    };
    await this.magicLinkRepository.store(magicLink);
  }

  private async markMagicLinkTokenUsed(token: string): Promise<void> {
    await this.magicLinkRepository.markAsUsed(token);
  }

  private async sendMagicLinkEmail(email: string, token: string): Promise<void> {
    await this.emailService.sendMagicLink(email, token, this.baseUrl);
  }

  private async verifySSOToken(_provider: SSOProviderConfig, _token: SSOToken): Promise<any> {
    // TODO: Implement SSO token verification
    return null;
  }

  private async verifyQRCode(_code: string): Promise<any> {
    // TODO: Implement QR code verification
    return null;
  }

  private async markQRCodeUsed(_code: string): Promise<void> {
    // TODO: Mark QR code as used
  }

  private async verifyPassword(_memberId: string, _password: string): Promise<boolean> {
    // TODO: Implement password verification with bcrypt/Argon2
    return false;
  }

  private async verifyMFA(_memberId: string, _mfaCode: string): Promise<boolean> {
    // TODO: Implement MFA verification (TOTP or SMS)
    return false;
  }
}
