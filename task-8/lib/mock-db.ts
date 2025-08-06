// Shared mock database for all API routes
export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  verified: boolean;
  createdAt: string;
}

// In-memory storage
export const mockUsers: MockUser[] = [];
export let mockOtp = '1234'; // Default OTP for testing

// Helper functions
export function findUserByEmail(email: string): MockUser | undefined {
  return mockUsers.find(user => user.email === email);
}

export function findUserByCredentials(email: string, password: string): MockUser | undefined {
  return mockUsers.find(user => user.email === email && user.password === password);
}

export function createUser(userData: Omit<MockUser, 'id' | 'verified' | 'createdAt'>): MockUser {
  const newUser: MockUser = {
    ...userData,
    id: Date.now().toString(),
    verified: false,
    createdAt: new Date().toISOString()
  };
  mockUsers.push(newUser);
  return newUser;
}

export function verifyUser(email: string): boolean {
  const user = findUserByEmail(email);
  if (user) {
    user.verified = true;
    return true;
  }
  return false;
}

export function generateOTP(): string {
  mockOtp = Math.floor(1000 + Math.random() * 9000).toString();
  console.log('New mock OTP generated:', mockOtp);
  return mockOtp;
}

export function getCurrentOTP(): string {
  return mockOtp;
} 