-- ============================================================================
-- Madrasatu Darul Arkam
-- Migration 0005: Current User Effective Permissions RPC
-- ============================================================================

create or replace function public.get_current_permissions()
returns setof text
language sql
stable
security definer
set search_path = ''
as $$
  select p.permission_key
  from public.profiles as profile
  join public.role_permissions as rp
    on rp.role_code = profile.role
  join public.permissions as p
    on p.id = rp.permission_id
  where profile.id = (select auth.uid())
    and profile.status = 'active'
  order by p.permission_key;
$$;

revoke execute on function public.get_current_permissions() from public;
revoke execute on function public.get_current_permissions() from anon;
grant execute on function public.get_current_permissions() to authenticated;

-- ============================================================================
-- END OF MIGRATION 0005
-- ============================================================================
