import { NextResponse } from 'next/server';
import { mockUsers, getCurrentOTP } from '@/lib/mock-db';

export async function GET() {
  return NextResponse.json({
    users: mockUsers.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
      createdAt: user.createdAt
    })),
    currentOTP: getCurrentOTP(),
    totalUsers: mockUsers.length,
    verifiedUsers: mockUsers.filter(u => u.verified).length
  });
} 