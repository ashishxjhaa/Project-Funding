import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    const { pathname } = req.nextUrl;
    const protectedRoutes = ["/listing", "/dashboard"];

    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL("/signin", req.url));
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET!);
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