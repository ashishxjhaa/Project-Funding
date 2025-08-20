import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("token")?.value;

    const protectedRoutes = ["/listing"];

    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL("/signin", req.url));
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
            const { payload } = await jose.jwtVerify(token, secret);

            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL("/signin", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/listing",
        "/listing/:path*",
    ],
};