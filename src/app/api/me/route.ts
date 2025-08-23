import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/User";

interface DecodedToken {
  userId: string;
  iat?: number;
  exp?: number;
}

export async function GET(req: Request) {
    try {
        await connectDB();

        const token = req.headers.get("cookie")
        ?.split("; ")
        .find((c) => c.startsWith("token="))
        ?.split("=")[1];

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let decoded: DecodedToken;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (err) {
        console.error("Me API Error:", err);
            return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    } 
}

export async function PUT(req: Request) {
  try {
    await connectDB();

    const token = req.headers.get("cookie")
      ?.split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, email } = body;

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { fullName, email },
      { new: true }
    ).select("-password");

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (err) {
    console.error("Update Profile API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}