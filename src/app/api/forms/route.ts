import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Form from '@/models/Form';

export async function GET() {
  await dbConnect();
  try {
    const forms = await Form.find({ active: true }).sort({ createdAt: -1 });
    return NextResponse.json(forms);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    if (!body.slug) body.slug = body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const form = await Form.create(body);
    return NextResponse.json(form, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
