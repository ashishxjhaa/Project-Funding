import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    const protectedRoutes = ["/listing", "/dashboard"];

    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL("/signin", req.url));
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

            await connectDB();
            const user = await User.findById(payload.userId);
            if (!user) {
                return NextResponse.redirect(new URL("/signin", req.url));
            } 

            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL("/signin", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/listing/:path*",
        "/dashboard/:path*",
    ],
};