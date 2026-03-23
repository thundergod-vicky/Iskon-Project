import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import FormSubmission from '@/models/FormSubmission';

export async function GET() {
  await dbConnect();
  try {
    const submissions = await FormSubmission.find({}).populate('formId').sort({ createdAt: -1 });
    return NextResponse.json(submissions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const submission = await FormSubmission.create(body);
    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
