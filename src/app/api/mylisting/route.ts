import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Listing from "@/models/Listing";


interface DecodedToken {
    userId: string;
    iat?: number;
    exp?: number;
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


export async function GET(req: Request) {
    try {
        await connectDB();
        const { userId, error } = await getUserIdOr401(req);
        if (error) return error;

        const listings = await Listing.find({ user: userId }).sort({ createdAt: -1 });
        return NextResponse.json(listings, { status: 200 });
    } catch (err) {
        console.error("GET /api/mylisting error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        await connectDB();
        const { userId, error } = await getUserIdOr401(req);
        if (error) return error;

        const { name, description, tags, link } = await req.json();

        if (!name || !description || !Array.isArray(tags)) {
            return NextResponse.json(
                { error: "name, description and tags are required" },
                { status: 400 }
            );
        }
        if (tags.length !== 3) {
            return NextResponse.json({ error: "Select exactly 3 tags." }, { status: 400 });
        }

        const created = await Listing.create({
            user: userId,
            name,
            description,
            tags,
            link,
        });

        return NextResponse.json(created, { status: 201 });
    } catch (err) {
        console.error("POST /api/mylisting error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}