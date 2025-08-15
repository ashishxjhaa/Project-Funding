import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    return NextResponse.json({ message: 'User created', email, password });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
