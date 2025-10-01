import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { routing } from './i18n/routing';
import { checkRateLimit, getRateLimitIdentifier, createRateLimitHeaders } from './lib/rate-limit';

const intlMiddleware = createMiddleware(routing);

// Maximum request size in bytes (1MB)
const MAX_REQUEST_SIZE = 1048576;

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Request size validation
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > MAX_REQUEST_SIZE) {
    return NextResponse.json(
      { error: 'Request payload too large. Maximum size is 1MB.' },
      { status: 413 }
    );
  }

  // Rate limiting for API routes
  if (pathname.startsWith('/api')) {
    // Get user token if available
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Determine rate limit type based on endpoint and authentication
    let limitType: 'PUBLIC_API' | 'AUTH_LOGIN' | 'NEWSLETTER' | 'AUTHENTICATED' | 'ADMIN_WRITE' = 'PUBLIC_API';

    if (pathname.includes('/api/auth')) {
      limitType = 'AUTH_LOGIN';
    } else if (pathname.includes('/api/newsletter')) {
      limitType = 'NEWSLETTER';
    } else if (token) {
      // Authenticated request
      if (request.method !== 'GET' && token.role === 'ADMIN') {
        limitType = 'ADMIN_WRITE';
      } else {
        limitType = 'AUTHENTICATED';
      }
    }

    // Check rate limit
    const identifier = getRateLimitIdentifier(request, token?.id as string | undefined);
    const result = checkRateLimit(identifier, limitType);

    if (!result.success) {
      const response = NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: result.reset.toISOString(),
        },
        { status: 429 }
      );

      // Add rate limit headers
      const headers = createRateLimitHeaders(result);
      Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      return response;
    }

    // Add rate limit headers to successful response
    const nextResponse = NextResponse.next();
    const headers = createRateLimitHeaders(result);
    Object.entries(headers).forEach(([key, value]) => {
      nextResponse.headers.set(key, value);
    });
  }

  // Dashboard authentication check
  if (pathname.startsWith('/dashboard')) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.redirect(new URL('/en/login', request.url));
    }

    // Role-based access
    if (pathname.startsWith("/dashboard/admin") && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname.startsWith("/dashboard/writer") && !["ADMIN", "WRITER"].includes(token.role as string)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname.startsWith("/dashboard/sales") && !["ADMIN", "SALES"].includes(token.role as string)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  // Skip i18n for API routes
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Apply i18n middleware for all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)']
};