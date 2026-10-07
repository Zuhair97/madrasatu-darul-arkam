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

export interface PasswordResetState {
  error: string | null;
  success: boolean;
}

export async function requestPasswordReset(
  locale: Locale,
  _previousState: PasswordResetState,
  formData: FormData,
): Promise<PasswordResetState> {
  if (!isLocale(locale)) {
    return {
      error: "Invalid language selection.",
      success: false,
    };
  }

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!email) {
    return {
      error: "Email is required.",
      success: false,
    };
  }

  const supabase = await createClient();

  const origin = process.env.NEXT_PUBLIC_SITE_URL;

  if (!origin) {
    return {
      error: "Password recovery is temporarily unavailable.",
      success: false,
    };
  }

  const redirectTo = `${origin}/${locale}/reset-password`;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) {
    return {
      error: "Unable to process the password reset request.",
      success: false,
    };
  }

  return {
    error: null,
    success: true,
  };
}

export interface UpdatePasswordState {
  error: string | null;
  success: boolean;
}

export async function updatePassword(
  locale: Locale,
  _previousState: UpdatePasswordState,
  formData: FormData,
): Promise<UpdatePasswordState> {
  if (!isLocale(locale)) {
    return {
      error: "Invalid language selection.",
      success: false,
    };
  }

  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(
    formData.get("confirmPassword") ?? "",
  );

  if (!password || !confirmPassword) {
    return {
      error: "Password and confirmation are required.",
      success: false,
    };
  }

  if (password.length < 8) {
    return {
      error: "Password must be at least 8 characters.",
      success: false,
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match.",
      success: false,
    };
  }

  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return {
      error: "Your password reset session is invalid or has expired.",
      success: false,
    };
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return {
      error: "Unable to update your password.",
      success: false,
    };
  }

  await supabase.auth.signOut();

  return {
    error: null,
    success: true,
  };
}

export type InvitableRole =
  | "school_administrator"
  | "principal"
  | "teacher"
  | "accountant"
  | "student"
  | "parent_guardian"
  | "result_checker";

const INVITABLE_ROLES: readonly InvitableRole[] = [
  "school_administrator",
  "principal",
  "teacher",
  "accountant",
  "student",
  "parent_guardian",
  "result_checker",
];


export interface ActivateInvitedAccountState {
  error: string | null;
  success: boolean;
}

export async function activateInvitedAccount(
  locale: Locale,
  _previousState: ActivateInvitedAccountState,
  formData: FormData,
): Promise<ActivateInvitedAccountState> {
  if (!isLocale(locale)) {
    return {
      error: "Invalid language selection.",
      success: false,
    };
  }

  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(
    formData.get("confirmPassword") ?? "",
  );

  if (!password || !confirmPassword) {
    return {
      error: "Password and confirmation are required.",
      success: false,
    };
  }

  if (password.length < 8) {
    return {
      error: "Password must be at least 8 characters.",
      success: false,
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match.",
      success: false,
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      error: "Your invitation session is invalid or has expired.",
      success: false,
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("status")
    .eq("id", user.id)
    .maybeSingle();

  if (
    profileError ||
    !profile ||
    profile.status !== "pending"
  ) {
    return {
      error: "This account is not awaiting activation.",
      success: false,
    };
  }

  const { error: passwordError } = await supabase.auth.updateUser({
    password,
  });

  if (passwordError) {
    return {
      error: "Unable to set your password.",
      success: false,
    };
  }

  const { createAdminClient } = await import("@/lib/supabase/admin");
  const admin = createAdminClient();

  const { error: activationError } = await admin
    .from("profiles")
    .update({
      status: "active",
    })
    .eq("id", user.id)
    .eq("status", "pending");

  if (activationError) {
    return {
      error: "Your password was set, but account activation could not be completed. Please contact the school administrator.",
      success: false,
    };
  }

  await supabase.auth.signOut();

  return {
    error: null,
    success: true,
  };
}

export interface InviteUserState {
  error: string | null;
  success: boolean;
}

export async function inviteUser(
  locale: Locale,
  _previousState: InviteUserState,
  formData: FormData,
): Promise<InviteUserState> {
  if (!isLocale(locale)) {
    return {
      error: "Invalid language selection.",
      success: false,
    };
  }

  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const role = String(formData.get("role") ?? "") as InvitableRole;

  if (!fullName || !email || !role) {
    return {
      error: "Full name, email and role are required.",
      success: false,
    };
  }

  if (fullName.length > 120) {
    return {
      error: "Full name is too long.",
      success: false,
    };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email) || email.length > 254) {
    return {
      error: "Please enter a valid email address.",
      success: false,
    };
  }

  if (!INVITABLE_ROLES.includes(role)) {
    return {
      error: "The selected role is not valid.",
      success: false,
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      error: "You must be signed in to invite users.",
      success: false,
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .maybeSingle();

  if (
    profileError ||
    !profile ||
    profile.status !== "active" ||
    !["super_admin", "school_administrator"].includes(profile.role)
  ) {
    return {
      error: "You do not have permission to manage school users.",
      success: false,
    };
  }

  const {
    data: allowed,
    error: permissionError,
  } = await supabase.rpc("has_permission", {
    requested_permission: "users.manage",
  });

  if (permissionError || !allowed) {
    return {
      error: "You do not have permission to manage school users.",
      success: false,
    };
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL;

  if (!origin) {
    return {
      error: "Account invitation is temporarily unavailable.",
      success: false,
    };
  }

  const { createAdminClient } = await import("@/lib/supabase/admin");
  const admin = createAdminClient();

  const redirectTo =
    `${origin}/auth/callback?next=/${locale}/set-password`;

  const {
    data: invited,
    error: inviteError,
  } = await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo,
    data: {
      full_name: fullName,
      invited_role: role,
    },
  });

  if (inviteError || !invited.user) {
    return {
      error: "Unable to create the user invitation.",
      success: false,
    };
  }

  const invitedUserId = invited.user.id;

  const { error: updateError } = await admin
    .from("profiles")
    .update({
      full_name: fullName,
      role,
      status: "pending",
    })
    .eq("id", invitedUserId);

  if (updateError) {
    await admin.auth.admin.deleteUser(invitedUserId);

    return {
      error: "Unable to prepare the invited user account.",
      success: false,
    };
  }

  return {
    error: null,
    success: true,
  };
}
