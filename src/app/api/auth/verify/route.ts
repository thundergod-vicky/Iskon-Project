import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: Request) {
  try {
    // Get the token from cookies (Next.js handles this)
    let token = (request as any).cookies?.get('iskcon_admin_token')?.value;
    
    // Fallback to authorization header
    if (!token) {
      token = request.headers.get('authorization')?.split(' ')[1];
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
