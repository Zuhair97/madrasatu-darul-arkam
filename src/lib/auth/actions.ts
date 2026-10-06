"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { isLocale, type Locale } from "@/i18n/config";

export interface LoginState {
  error: string | null;
}

export async function login(
  locale: Locale,
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!isLocale(locale)) {
    return { error: "Invalid language selection." };
  }

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      error: "Email and password are required.",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: "Invalid email or password.",
    };
  }

  redirect(`/${locale}/dashboard`);
}

export async function logout(locale: Locale): Promise<void> {
  if (!isLocale(locale)) {
    return;
  }

  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect(`/${locale}/login`);
}
