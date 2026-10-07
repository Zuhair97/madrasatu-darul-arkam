-- ============================================================================
-- Madrasatu Darul Arkam
-- Migration 0004: Dashboard Permission Reconciliation
-- ============================================================================

-- Add the canonical dashboard permission.
insert into public.permissions (
  permission_key,
  domain,
  description
)
values (
  'dashboard.view',
  'dashboard',
  'View the authenticated application dashboard'
)
on conflict (permission_key) do update
set
  domain = excluded.domain,
  description = excluded.description;

-- Dashboard access belongs to all internal application roles.
-- RESULT_CHECKER remains excluded because its result-verification flow
-- is intentionally separate from the authenticated school application.
insert into public.role_permissions (
  role_code,
  permission_id
)
select
  r.role_code,
  p.id
from (
  values
    ('super_admin'::public.user_role),
    ('school_administrator'::public.user_role),
    ('principal'::public.user_role),
    ('teacher'::public.user_role),
    ('accountant'::public.user_role),
    ('student'::public.user_role),
    ('parent_guardian'::public.user_role)
) as r(role_code)
cross join public.permissions p
where p.permission_key = 'dashboard.view'
on conflict (role_code, permission_id) do nothing;

-- ============================================================================
-- END OF MIGRATION 0004
-- ============================================================================
