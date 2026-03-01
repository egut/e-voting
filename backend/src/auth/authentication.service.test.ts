/**
 * Authentication Service Unit Tests
 */

import { AuthenticationService } from './authentication.service';
import { AuthMethod, SecurityLevel, MemberStatus } from '../db/models/types';
import { MemberRegisterType } from './types';

// Create manual mocks
const mockSessionRepo = {
  create: jest.fn(),
  findByToken: jest.fn(),
  revoke: jest.fn(),
};

const mockMemberRepo = {
  findById: jest.fn(),
  findByEmail: jest.fn(),
};

const mockCryptoEngine = {
  generateBlindToken: jest.fn(),
};

const mockRateLimiter = {
  isRateLimited: jest.fn(),
  recordAttempt: jest.fn(),
};

describe('AuthenticationService', () => {
  let authService: AuthenticationService;

  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthenticationService(
      mockSessionRepo as any,
      mockMemberRepo as any,
      mockCryptoEngine as any,
      mockRateLimiter as any,
      MemberRegisterType.API
    );
  });

  describe('determineSecurityLevel', () => {
    it('should assign VERY_HIGH for Freja eID+ with API', () => {
      const level = authService.determineSecurityLevel(
        AuthMethod.FREJA_EID,
        MemberRegisterType.API,
        false
      );
      expect(level).toBe(SecurityLevel.VERY_HIGH);
    });

    it('should assign HIGH for SSO with MFA and LDAP', () => {
      const level = authService.determineSecurityLevel(
        AuthMethod.SSO,
        MemberRegisterType.LDAP,
        true
      );
      expect(level).toBe(SecurityLevel.HIGH);
    });

    it('should assign MANUAL for Password without MFA', () => {
      const level = authService.determineSecurityLevel(
        AuthMethod.PASSWORD,
        MemberRegisterType.CSV,
        false
      );
      expect(level).toBe(SecurityLevel.MANUAL);
    });
  });

  describe('verifyMemberStatus', () => {
    it('should return active status for active member', async () => {
      mockMemberRepo.findById.mockResolvedValue({
        id: 'member-1',
        member_number: 'M001',
        email: 'test@example.com',
        name: 'Test Member',
        status: MemberStatus.ACTIVE,
      });

      const result = await authService.verifyMemberStatus('member-1');
      expect(result.isActive).toBe(true);
    });
  });
});
