import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(relativePath: string): string {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath: string): boolean {
  return fs.existsSync(path.join(root, relativePath));
}

console.log("===== 0.1.7-J AUTH SECURITY CONTRACT TEST =====");

// -----------------------------------------------------------------------------
// 1. Authentication foundation
// -----------------------------------------------------------------------------

assert.ok(
  exists("src/lib/auth/server.ts"),
  "Auth server module must exist",
);

assert.ok(
  exists("src/lib/auth/actions.ts"),
  "Auth actions module must exist",
);

const authServer = read("src/lib/auth/server.ts");
const authActions = read("src/lib/auth/actions.ts");

assert.match(
  authServer,
  /requireAuthenticatedUser/,
  "Authenticated-user guard must exist",
);

assert.match(
  authServer,
  /requireActiveUser/,
  "Active-user guard must exist",
);

assert.match(
  authServer,
  /requirePermission/,
  "Permission guard must exist",
);

assert.match(
  authServer,
  /getCurrentPermissions/,
  "Current permission resolver must exist",
);

console.log("PASS: authentication/authorization guards exist");

// -----------------------------------------------------------------------------
// 2. Database-backed authorization
// -----------------------------------------------------------------------------

assert.match(
  authServer,
  /supabase\.rpc\("has_permission"/,
  "Route authorization must use database has_permission RPC",
);

assert.match(
  authServer,
  /supabase\.rpc\("get_current_permissions"/,
  "Effective permissions must come from database RPC",
);

console.log("PASS: authorization is database-backed");

// -----------------------------------------------------------------------------
// 3. Permission-aware navigation must NOT be role-hardcoded
// -----------------------------------------------------------------------------

const navigation = read("src/components/layout/navigation.tsx");
const navigationConfig = read("src/config/navigation.ts");

assert.match(
  navigation,
  /permissions/,
  "Navigation must receive effective permissions",
);

assert.match(
  navigation,
  /permissionSet/,
  "Navigation must filter using permission set",
);

assert.doesNotMatch(
  navigationConfig,
  /ROLE_DEFINITIONS/,
  "ROLE_DEFINITIONS must not be navigation authority",
);

assert.doesNotMatch(
  navigationConfig,
  /getVisibleNavigation/,
  "Old role-based navigation resolver must be removed",
);

assert.doesNotMatch(
  navigationConfig,
  /ALL_PERMISSIONS/,
  "Local hardcoded permission authority must not remain",
);

console.log("PASS: navigation is permission-aware");

// -----------------------------------------------------------------------------
// 4. Route security must remain independent from navigation
// -----------------------------------------------------------------------------

const moduleRoutes = [
  "dashboard",
  "students",
  "academics",
  "results",
  "attendance",
  "finance",
  "tahfiz",
  "communication",
  "reports",
  "settings",
];

for (const route of moduleRoutes) {
  const file = `src/app/[locale]/${route}/page.tsx`;

  assert.ok(
    exists(file),
    `Expected protected route: ${file}`,
  );

  const source = read(file);

  assert.match(
    source,
    /requireActiveUser/,
    `${route} must require an active authenticated user`,
  );
}

console.log("PASS: protected module routes require active users");

// -----------------------------------------------------------------------------
// 5. Permission-protected user management
// -----------------------------------------------------------------------------

const inviteRoute =
  "src/app/[locale]/users/invite/page.tsx";

assert.ok(
  exists(inviteRoute),
  "User invitation route must exist",
);

const inviteSource = read(inviteRoute);

assert.match(
  inviteSource,
  /requirePermission/,
  "User invitation route must require a permission",
);

assert.match(
  inviteSource,
  /users\.manage/,
  "User invitation route must require users.manage",
);

console.log("PASS: users.manage boundary exists");

// -----------------------------------------------------------------------------
// 6. Result Checker isolation
// -----------------------------------------------------------------------------

const types = read("src/types/navigation.ts");

assert.match(
  types,
  /RESULT_CHECKER/,
  "RESULT_CHECKER role must exist",
);

const migrationFiles = fs
  .readdirSync(path.join(root, "supabase/migrations"))
  .filter((file) => file.endsWith(".sql"))
  .sort();

const migrations = migrationFiles
  .map((file) =>
    read(path.join("supabase/migrations", file)),
  )
  .join("\n");

assert.match(
  migrations,
  /result_checker/,
  "Database must define result_checker role",
);

console.log("PASS: result checker role isolation foundation exists");

// -----------------------------------------------------------------------------
// 7. Current permissions RPC security
// -----------------------------------------------------------------------------

const permissionRpc =
  "supabase/migrations/0005_current_permissions_rpc.sql";

assert.ok(
  exists(permissionRpc),
  "Current permissions RPC migration must exist",
);

const rpcSource = read(permissionRpc);

assert.match(
  rpcSource,
  /security definer/i,
  "Permission RPC must use SECURITY DEFINER",
);

assert.match(
  rpcSource,
  /set search_path\s*=\s*''/i,
  "Permission RPC must use an empty search_path",
);

assert.match(
  rpcSource,
  /revoke execute on function public\.get_current_permissions\(\) from public/i,
  "Permission RPC must revoke PUBLIC execution",
);

assert.match(
  rpcSource,
  /revoke execute on function public\.get_current_permissions\(\) from anon/i,
  "Permission RPC must revoke anonymous execution",
);

assert.match(
  rpcSource,
  /grant execute on function public\.get_current_permissions\(\) to authenticated/i,
  "Permission RPC must grant execution only to authenticated users",
);

assert.match(
  rpcSource,
  /profile\.status\s*=\s*'active'/,
  "Permission RPC must only return permissions for active users",
);

console.log("PASS: current permissions RPC security contract");

// -----------------------------------------------------------------------------
// 8. Invitation privilege boundary
// -----------------------------------------------------------------------------

const actions = authActions;

assert.match(
  actions,
  /users\.manage/,
  "Invitation flow must re-check users.manage",
);

assert.match(
  actions,
  /super_admin/,
  "Invitation flow must understand super_admin authority",
);

assert.doesNotMatch(
  actions,
  /invited_role.*super_admin/,
  "Normal invitation must not permit arbitrary super_admin invitation",
);

console.log("PASS: invitation privilege boundary");

// -----------------------------------------------------------------------------
// 9. Public registration must remain disabled
// -----------------------------------------------------------------------------

assert.doesNotMatch(
  authActions,
  /signUp\s*\(/,
  "Public signUp must not be present in authentication actions",
);

console.log("PASS: public self-registration remains disabled");

// -----------------------------------------------------------------------------
// 10. Password recovery must exist
// -----------------------------------------------------------------------------

assert.match(
  authActions,
  /resetPasswordForEmail/,
  "Password recovery must use Supabase resetPasswordForEmail",
);

assert.match(
  authActions,
  /updateUser/,
  "Password reset must update authenticated user password",
);

console.log("PASS: password recovery foundation exists");

console.log("");
console.log("===== 0.1.7-J J1 SECURITY CONTRACT TEST: PASS =====");
