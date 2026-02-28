import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Event from '@/models/Event';

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find({}).sort({ date: 1 }); // Sort chronologically
    return NextResponse.json(events);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const newEvent = await Event.create(body);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create event:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create event' }, 
      { status: 400 }
    );
  }
}
