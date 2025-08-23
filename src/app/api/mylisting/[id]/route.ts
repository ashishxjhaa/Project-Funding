import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Listing from "@/models/Listing";

interface DecodedToken {
  userId: string;
}

function getTokenFromReq(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const part = cookie.split("; ").find(c => c.startsWith("token="));
  return part?.split("=")[1];
}

async function getUserIdOr401(req: Request) {
  const token = getTokenFromReq(req);
  if (!token) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    return { userId: decoded.userId };
  } catch {
    return { error: NextResponse.json({ error: "Invalid token" }, { status: 401 }) };
  }
}


export async function PUT( req: Request,context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { userId, error } = await getUserIdOr401(req);
    if (error) return error;

    const payload = await req.json();

    if (payload.tags && (!Array.isArray(payload.tags) || payload.tags.length !== 3)) {
      return NextResponse.json({ error: "Select exactly 3 tags." }, { status: 400 });
    }

    const { id } = await context.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (String(listing.user) !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    Object.assign(listing, payload);
    await listing.save();

    return NextResponse.json(listing, { status: 200 });
  } catch (err) {
    console.error("PUT /api/mylisting/[id] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function DELETE( req: Request, context: { params: Promise<{ id: string }> } ) {
  try {
    await connectDB();
    const { userId, error } = await getUserIdOr401(req);
    if (error) return error;

    const { id } = await context.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (String(listing.user) !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await listing.deleteOne();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/mylisting/[id] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
