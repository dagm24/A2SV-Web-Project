import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, createUser, generateOTP } from '@/lib/mock-db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword, role } = body;
    
    // Check if user already exists
    if (findUserByEmail(email)) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Validate password match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Create mock user
    const newUser = createUser({ name, email, password, role });
    
    // Generate new OTP for this user
    const otp = generateOTP();
    
    console.log('Mock signup successful:', { email, userId: newUser.id, otp });

    return NextResponse.json(
      { 
        message: 'User created successfully. Please check your email for verification.',
        user: { id: newUser.id, email: newUser.email },
        otp: otp // For testing purposes
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Mock signup error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 