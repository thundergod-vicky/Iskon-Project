import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import PrasadamBooking from '@/models/PrasadamBooking';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('cookie') || request.headers.get('Authorization') || '';
    if (!authHeader.includes('token') && !authHeader.includes('jwt') && !authHeader.includes('iskcon_admin_token')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const bookings = await PrasadamBooking.find().populate('items.prasadamItemId', 'name price image').sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const newBooking = await PrasadamBooking.create(body);
    return NextResponse.json(newBooking, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
