// src/app/api/listings/[id]/like/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Listing from "@/models/Listing";
import Like from "@/models/Like";
import mongoose from "mongoose";

interface DecodedToken {
  userId: string;
  iat?: number;
  exp?: number;
  [k: string]: unknown;
}

type ListingDoc = {
  _id: mongoose.Types.ObjectId | string;
  likes?: number;
  funds?: number;
  [k: string]: unknown;
};

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

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { userId, error } = await getUserIdOr401(req);
    if (error) return error;
    const { id } = await context.params;

    try {
      await Like.create({ listing: id, user: userId });
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "code" in err && (err as { code?: number }).code === 11000) {
        const current = (await Listing.findById(id).lean()) as ListingDoc | null;
        return NextResponse.json({ liked: true, likes: current?.likes ?? 0 }, { status: 200 });
      }
      throw err;
    }

    const updated = (await Listing.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true }).lean()) as
      | ListingDoc
      | null;

    return NextResponse.json({ liked: true, likes: updated?.likes ?? 0 }, { status: 200 });
  } catch (err) {
    console.error("POST /api/listings/[id]/like error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { userId, error } = await getUserIdOr401(req);
    if (error) return error;
    const { id } = await context.params;

    const deleted = await Like.findOneAndDelete({ listing: id, user: userId });

    if (!deleted) {
      const current = (await Listing.findById(id).lean()) as ListingDoc | null;
      return NextResponse.json({ liked: false, likes: current?.likes ?? 0 }, { status: 200 });
    }

    const updated = (await Listing.findByIdAndUpdate(id, { $inc: { likes: -1 } }, { new: true }).lean()) as
      | ListingDoc
      | null;

    if (updated && typeof updated.likes === "number" && updated.likes < 0) {
      await Listing.findByIdAndUpdate(id, { $set: { likes: 0 } });
      return NextResponse.json({ liked: false, likes: 0 }, { status: 200 });
    }

    return NextResponse.json({ liked: false, likes: updated?.likes ?? 0 }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/listings/[id]/like error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
