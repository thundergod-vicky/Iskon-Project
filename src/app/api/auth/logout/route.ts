import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { message: 'Logged out successfully' },
    { status: 200 }
  );

  // Clear authentication cookies
  response.cookies.set('iskcon_admin_token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  response.cookies.set('csrf', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}
