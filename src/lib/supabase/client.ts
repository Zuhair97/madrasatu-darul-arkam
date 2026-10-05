"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicEnv } from "@/config/env";

export function createClient() {
  const { url, publishableKey } = getSupabasePublicEnv();

  return createBrowserClient(url, publishableKey);
}
