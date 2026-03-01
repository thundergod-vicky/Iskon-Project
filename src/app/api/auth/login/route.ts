export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '@/models/User';
import logger from '@/utils/logger';
import { ipBlocker } from '@/middleware/ipBlock';
import Tokens from 'csrf';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const CSRF_SECRET = process.env.CSRF_SECRET || 'your-csrf-secret-key';

const tokens = new Tokens();

// Helper to ensure DB is connected
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';

    // Check if IP is blocked
    if (ipBlocker.isBlocked(clientIp)) {
      logger.warn(`Blocked IP attempted login: ${clientIp}`);
      return new NextResponse(
        JSON.stringify({ message: 'Access denied' }),
        { status: 403 }
      );
    }

    if (!username || !password) {
      return new NextResponse(
        JSON.stringify({ message: 'Username and password required' }),
        { status: 400 }
      );
    }

    let isAuthenticated = false;
    let authUser = null;

    // 1. Try MongoDB Database Login First (treat username input as email)
    try {
      await connectDB();
      const dbUser = await User.findOne({ email: username.toLowerCase() }).select('+password');
      
      if (dbUser) {
        const isMatch = await bcrypt.compare(password, dbUser.password);
        if (isMatch) {
          isAuthenticated = true;
          authUser = {
            id: dbUser._id.toString(),
            username: dbUser.email,
            role: dbUser.role
          };
        }
      }
    } catch (dbError) {
      logger.error('Database connection failed during login:', dbError);
    }

    // 2. Fallback to .env.local Super Admin Credentials
    // This reads env vars dynamically per request, fixing module caching bugs
    if (!isAuthenticated) {
      const superAdminUsername = process.env.ADMIN_USERNAME || 'admin';
      const superAdminPassword = process.env.ADMIN_PASSWORD || 'iskcon123';
      
      if (username === superAdminUsername && password === superAdminPassword) {
        isAuthenticated = true;
        authUser = {
          id: 'super-admin-env',
          username: superAdminUsername,
          role: 'admin'
        };
      }
    }

    if (isAuthenticated && authUser) {
      // Generate CSRF token
      const csrfSecret = tokens.create(CSRF_SECRET);
      
      // Create JWT token
      const token = sign(
        { 
          sub: authUser.id,
          username: authUser.username,
          role: authUser.role
        },
        JWT_SECRET,
        { 
          expiresIn: '1d',
          algorithm: 'HS256'
        }
      );

      // Create secure response
      const response = NextResponse.json({
        user: authUser,
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
