/**
 * Authentication Module
 *
 * Exports all authentication-related components.
 *
 * Requirements: 5.1-5.7, 6.1-6.7, 24.1-24.9, 25.1-25.8
 */

// Types
export * from './types';

// Interfaces
export * from './interfaces';

// Implementations
export { AuthenticationService } from './authentication.service';
export { SessionRepository } from './session.repository';
export { RateLimiter } from './rate-limiter';
