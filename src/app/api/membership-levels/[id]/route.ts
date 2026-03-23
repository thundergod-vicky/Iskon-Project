import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import MembershipLevel from '@/models/MembershipLevel';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const body = await req.json();
    const level = await MembershipLevel.findByIdAndUpdate(params.id, body, { new: true });
    if (!level) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(level);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const level = await MembershipLevel.findByIdAndDelete(params.id);
    if (!level) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
