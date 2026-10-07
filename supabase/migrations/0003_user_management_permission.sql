-- ============================================================================
-- Madrasatu Darul Arkam
-- Migration 0003: User Management Permissions
-- ============================================================================

-- User/staff account management is separate from system settings.
-- This allows School Administrators to manage school users without granting
-- them permission to change system settings.

insert into public.permissions (
  permission_key,
  domain,
  description
)
values
  (
    'users.view',
    'users',
    'View authorized school user accounts'
  ),
  (
    'users.manage',
    'users',
    'Create and manage authorized school user accounts'
  )
on conflict (permission_key) do update
set
  domain = excluded.domain,
  description = excluded.description;

-- SUPER ADMIN receives both user-management permissions.
insert into public.role_permissions (
  role_code,
  permission_id
)
select
  'super_admin'::public.user_role,
  p.id
from public.permissions p
where p.permission_key in ('users.view', 'users.manage')
on conflict (role_code, permission_id) do nothing;

-- SCHOOL ADMINISTRATOR may manage school users/staff,
-- but does not receive settings.manage.
insert into public.role_permissions (
  role_code,
  permission_id
)
select
  'school_administrator'::public.user_role,
  p.id
from public.permissions p
where p.permission_key in ('users.view', 'users.manage')
on conflict (role_code, permission_id) do nothing;

-- ============================================================================
-- END OF MIGRATION 0003
-- ============================================================================
