import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Festival from '@/models/Festival';
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
    const updatedFestival = await Festival.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!updatedFestival) {
      return NextResponse.json({ error: 'Festival not found' }, { status: 404 });
    }

    return NextResponse.json(updatedFestival);
  } catch (error: any) {
    console.error('Festivals PUT error:', error?.message || error);
    return NextResponse.json({ error: 'Failed to update festival' }, { status: 500 });
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
    const deletedFestival = await Festival.findByIdAndDelete(params.id);
    
    if (!deletedFestival) {
      return NextResponse.json({ error: 'Festival not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Festival deleted successfully' });
  } catch (error: any) {
    console.error('Festivals DELETE error:', error?.message || error);
    return NextResponse.json({ error: 'Failed to delete festival' }, { status: 500 });
  }
}
