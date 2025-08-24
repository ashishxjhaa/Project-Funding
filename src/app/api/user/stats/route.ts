// src/app/api/user/stats/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Listing from "@/models/Listing";
import mongoose from "mongoose";

interface DecodedToken {
  userId: string;
  iat?: number;
  exp?: number;
  [k: string]: unknown;
}

function getTokenFromReq(req: Request): string | undefined {
  const cookie = req.headers.get("cookie") || "";
  const part = cookie.split("; ").find((c) => c.startsWith("token="));
  return part?.split("=")[1];
}

async function getUserIdOr401(req: Request): Promise<{ userId?: string; error?: Response }> {
  const token = getTokenFromReq(req);
  if (!token) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as
      | DecodedToken
      | jwt.JwtPayload
      | string;
    if (typeof decoded === "object" && decoded !== null && "userId" in decoded) {
      return { userId: (decoded as DecodedToken).userId };
    }
    return { error: NextResponse.json({ error: "Invalid token" }, { status: 401 }) };
  } catch {
    return { error: NextResponse.json({ error: "Invalid token" }, { status: 401 }) };
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const { userId, error } = await getUserIdOr401(req);
    if (error) return error;

    const totalProjects = await Listing.countDocuments({ user: userId });

    const aggregates = (await Listing.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalFunds: { $sum: "$funds" },
          totalLikes: { $sum: "$likes" },
        },
      },
    ])) as Array<{ _id: null; totalFunds?: number; totalLikes?: number }>;

    const totals = aggregates[0] || { totalFunds: 0, totalLikes: 0 };

    return NextResponse.json(
      {
        totalProjects,
        totalFunds: totals.totalFunds ?? 0,
        totalLikes: totals.totalLikes ?? 0,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/user/stats error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
