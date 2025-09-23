import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Paths to exclude from all checks
  const excludedPaths = [
    '/_next',
    '/favicon.ico',
    '/api/public',
  ];

  // Skip middleware for excluded paths
  if (excludedPaths.some(excluded => path.startsWith(excluded))) {
    return NextResponse.next();
  }

  // For maintenance check, we'll use a header-based approach
  // The maintenance status will be checked in the root layout

  // Protected routes that require authentication
  const protectedPaths = ['/dashboard'];
  const isProtected = protectedPaths.some(p => path.startsWith(p));

  if (isProtected) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Check role-based access
    if (path.startsWith("/dashboard/admin") && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (path.startsWith("/dashboard/writer") && !["ADMIN", "WRITER"].includes(token.role as string)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (path.startsWith("/dashboard/sales") && !["ADMIN", "SALES"].includes(token.role as string)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};