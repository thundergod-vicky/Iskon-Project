import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Volunteer from '@/models/Volunteer';

export async function GET() {
  await dbConnect();
  try {
    const volunteers = await Volunteer.find({}).sort({ createdAt: -1 });
    return NextResponse.json(volunteers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const volunteer = await Volunteer.create(body);
    return NextResponse.json(volunteer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}
