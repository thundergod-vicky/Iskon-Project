import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import MembershipLevel from '@/models/MembershipLevel';

export async function GET() {
  await dbConnect();
  try {
    const levels = await MembershipLevel.find({ active: true }).sort({ order: 1 });
    return NextResponse.json(levels);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const level = await MembershipLevel.create(body);
    return NextResponse.json(level, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
