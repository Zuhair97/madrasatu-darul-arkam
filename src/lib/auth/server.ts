import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/i18n/config";
import type { Permission, Role } from "@/types/navigation";

export type DatabaseUserRole =
  | "super_admin"
  | "school_administrator"
  | "principal"
  | "teacher"
  | "accountant"
  | "student"
  | "parent_guardian"
  | "result_checker";

export type DatabaseUserStatus =
  | "active"
  | "suspended"
  | "pending";

export interface AuthProfile {
  id: string;
  fullName: string | null;
  phone: string | null;
  avatarUrl: string | null;
  role: DatabaseUserRole;
  status: DatabaseUserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContext {
  user: User;
  profile: AuthProfile;
  role: Role;
  status: DatabaseUserStatus;
}

/**
 * Converts the database role into the application's role representation.
 *
 * The database remains authoritative.
 */
export function toApplicationRole(role: DatabaseUserRole): Role {
  switch (role) {
    case "super_admin":
      return "SUPER_ADMIN";
    case "school_administrator":
      return "SCHOOL_ADMINISTRATOR";
    case "principal":
      return "PRINCIPAL";
    case "teacher":
      return "TEACHER";
    case "accountant":
      return "ACCOUNTANT";
    case "student":
      return "STUDENT";
    case "parent_guardian":
      return "PARENT_GUARDIAN";
    case "result_checker":
      return "RESULT_CHECKER";
    default: {
      const exhaustiveCheck: never = role;
      throw new Error(`Unsupported database role: ${exhaustiveCheck}`);
    }
  }
}

/**
 * Returns the currently authenticated Supabase user.
 *
 * Supabase Auth is the source of identity.
 * The browser must never be trusted to provide the user identity.
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return user;
}

/**
 * Maps the database profile row into the application profile model.
 */
function mapProfile(data: {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: DatabaseUserRole;
  status: DatabaseUserStatus;
  created_at: string;
  updated_at: string;
}): AuthProfile {
  return {
    id: data.id,
    fullName: data.full_name,
    phone: data.phone,
    avatarUrl: data.avatar_url,
    role: data.role,
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

/**
 * Returns the current user's application profile.
 *
 * The profile is read from the protected public.profiles table using
 * the authenticated Supabase session.
 */
export async function getCurrentProfile(
  user?: User | null,
): Promise<AuthProfile | null> {
  const currentUser = user ?? (await getCurrentUser());

  if (!currentUser) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, full_name, phone, avatar_url, role, status, created_at, updated_at",
    )
    .eq("id", currentUser.id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapProfile(data);
}

/**
 * Returns the authenticated user's complete authorization context.
 *
 * No authorization decision should be based on a role supplied by the
 * client or by navigation state.
 */
export async function getCurrentAuthContext(): Promise<AuthContext | null> {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const profile = await getCurrentProfile(user);

  if (!profile) {
    return null;
  }

  return {
    user,
    profile,
    role: toApplicationRole(profile.role),
    status: profile.status,
  };
}

/**
 * Requires an authenticated Supabase user.
 *
 * The locale is supplied by the protected route so authentication
 * redirects remain multilingual.
 */
export async function requireAuthenticatedUser(
  locale: Locale,
): Promise<AuthContext> {
  const context = await getCurrentAuthContext();

  if (!context) {
    redirect(`/${locale}/login`);
  }

  return context;
}

/**
 * Requires an authenticated user with an active school profile.
 *
 * Pending and suspended users must not enter the protected application.
 */
export async function requireActiveUser(
  locale: Locale,
): Promise<AuthContext> {
  const context = await requireAuthenticatedUser(locale);

  if (context.status !== "active") {
    redirect(`/${locale}/account-status`);
  }

  return context;
}

/**
 * Requires an authenticated, active user with a specific application
 * permission.
 *
 * Permission checks are performed server-side through the database
 * authorization function. Navigation visibility is never treated as
 * authorization.
 */
export async function requirePermission(
  locale: Locale,
  permission: Permission,
): Promise<AuthContext> {
  const context = await requireActiveUser(locale);
  const supabase = await createClient();

  const { data: allowed, error } = await supabase.rpc("has_permission", {
    requested_permission: permission,
  });

  if (error || !allowed) {
    redirect(`/${locale}/forbidden`);
  }

  return context;
}
