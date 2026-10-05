-- ============================================================================
-- Madrasatu Darul Arkam
-- Migration 0001: Core Identity & Database Security Foundation
-- ============================================================================

-- Purpose:
--   Establish the first production database foundation around Supabase Auth.
--
-- Design principles:
--   - auth.users is the source of user identity.
--   - public.profiles stores application-level user information.
--   - Role and status are database-authoritative.
--   - Row Level Security is enabled from the beginning.
--   - No service-role credentials are used by the application layer.
--   - No seed or fake operational data is created here.
--   - The complete school domain schema will be introduced later.

-- ============================================================================
-- ENUMS
-- ============================================================================

do $$
begin
  create type public.user_role as enum (
    'super_admin',
    'school_administrator',
    'principal',
    'teacher',
    'accountant',
    'student',
    'parent_guardian',
    'result_checker'
  );
exception
  when duplicate_object then null;
end
$$;

do $$
begin
  create type public.user_status as enum (
    'active',
    'suspended',
    'pending'
  );
exception
  when duplicate_object then null;
end
$$;

-- ============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- ============================================================================
-- PROFILES
-- ============================================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  full_name text,
  phone text,
  avatar_url text,

  role public.user_role not null default 'student',
  status public.user_status not null default 'pending',

  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),

  constraint profiles_full_name_length
    check (
      full_name is null
      or char_length(trim(full_name)) between 1 and 200
    ),

  constraint profiles_phone_length
    check (
      phone is null
      or char_length(phone) between 7 and 30
    )
);

-- ============================================================================
-- INDEXES
-- ============================================================================

create index if not exists profiles_role_idx
  on public.profiles(role);

create index if not exists profiles_status_idx
  on public.profiles(status);

-- ============================================================================
-- UPDATED_AT TRIGGER
-- ============================================================================

drop trigger if exists profiles_set_updated_at on public.profiles;

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

-- ============================================================================
-- AUTO-CREATE PROFILE AFTER AUTH USER CREATION
-- ============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    full_name,
    phone,
    avatar_url
  )
  values (
    new.id,
    nullif(
      trim(coalesce(new.raw_user_meta_data ->> 'full_name', '')),
      ''
    ),
    nullif(
      trim(coalesce(new.raw_user_meta_data ->> 'phone', '')),
      ''
    ),
    nullif(
      trim(coalesce(new.raw_user_meta_data ->> 'avatar_url', '')),
      ''
    )
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- Trigger-only function: never expose it as an application RPC.
revoke all on function public.handle_new_user() from public;

-- ============================================================================
-- HELPER: CURRENT USER ROLE
-- ============================================================================

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.profiles
  where id = auth.uid();
$$;

-- Only authenticated application users need this authorization helper.
revoke all on function public.current_user_role() from public;

grant execute on function public.current_user_role()
to authenticated;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

alter table public.profiles enable row level security;

-- ============================================================================
-- PROFILE POLICIES
-- ============================================================================

drop policy if exists "profiles_select_own" on public.profiles;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (
  id = auth.uid()
);

drop policy if exists "profiles_update_own" on public.profiles;

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (
  id = auth.uid()
)
with check (
  id = auth.uid()
);

-- ============================================================================
-- PROTECT AUTHORITATIVE PROFILE FIELDS
-- ============================================================================

create or replace function public.protect_profile_authority_fields()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.role is distinct from old.role then
    raise exception
      'Changing user role is not permitted through profile update';
  end if;

  if new.status is distinct from old.status then
    raise exception
      'Changing user status is not permitted through profile update';
  end if;

  if new.created_at is distinct from old.created_at then
    raise exception
      'Changing profile created_at is not permitted';
  end if;

  return new;
end;
$$;

drop trigger if exists protect_profile_authority_fields on public.profiles;

create trigger protect_profile_authority_fields
before update on public.profiles
for each row
execute function public.protect_profile_authority_fields();

-- Trigger-only function: never expose it as an application RPC.
revoke all on function public.protect_profile_authority_fields()
from public;

-- set_updated_at() is also trigger-only.
revoke all on function public.set_updated_at()
from public;

-- ============================================================================
-- COMMENTS
-- ============================================================================

comment on table public.profiles is
  'Application-level user profiles linked one-to-one with Supabase Auth users.';

comment on column public.profiles.role is
  'Authoritative application role. Changes require controlled administrative authorization.';

comment on column public.profiles.status is
  'Account lifecycle status. Changes require controlled administrative authorization.';

comment on function public.current_user_role() is
  'Returns the authenticated user role for controlled authorization checks.';

-- ============================================================================
-- END OF MIGRATION 0001
-- ============================================================================
