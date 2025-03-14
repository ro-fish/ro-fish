import { NextResponse } from 'next/server';
import { createUser } from '@/lib/users';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const newUser = await createUser({ name, email, password });
    return NextResponse.json({ success: true, user: newUser });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}