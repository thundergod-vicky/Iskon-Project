import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import CourseRegistration from '@/models/CourseRegistration';

// Admin gets all course registrations
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('cookie') || request.headers.get('Authorization') || '';
    if (!authHeader.includes('token') && !authHeader.includes('jwt') && !authHeader.includes('iskcon_admin_token')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const registrations = await CourseRegistration.find().populate('courseId', 'title price').sort({ createdAt: -1 });
    return NextResponse.json(registrations);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// User submits form to register
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const newReg = await CourseRegistration.create(body);
    return NextResponse.json(newReg, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
