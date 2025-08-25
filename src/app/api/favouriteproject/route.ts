import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import connectDB from "@/lib/db";
import Favourite from "@/models/Favourite";
import Listing from "@/models/Listing";
import type { Types } from "mongoose";

interface ListingLean {
  _id: Types.ObjectId;
  name: string;
  description: string;
  tags: string[];
  link?: string;
  funds: number;
  likes: number;
  createdAt: Date;
}

type FavouriteLean = {
  listing?: ListingLean;
};

function getUserIdFromReq(req: NextRequest): string | null {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { userId: string };
    return payload.userId || null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userId = getUserIdFromReq(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const favs = (await Favourite.find({ user: userId })
      .populate("listing")
      .sort({ createdAt: -1 })
      .lean()) as unknown as FavouriteLean[];

    const listings = favs
      .map((f) => f.listing)
      .filter((l): l is ListingLean => Boolean(l))
      .map((l) => ({ ...l, favourited: true }));

    return NextResponse.json({ listings });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const userId = getUserIdFromReq(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { listingId } = await req.json();
    if (!listingId) {
      return NextResponse.json({ error: "listingId required" }, { status: 400 });
    }

    const exists = await Listing.exists({ _id: listingId });
    if (!exists) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    await Favourite.updateOne(
      { user: userId, listing: listingId },
      { $setOnInsert: { user: userId, listing: listingId } },
      { upsert: true }
    );

    return NextResponse.json({ ok: true, listingId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const userId = getUserIdFromReq(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const listingId = searchParams.get("listingId");
    if (!listingId) {
      return NextResponse.json({ error: "listingId required" }, { status: 400 });
    }

    await Favourite.deleteOne({ user: userId, listing: listingId });
    return NextResponse.json({ ok: true, listingId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}