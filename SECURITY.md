# Security Implementation Guide

## Overview

This document outlines the security measures implemented in the ExpoStudios application and provides guidance for maintaining and upgrading security features.

## Implemented Security Features

### ✅ 1. Rate Limiting

**Implementation**: [`lib/rate-limit.ts`](lib/rate-limit.ts)

- In-memory rate limiter for all API endpoints
- Different limits for public, authenticated, and admin endpoints
- Automatic cleanup of expired entries
- Rate limit headers in responses

**Configuration**:
- Public API: 10 requests/minute
- Auth endpoints: 5 attempts/5 minutes
- Newsletter: 3 requests/hour
- Authenticated: 60 requests/minute
- Admin write: 30 requests/minute

**⚠️ Production Upgrade Path**: For multi-instance deployments, replace with Redis-based solution:
```bash
npm install @upstash/ratelimit @upstash/redis
```

### ✅ 2. Input Validation

**Implementation**: [`lib/validations/`](lib/validations/)

- Zod schemas for all API inputs
- Password strength requirements (min 8 chars, uppercase, lowercase, number, special char)
- Email format validation
- String length limits to prevent DoS

**Schemas**:
- `user.schema.ts` - User creation, updates, login
- `lead.schema.ts` - Lead management
- `article.schema.ts` - Article CRUD
- `newsletter.schema.ts` - Newsletter subscriptions

### ✅ 3. Output Sanitization

**Implementation**: [`lib/sanitize.ts`](lib/sanitize.ts)

- HTML sanitization for rich text content
- XSS prevention for user-generated content
- URL validation and protocol checking
- Filename sanitization for uploads

**Functions**:
- `sanitizeRichText()` - Articles, blog posts
- `sanitizeBasicText()` - User bios, comments
- `sanitizePlainText()` - Names, titles
- `sanitizeUrl()` - URL inputs
- `sanitizeSlug()` - URL slugs

### ✅ 4. Error Handling

**Implementation**: [`lib/errors.ts`](lib/errors.ts)

- Secure error logging (no sensitive data in production logs)
- Generic error messages to clients
- Specific handling for Zod validation and Prisma errors
- Context-aware error responses

**Usage**:
```typescript
import { createErrorResponse } from '@/lib/errors';

try {
  // Your code
} catch (error) {
  return createErrorResponse(error, 'ContextName');
}
```

### ✅ 5. Security Headers

**Implementation**: [`next.config.ts`](next.config.ts:17-53)

Headers configured:
- `X-Frame-Options: SAMEORIGIN` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `X-XSS-Protection: 1; mode=block` - XSS protection for older browsers
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer information
- `Permissions-Policy` - Restricts access to browser features
- `Strict-Transport-Security` - Forces HTTPS in production

### ✅ 6. Authentication Security

**Implementation**: [`app/api/auth/[...nextauth]/route.ts`](app/api/auth/[...nextauth]/route.ts:96-129)

- Secure cookie configuration
- HttpOnly cookies
- SameSite: Lax
- CSRF token protection (built-in to NextAuth)
- Secure flag in production
- 30-day session expiration

### ✅ 7. Request Size Limits

**Implementation**: [`middleware.ts`](middleware.ts:10-22)

- Maximum request size: 1MB
- Prevents memory exhaustion attacks
- Early rejection at middleware level

### ✅ 8. Type Safety

**Implementation**: [`tsconfig.json`](tsconfig.json:17-21)

- Strict TypeScript mode enabled
- Additional strict checks:
  - `noUnusedLocals`
  - `noUnusedParameters`
  - `noFallthroughCasesInSwitch`
  - `noUncheckedIndexedAccess`

## Pre-Production Security Checklist

Before deploying to production, ensure:

### Critical
- [ ] Generate unique `NEXTAUTH_SECRET` (32+ bytes)
- [ ] Generate unique `JWT_SECRET` (32+ bytes)
- [ ] Change default `ADMIN_PASSWORD`
- [ ] Update all URLs to production domains
- [ ] Set `NODE_ENV=production`
- [ ] Use strong PostgreSQL password
- [ ] Review and set appropriate feature flags
- [ ] Verify `.env` is in `.gitignore`

### Recommended
- [ ] Set up SSL/TLS certificates
- [ ] Configure SMTP for email
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Enable database backups
- [ ] Configure CDN for static assets
- [ ] Set up log aggregation
- [ ] Implement Redis for rate limiting (multi-instance)
- [ ] Configure WAF (Web Application Firewall)

## Secret Generation Commands

### Generate NEXTAUTH_SECRET
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Generate JWT_SECRET
```bash
openssl rand -base64 32
```

### Generate Strong Password
```bash
openssl rand -base64 24
```

## Upgrade Paths

### Rate Limiting (for production at scale)

1. Install Upstash Redis:
```bash
npm install @upstash/ratelimit @upstash/redis
```

2. Create Upstash account and get Redis credentials

3. Update `lib/rate-limit.ts`:
```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
});
```

### Content Security Policy (CSP)

Add to `next.config.ts` headers:
```typescript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
}
```

**Note**: Test thoroughly as CSP can break functionality if misconfigured.

### Database Encryption

For sensitive data at rest:
1. Enable PostgreSQL encryption
2. Use application-level encryption for PII
3. Consider field-level encryption with `@prisma/client` encryption middleware

## Security Monitoring

### Recommended Tools

- **Error Tracking**: Sentry (https://sentry.io)
- **Log Management**: Logtail, DataDog
- **Security Scanning**: Snyk, Dependabot
- **Penetration Testing**: OWASP ZAP, Burp Suite
- **SSL Monitoring**: SSL Labs

### Metrics to Monitor

- Failed login attempts (>5 per IP/hour)
- Rate limit violations
- 4xx/5xx error rates
- Unusual traffic patterns
- Database query performance
- Memory/CPU usage spikes

## Vulnerability Disclosure

If you discover a security vulnerability:

1. **DO NOT** create a public GitHub issue
2. Email security@expostudios.com with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (optional)
3. Allow 90 days for patching before public disclosure

## Regular Security Tasks

### Weekly
- Review failed authentication logs
- Check rate limit violations
- Monitor error rates

### Monthly
- Update dependencies (`npm audit fix`)
- Review user permissions
- Check for security advisories
- Rotate API keys (if applicable)

### Quarterly
- Review and update security policies
- Conduct security training
- Penetration testing
- Update secrets and passwords

### Annually
- Full security audit
- Update SSL certificates
- Review third-party integrations
- Disaster recovery testing

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [NextAuth.js Security](https://next-auth.js.org/configuration/options#security)
- [Prisma Security](https://www.prisma.io/docs/concepts/components/prisma-client/security)

## License

This security implementation is part of the ExpoStudios application.
