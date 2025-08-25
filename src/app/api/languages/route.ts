import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    await connectDB();
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ languages: [] });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await User.findById(decoded.userId).select("languages");

    return NextResponse.json({ languages: user?.languages || [] });
}

export async function PUT(req: NextRequest) {
    await connectDB();
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const body = await req.json();
    const { languages } = body;

    const updatedUser = await User.findByIdAndUpdate(
        decoded.userId,
        { languages },
        { new: true }
    );
    return NextResponse.json({ languages: updatedUser?.languages || [] });
}
