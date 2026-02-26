import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import logger from '@/utils/logger';
import { twoFactorAuth } from '@/utils/twoFactorAuth';
import { ipBlocker } from '@/middleware/ipBlock';
import Tokens from 'csrf';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const CSRF_SECRET = process.env.CSRF_SECRET || 'your-csrf-secret-key';

// In production, these would be stored in a database with hashed passwords
const ADMIN_CREDENTIALS = {
  id: '1',
  username: process.env.ADMIN_USERNAME || 'admin',
  // This is the hashed version of the default password
  hashedPassword: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'iskcon123', 10),
  twoFactorEnabled: false
};

const tokens = new Tokens();

// Validation rules
const loginValidation = [
  check('username').trim().notEmpty().withMessage('Username is required'),
  check('password').trim().notEmpty().withMessage('Password is required'),
  check('totpToken').optional().isLength({ min: 6, max: 6 }).withMessage('Invalid 2FA token')
];

export async function POST(request: Request) {
  try {
    const { username, password, totpToken } = await request.json();
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';

    // Check if IP is blocked
    if (ipBlocker.isBlocked(clientIp)) {
      logger.warn(`Blocked IP attempted login: ${clientIp}`);
      return new NextResponse(
        JSON.stringify({ message: 'Access denied' }),
        { status: 403 }
      );
    }

    // Validate input
    await Promise.all(loginValidation.map(validation => validation.run({ body: { username, password, totpToken } } as any)));
    const errors = validationResult({ body: { username, password, totpToken } } as any);
    
    if (!errors.isEmpty()) {
      logger.warn('Login validation failed:', { ip: clientIp, errors: errors.array() });
      return new NextResponse(
        JSON.stringify({ errors: errors.array() }),
        { status: 400 }
      );
    }

    // Verify credentials
    const isPasswordMatch = await bcrypt.compare(password, ADMIN_CREDENTIALS.hashedPassword);

    if (username === ADMIN_CREDENTIALS.username && isPasswordMatch) {
      
      // Check 2FA if enabled
      if (ADMIN_CREDENTIALS.twoFactorEnabled) {
        if (!totpToken) {
          return new NextResponse(
            JSON.stringify({ message: '2FA token required', require2FA: true }),
            { status: 428 }
          );
        }

        if (!twoFactorAuth.verifyToken(ADMIN_CREDENTIALS.id, totpToken)) {
          ipBlocker.recordSuspiciousActivity(clientIp);
          logger.warn('Invalid 2FA token attempt:', { username, ip: clientIp });
          return new NextResponse(
            JSON.stringify({ message: 'Invalid 2FA token' }),
            { status: 401 }
          );
        }
      }

      // Generate CSRF token
      const csrfSecret = tokens.create(CSRF_SECRET);
      
      // Create JWT token
      const token = sign(
        { 
          sub: ADMIN_CREDENTIALS.id,
          username,
          role: 'admin'
        },
        JWT_SECRET,
        { 
          expiresIn: '1d',
          algorithm: 'HS256'
        }
      );

      // Create secure response
      const response = NextResponse.json({
        user: { id: ADMIN_CREDENTIALS.id, username, role: 'admin' },
        csrfToken: csrfSecret,
        message: 'Login successful'
      });

      // Set secure cookies
      response.cookies.set('iskcon_admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400,
        path: '/'
      });

      response.cookies.set('csrf', csrfSecret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      });

      logger.info('Successful login:', { username, ip: clientIp });
      return response;
    }

    // Record failed attempt
    ipBlocker.recordSuspiciousActivity(clientIp);
    logger.warn('Failed login attempt:', { username, ip: clientIp });
    
    return new NextResponse(
      JSON.stringify({ message: 'Invalid credentials' }),
      { status: 401 }
    );
  } catch (error) {
    logger.error('Login error:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
}
