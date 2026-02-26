import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Prasadam from '@/models/Prasadam';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

// Helper to verify admin role
async function isAdmin(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return false;
  
  const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
  const token = cookies['iskcon_admin_token'];
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.role === 'admin';
  } catch (error) {
    return false;
  }
}

export async function GET() {
  try {
    await connectDB();
    const items = await Prasadam.find({ available: true }).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error: any) {
    console.error('Prasadam GET error:', error?.message || error);
    // Return empty array instead of 500 — frontend will use sample data
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    if (!await isAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const newItem = await Prasadam.create(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Prasadam POST error:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
