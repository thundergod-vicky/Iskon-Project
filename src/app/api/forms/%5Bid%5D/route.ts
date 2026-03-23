import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Form from '@/models/Form';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const form = await Form.findOne({ 
      $or: [{ _id: params.id.length === 24 ? params.id : undefined }, { slug: params.id }] 
    });
    if (!form) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(form);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const body = await req.json();
    const form = await Form.findByIdAndUpdate(params.id, body, { new: true });
    if (!form) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(form);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const form = await Form.findByIdAndDelete(params.id);
    if (!form) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
