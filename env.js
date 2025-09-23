import { z } from 'zod';

// Define the schema for environment variables
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url().startsWith('postgresql://'),
  POSTGRES_USER: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_DB: z.string().min(1),

  // NextAuth
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),

  // JWT
  JWT_SECRET: z.string().min(32),

  // App Configuration
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_API_URL: z.string().url(),

  // Admin Account
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(8),

  // Email Configuration
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM: z.string().email().optional(),

  // Security
  BCRYPT_ROUNDS: z.string().transform(Number).pipe(z.number().min(10).max(15)),
  SESSION_MAX_AGE: z.string().transform(Number).pipe(z.number().positive()),

  // Feature Flags
  ENABLE_REGISTRATION: z.string().transform((val) => val === 'true'),
  ENABLE_NEWSLETTER: z.string().transform((val) => val === 'true'),
  ENABLE_ARTICLES: z.string().transform((val) => val === 'true'),
});

// Parse and validate environment variables
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsedEnv.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;

// Type-safe environment variable access
export type Env = z.infer<typeof envSchema>;