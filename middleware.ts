// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// https://nextjs.org/docs/advanced-features/middleware#nextresponse

// This function can be marked `async` if using `await` inside
/**
 * If the environment variable `SLICEDADVICE_API_KEY` is set, or the pathname starts with `/no`, then
 * continue normally. Otherwise, redirect to `/no`
 * @param {NextRequest} request - NextRequest - The request object that Next.js passes to the
 * middleware.
 * @returns A function that takes a NextRequest and returns a NextResponse.
 */
export function middleware(request: NextRequest) {
    if (process.env.SLICEDADVICE_API_KEY || request.nextUrl.pathname.startsWith("/no")) {
        // continue normally
    } else {
        return NextResponse.redirect(new URL("/no", request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}
