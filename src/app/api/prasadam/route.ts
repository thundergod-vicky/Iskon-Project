import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import PrasadamItem from '@/models/PrasadamItem';

export async function GET(request: Request) {
  try {
    await connectDB();
    const items = await PrasadamItem.find({ active: true }).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('cookie') || request.headers.get('Authorization') || '';
    if (!authHeader.includes('token') && !authHeader.includes('jwt') && !authHeader.includes('iskcon_admin_token')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const body = await request.json();
    const newItem = await PrasadamItem.create(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
