import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Audio from '@/models/Audio';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

async function isAdmin(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return false;
  
  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map(c => {
      const parts = c.split('=');
      return [parts[0], parts.slice(1).join('=')];
    })
  );
  
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
    const audios = await Audio.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json(audios);
  } catch (error: any) {
    console.error('Audios GET error:', error?.message || error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!await isAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const newAudio = await Audio.create(body);
    return NextResponse.json(newAudio, { status: 201 });
  } catch (error: any) {
    console.error('Audios POST error:', error?.message || error);
    return NextResponse.json({ error: 'Failed to create audio' }, { status: 500 });
  }
}
