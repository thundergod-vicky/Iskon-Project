import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '@/models/User';
import logger from '@/utils/logger';
import { twoFactorAuth } from '@/utils/twoFactorAuth';
import { ipBlocker } from '@/middleware/ipBlock';
import Tokens from 'csrf';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const CSRF_SECRET = process.env.CSRF_SECRET || 'your-csrf-secret-key';

const tokens = new Tokens();

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

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      const uri = process.env.MONGODB_URI;
      if (!uri) throw new Error('MONGODB_URI not defined');
      await mongoose.connect(uri);
    }

    // Find user in database (allow login by email or fullName/username)
    const user = await User.findOne({ 
      $or: [{ email: username }, { fullName: username }] 
    }).select('+password');

    if (!user) {
      logger.warn('Login attempt for non-existent user:', { username, ip: clientIp });
      return new NextResponse(
        JSON.stringify({ message: 'Invalid credentials' }),
        { status: 401 }
      );
    }

    // Verify credentials
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      ipBlocker.recordSuspiciousActivity(clientIp);
      logger.warn('Failed login attempt:', { username, ip: clientIp });
      return new NextResponse(
        JSON.stringify({ message: 'Invalid credentials' }),
        { status: 401 }
      );
    }

    // 2FA logic (only if enabled on user or global admin)
    // For now, keeping it simple as per User model, but can be expanded
    const isAdmin = user.role === 'admin';
    if (isAdmin && process.env.ENABLE_ADMIN_2FA === 'true') {
      if (!totpToken) {
        return new NextResponse(
          JSON.stringify({ message: '2FA token required', require2FA: true }),
          { status: 428 }
        );
      }

      if (!twoFactorAuth.verifyToken(user._id.toString(), totpToken)) {
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
        sub: user._id.toString(),
        username: user.fullName,
        role: user.role
      },
      JWT_SECRET,
      { 
        expiresIn: '1d',
        algorithm: 'HS256'
      }
    );

    // Create secure response
    const response = NextResponse.json({
      user: { id: user._id.toString(), username: user.fullName, role: user.role },
      token,
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

  } catch (error: any) {
    logger.error('Login error:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Internal server error', error: error.message }),
      { status: 500 }
    );
  }
}
