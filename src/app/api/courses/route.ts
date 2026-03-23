import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Course from '@/models/Course';

export async function GET(request: Request) {
  try {
    await connectDB();
    const courses = await Course.find({ active: true }).sort({ createdAt: -1 });
    return NextResponse.json(courses);
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
    const newCourse = await Course.create(body);
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
