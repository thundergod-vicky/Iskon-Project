import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import logger from '@/utils/logger';

export class TwoFactorAuth {
  private static instance: TwoFactorAuth;
  private userSecrets: Map<string, string>;

  private constructor() {
    this.userSecrets = new Map();
  }

  static getInstance(): TwoFactorAuth {
    if (!TwoFactorAuth.instance) {
      TwoFactorAuth.instance = new TwoFactorAuth();
    }
    return TwoFactorAuth.instance;
  }

  async generateSecret(userId: string) {
    try {
      const secret = speakeasy.generateSecret({
        name: `ISKCON Admin (${userId})`,
        issuer: 'ISKCON Website'
      });

      this.userSecrets.set(userId, secret.base32);

      const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);

      return {
        secret: secret.base32,
        qrCode: qrCodeUrl
      };
    } catch (error) {
      logger.error('Error generating 2FA secret:', error);
      throw new Error('Failed to generate 2FA secret');
    }
  }

  verifyToken(userId: string, token: string): boolean {
    try {
      const secret = this.userSecrets.get(userId);
      if (!secret) {
        logger.error(`No 2FA secret found for user: ${userId}`);
        return false;
      }

      return speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token,
        window: 1 // Allow 30 seconds window
      });
    } catch (error) {
      logger.error('Error verifying 2FA token:', error);
      return false;
    }
  }

  removeSecret(userId: string) {
    this.userSecrets.delete(userId);
  }
}

export const twoFactorAuth = TwoFactorAuth.getInstance();
