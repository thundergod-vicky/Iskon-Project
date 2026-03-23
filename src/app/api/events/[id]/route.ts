import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Event from '@/models/Event';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get('cookie') || request.headers.get('Authorization') || '';
    if (!authHeader.includes('token') && !authHeader.includes('jwt') && !authHeader.includes('iskcon_admin_token')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const body = await request.json();
    const updatedEvent = await Event.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedEvent) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    return NextResponse.json(updatedEvent);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get('cookie') || request.headers.get('Authorization') || '';
    if (!authHeader.includes('token') && !authHeader.includes('jwt') && !authHeader.includes('iskcon_admin_token')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const deletedEvent = await Event.findByIdAndDelete(params.id);
    if (!deletedEvent) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
