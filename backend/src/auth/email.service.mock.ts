/**
 * Mock Email Service
 *
 * This is a placeholder implementation for email sending.
 * In production, this would integrate with an actual email service.
 *
 * Requirements: 5.3
 *
 * TODO: Replace with actual email service integration
 * - Options: SendGrid, AWS SES, Mailgun, Postmark
 * - Implement proper error handling and retry logic
 * - Add email templates
 * - Add rate limiting
 */

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export class EmailServiceMock {
  /**
   * Send an email
   *
   * In production, this would:
   * 1. Connect to email service API
   * 2. Send email with proper formatting
   * 3. Handle delivery failures
   * 4. Track email status
   */
  async sendEmail(options: EmailOptions): Promise<boolean> {
    // TODO: Implement actual email service integration
    // For now, just log the email for testing
    console.log('=== Mock Email ===');
    console.log(`To: ${options.to}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Body: ${options.text}`);
    console.log('==================');

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return true;
  }

  /**
   * Send magic link email
   */
  async sendMagicLink(email: string, token: string, baseUrl: string): Promise<boolean> {
    const magicLink = `${baseUrl}/auth/magic-link/${token}`;

    return this.sendEmail({
      to: email,
      subject: 'Your login link for Digital Voting System',
      text: `Click this link to log in: ${magicLink}\n\nThis link will expire in 15 minutes.`,
      html: `
        <h2>Login to Digital Voting System</h2>
        <p>Click the link below to log in:</p>
        <p><a href="${magicLink}">${magicLink}</a></p>
        <p>This link will expire in 15 minutes.</p>
        <p>If you didn't request this link, you can safely ignore this email.</p>
      `,
    });
  }
}
