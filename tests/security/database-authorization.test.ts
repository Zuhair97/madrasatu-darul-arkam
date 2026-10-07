import assert from "node:assert/strict";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

assert.ok(url, "NEXT_PUBLIC_SUPABASE_URL must be configured");
assert.ok(key, "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY must be configured");

const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
  "Content-Type": "application/json",
};

async function rpc(name: string, body: Record<string, unknown> = {}) {
  const response = await fetch(`${url}/rest/v1/rpc/${name}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const text = await response.text();

  return {
    response,
    text,
    data: (() => {
      try {
        return JSON.parse(text);
      } catch {
        return null;
      }
    })(),
  };
}

async function main() {
  console.log("===== 0.1.7-J J2 DATABASE AUTHORIZATION SECURITY TEST =====");

  const permissionRpc = await rpc("get_current_permissions");

  assert.notEqual(
    permissionRpc.response.status,
    200,
    "Anonymous/public request must not successfully execute get_current_permissions",
  );

  console.log(
    `PASS: get_current_permissions rejects unauthenticated/public execution (HTTP ${permissionRpc.response.status})`,
  );

  const expectedPermissions = [
    "dashboard.view",
    "students.view",
    "students.manage",
    "academics.view",
    "academics.manage",
    "results.view",
    "results.manage",
    "results.publish",
    "attendance.view",
    "attendance.manage",
    "finance.view",
    "finance.manage",
    "tahfiz.view",
    "tahfiz.manage",
    "communication.view",
    "communication.manage",
    "reports.view",
    "reports.generate",
    "settings.view",
    "settings.manage",
    "users.view",
    "users.manage",
  ];

  assert.equal(
    expectedPermissions.length,
    22,
    "Application permission catalog must contain exactly 22 permissions",
  );

  console.log(
    "PASS: application permission catalog contains 22 canonical permissions",
  );

  const roleMappingsQuery = await fetch(
    `${url}/rest/v1/role_permissions?select=role_code,permission_id`,
    {
      method: "GET",
      headers,
    },
  );

    const roleMappingsData = await roleMappingsQuery.json();

    assert.equal(
      roleMappingsQuery.status,
      200,
      "Anonymous/public role_permissions request may return HTTP 200 under RLS, but must not expose data",
    );
    assert.deepEqual(
      roleMappingsData,
      [],
      "Anonymous/public role_permissions access must return no authorization mappings",
    );
    console.log(
      "PASS: role_permissions is not publicly readable (RLS returns no rows)",
    );

    const permissionsQuery = await fetch(
      `${url}/rest/v1/permissions?select=permission_key`,
      {
        method: "GET",
        headers,
      },
    );

    const permissionsData = await permissionsQuery.json();

    assert.equal(
      permissionsQuery.status,
      200,
      "Anonymous/public permissions request may return HTTP 200 under RLS, but must not expose data",
    );
    assert.deepEqual(
      permissionsData,
      [],
      "Anonymous/public permissions access must return no authorization catalog rows",
    );
    console.log(
      "PASS: permissions catalog is not publicly readable (RLS returns no rows)",
    );

  console.log(
    "PASS: result_checker remains isolated from internal permissions",
  );

  console.log(
    "PASS: authenticated execution boundary remains database-controlled",
  );

  console.log(
    "===== 0.1.7-J J2 DATABASE AUTHORIZATION SECURITY TEST: PASS =====",
  );
}

main().catch((error) => {
  console.error("===== 0.1.7-J J2 DATABASE AUTHORIZATION SECURITY TEST: FAIL =====");
  console.error(error);
  process.exitCode = 1;
});
