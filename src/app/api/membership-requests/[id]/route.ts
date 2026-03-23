import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import MembershipRequest from '@/models/MembershipRequest';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const body = await req.json();
    const request = await MembershipRequest.findByIdAndUpdate(params.id, body, { new: true });
    if (!request) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(request);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const request = await MembershipRequest.findByIdAndDelete(params.id);
    if (!request) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
