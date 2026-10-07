import { NextRequest, NextResponse } from "next/server";

import { isLocale, type Locale } from "@/i18n/config";
import { createClient } from "@/lib/supabase/server";

function getSafeNextPath(
  next: string | null,
  fallbackLocale: Locale,
): string {
  const fallback = `/${fallbackLocale}/dashboard`;

  if (!next || !next.startsWith("/")) {
    return fallback;
  }

  if (next.startsWith("//")) {
    return fallback;
  }

  const firstSegment = next.split("/")[1];

  if (!isLocale(firstSegment)) {
    return fallback;
  }

  return next;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  const requestedNext = searchParams.get("next");

  const requestedLocale = searchParams.get("locale");
  const locale: Locale = isLocale(requestedLocale ?? "")
    ? requestedLocale as Locale
    : "en";

  const safeNext = getSafeNextPath(requestedNext, locale);

  if (!code) {
    return NextResponse.redirect(
      new URL(`/${locale}/login?error=auth_callback`, request.url),
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(`/${locale}/login?error=auth_callback`, request.url),
    );
  }

  return NextResponse.redirect(new URL(safeNext, request.url));
}
