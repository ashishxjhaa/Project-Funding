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

    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader
      .split(";")
      .map((c) => c.trim())
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
    const { fullName, email, github } = body;

    const updateFields: Record<string, unknown> = {};
      if (typeof fullName === "string") updateFields.fullName = fullName.trim();
      if (typeof email === "string") updateFields.email = email.trim();
      if (github !== undefined) {
      const sanitizedGithub =
        typeof github === "string"
          ? github
              .trim()
              .replace(/^(https?:\/\/)?(www\.)?github\.com\/?/i, "")
              .replace(/^@/, "")
              .toLowerCase()
          : github;
      updateFields.github = sanitizedGithub ?? "";
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      console.error("User not found for id:", decoded.userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (err) {
    console.error("Update Profile API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}