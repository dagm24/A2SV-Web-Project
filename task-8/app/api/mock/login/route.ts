import { NextRequest, NextResponse } from 'next/server';
import { findUserByCredentials } from '@/lib/mock-db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    const user = findUserByCredentials(email, password);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!user.verified) {
      return NextResponse.json(
        { message: 'Please verify your email first' },
        { status: 401 }
      );
    }

    console.log('Mock login successful:', { email, userId: user.id });

    return NextResponse.json({
      message: 'Login successful',
      accessToken: `mock-token-${Date.now()}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Mock login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 