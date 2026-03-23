import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import MembershipRequest from '@/models/MembershipRequest';

export async function GET() {
  await dbConnect();
  try {
    const requests = await MembershipRequest.find({}).sort({ createdAt: -1 });
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const membershipRequest = await MembershipRequest.create(body);
    return NextResponse.json(membershipRequest, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
