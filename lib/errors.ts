import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

/**
 * Standard API error response
 */
export interface ApiErrorResponse {
  error: string;
  details?: unknown;
  statusCode?: number;
}

/**
 * Log error securely (avoid exposing sensitive information)
 */
export function logError(error: unknown, context?: string): void {
  const timestamp = new Date().toISOString();
  const prefix = context ? `[${context}] ` : '';

  if (process.env.NODE_ENV === 'development') {
    // In development, log everything for debugging
    console.error(`${timestamp} ${prefix}`, error);
  } else {
    // In production, log sanitized version
    if (error instanceof Error) {
      console.error(`${timestamp} ${prefix}${error.message}`);
      // In production, send to monitoring service (Sentry, LogRocket, etc.)
      // Example: Sentry.captureException(error);
    } else {
      console.error(`${timestamp} ${prefix}Unknown error occurred`);
    }
  }
}

/**
 * Convert error to safe API response
 */
export function toApiError(error: unknown, context?: string): ApiErrorResponse {
  // Log the error server-side
  logError(error, context);

  // Zod validation errors
  if (error instanceof ZodError) {
    return {
      error: 'Validation failed',
      details: error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
      statusCode: 400,
    };
  }

  // Prisma known request errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        // Unique constraint violation
        const target = (error.meta?.target as string[]) || [];
        return {
          error: `A record with this ${target.join(', ')} already exists`,
          statusCode: 409,
        };
      case 'P2025':
        // Record not found
        return {
          error: 'Record not found',
          statusCode: 404,
        };
      case 'P2003':
        // Foreign key constraint failed
        return {
          error: 'Invalid reference to related record',
          statusCode: 400,
        };
      default:
        return {
          error: 'Database operation failed',
          statusCode: 500,
        };
    }
  }

  // Prisma validation errors
  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      error: 'Invalid data provided',
      statusCode: 400,
    };
  }

  // Standard errors with custom messages
  if (error instanceof Error) {
    // Known error messages that are safe to expose
    const safeMessages = [
      'Unauthorized',
      'Forbidden',
      'Not found',
      'Invalid credentials',
      'Account is deactivated',
      'Cannot delete your own account',
    ];

    if (safeMessages.some((msg) => error.message.includes(msg))) {
      return {
        error: error.message,
        statusCode: getStatusCodeFromMessage(error.message),
      };
    }
  }

  // Generic error for anything else (don't expose internal details)
  return {
    error: 'An unexpected error occurred. Please try again later.',
    statusCode: 500,
  };
}

/**
 * Helper to determine status code from error message
 */
function getStatusCodeFromMessage(message: string): number {
  if (message.includes('Unauthorized') || message.includes('Invalid credentials')) {
    return 401;
  }
  if (message.includes('Forbidden') || message.includes('deactivated')) {
    return 403;
  }
  if (message.includes('Not found')) {
    return 404;
  }
  if (message.includes('already exists') || message.includes('Cannot delete')) {
    return 400;
  }
  return 500;
}

/**
 * Create a safe error response for API routes
 */
export function createErrorResponse(
  error: unknown,
  context?: string,
  defaultStatusCode = 500
): Response {
  const apiError = toApiError(error, context);
  const statusCode = apiError.statusCode || defaultStatusCode;

  const response: { error: string; details?: unknown } = {
    error: apiError.error,
  };

  if (apiError.details) {
    response.details = apiError.details;
  }

  return Response.json(response, { status: statusCode });
}

/**
 * Async error handler wrapper for API routes
 */
export function withErrorHandler<T extends (...args: unknown[]) => Promise<Response>>(
  handler: T,
  context?: string
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await handler(...args);
    } catch (error) {
      return createErrorResponse(error, context);
    }
  }) as T;
}
