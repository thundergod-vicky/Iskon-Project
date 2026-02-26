import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Prasadam from '@/models/Prasadam';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

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
    const updatedItem = await Prasadam.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!updatedItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Prasadam PUT error:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
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
    const deletedItem = await Prasadam.findByIdAndDelete(params.id);
    
    if (!deletedItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Item deleted' });
  } catch (error) {
    console.error('Prasadam DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
