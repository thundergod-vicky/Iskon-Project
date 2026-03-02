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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!await isAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const updatedAudio = await Audio.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!updatedAudio) {
      return NextResponse.json({ error: 'Audio not found' }, { status: 404 });
    }

    return NextResponse.json(updatedAudio);
  } catch (error: any) {
    console.error('Audios PUT error:', error?.message || error);
    return NextResponse.json({ error: 'Failed to update audio' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!await isAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const deletedAudio = await Audio.findByIdAndDelete(params.id);
    
    if (!deletedAudio) {
      return NextResponse.json({ error: 'Audio not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Audio deleted successfully' });
  } catch (error: any) {
    console.error('Audios DELETE error:', error?.message || error);
    return NextResponse.json({ error: 'Failed to delete audio' }, { status: 500 });
  }
}
