export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: Request) {
  try {
    // Get the token securely using Next.js 14 headers API
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('iskcon_admin_token');
    let token = tokenCookie?.value;
    
    // Fallback to authorization header
    if (!token) {
      const authHeader = request.headers.get('authorization');
      token = authHeader?.split(' ')[1];
    }

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: 'No token provided' }),
        { status: 401 }
      );
    }
    
    // Verify the token
    const decoded = verify(token, JWT_SECRET);
    
    return NextResponse.json(decoded);
  } catch (error) {
    console.error('Token verification error:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Invalid token' }),
      { status: 401 }
    );
  }
}
