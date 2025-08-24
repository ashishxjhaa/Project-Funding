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
  [key: string]: unknown;
}

type PublicListing = {
  _id: mongoose.Types.ObjectId | string;
  name?: string;
  description?: string;
  tags?: string[];
  link?: string;
  createdAt?: Date;
  funds?: number;
  likes?: number;
  liked?: boolean;
  [k: string]: unknown;
};

function getTokenFromReq(req: Request): string | undefined {
  const cookie = req.headers.get("cookie") || "";
  const part = cookie.split("; ").find((c) => c.startsWith("token="));
  return part?.split("=")[1];
}

async function tryGetUserId(req: Request): Promise<string | null> {
  const token = getTokenFromReq(req);
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as
      | DecodedToken
      | jwt.JwtPayload
      | string;

    if (typeof decoded === "object" && decoded !== null && "userId" in decoded) {
      return (decoded as DecodedToken).userId;
    }
    return null;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const userId = await tryGetUserId(req);

    const topListings = (await Listing.find({})
      .sort({ funds: -1, likes: -1 })
      .limit(10)
      .lean()) as PublicListing[];

    const allListings = (await Listing.find({})
      .sort({ createdAt: -1 })
      .lean()) as PublicListing[];

    if (userId) {
      const allIds = [...topListings, ...allListings].map((l) => l._id);
      const uniqueIds = [...new Set(allIds.map(String))];

      const likedDocs = (await Like.find({
        listing: { $in: uniqueIds },
        user: userId,
      })
        .select("listing")
        .lean()) as Array<{ listing?: mongoose.Types.ObjectId | string }>;

      const likedSet = new Set<string>(
        likedDocs
          .filter((d): d is { listing: mongoose.Types.ObjectId | string } => d.listing != null)
          .map((d) => String(d.listing))
      );

      const markLiked = (arr: PublicListing[]): PublicListing[] =>
        arr.map((l: PublicListing) => ({ ...l, liked: likedSet.has(String(l._id)) }));

      return NextResponse.json(
        { topListings: markLiked(topListings), allListings: markLiked(allListings) },
        { status: 200 }
      );
    }

    return NextResponse.json({ topListings, allListings }, { status: 200 });
  } catch (err) {
    console.error("GET /api/listings/public error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
