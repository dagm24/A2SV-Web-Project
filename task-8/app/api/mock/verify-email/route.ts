import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, verifyUser, getCurrentOTP } from '@/lib/mock-db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, OTP } = body;
    
    const user = findUserByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const currentOTP = getCurrentOTP();
    if (OTP !== currentOTP) {
      return NextResponse.json(
        { message: 'Invalid OTP' },
        { status: 400 }
      );
    }

    // Mark user as verified
    verifyUser(email);

    console.log('Mock email verification successful:', { email, userId: user.id, otp: currentOTP });

    return NextResponse.json({
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Mock verify-email error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 