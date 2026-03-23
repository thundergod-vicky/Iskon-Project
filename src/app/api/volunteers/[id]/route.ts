import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Volunteer from '@/models/Volunteer';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const body = await req.json();
    const volunteer = await Volunteer.findByIdAndUpdate(params.id, body, { new: true });
    if (!volunteer) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(volunteer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const volunteer = await Volunteer.findByIdAndDelete(params.id);
    if (!volunteer) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
