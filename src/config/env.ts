/**
 * Centralized environment configuration.
 *
 * Public Supabase values are intentionally read only when a Supabase
 * client is created. This allows the application to build before the
 * real Supabase project credentials are configured.
 *
 * Never place a Supabase secret/service-role key in NEXT_PUBLIC_* variables.
 */

export const ENV = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
} as const;

export function getSupabasePublicEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "Supabase configuration is missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  return {
    url,
    publishableKey,
  } as const;
}
