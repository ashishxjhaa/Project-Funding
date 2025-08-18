import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import User from "@/models/User";
import connectDB from "@/lib/db";
import { signupSchema } from "@/schemas/auth";

interface MongoError extends Error {
  code?: number;
  keyPattern?: { email?: number };
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const parseResult = signupSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const { fullName, email, password } = parseResult.data;

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "Signup Done" }, { status: 200 });
  } catch (err: unknown) {
    const error = err as MongoError;

    if (error.code === 11000 && error.keyPattern?.email) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
