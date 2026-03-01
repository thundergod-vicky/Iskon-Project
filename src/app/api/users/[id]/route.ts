import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

import connectDB from '@/lib/mongoose';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
    }

    const body = await request.json();
    const { fullName, email, password, role } = body;

    // Check if user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if updating to an email that belongs to another user
    if (email && email !== existingUser.email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return NextResponse.json({ error: 'Email already in use by another account' }, { status: 409 });
      }
    }

    // Build update object
    const updateData: any = {};
    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    
    // Hash new password if provided
    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from the response

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(`Failed to update user ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
    }

    // Prevent deleting the last admin
    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    if (userToDelete.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot delete the only remaining admin' },
          { status: 403 }
        );
      }
    }

    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(`Failed to delete user ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
