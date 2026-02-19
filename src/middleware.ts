import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Exclude the login page from protection
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    try {
      const token = request.cookies.get('iskcon_admin_token')?.value;

      if (!token) {
        console.warn('No token provided for admin route access');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      try {
        // Verify the JWT token using 'jose' which works in Edge Runtime
        const { payload } = await jwtVerify(token, JWT_SECRET);

        // Add user info to request headers for downstream use
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-id', payload.sub as string);
        requestHeaders.set('x-user-role', payload.role as string);

        // Return response with modified headers
        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      } catch (error) {
        console.error('Token verification failed:', error);
        // If token is invalid, redirect to login
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
