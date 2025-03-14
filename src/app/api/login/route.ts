import { NextResponse } from 'next/server';
import { verifyUser } from '@/lib/users';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await verifyUser(email, password);
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 401 }
    );
  }
}