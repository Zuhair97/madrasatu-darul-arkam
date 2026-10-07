import type {
  NavigationItem,
  Permission,
  Role,
  RoleDefinition,
} from "@/types/navigation";

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  {
    id: "dashboard",
    href: "/dashboard",
    icon: "dashboard",
    labelKey: "navigation.dashboard",
    permission: "dashboard.view",
  },
  {
    id: "students",
    href: "/students",
    icon: "students",
    labelKey: "navigation.students",
    permission: "students.view",
  },
  {
    id: "academics",
    href: "/academics",
    icon: "academics",
    labelKey: "navigation.academics",
    permission: "academics.view",
  },
  {
    id: "results",
    href: "/results",
    icon: "results",
    labelKey: "navigation.results",
    permission: "results.view",
  },
  {
    id: "attendance",
    href: "/attendance",
    icon: "attendance",
    labelKey: "navigation.attendance",
    permission: "attendance.view",
  },
  {
    id: "finance",
    href: "/finance",
    icon: "finance",
    labelKey: "navigation.finance",
    permission: "finance.view",
  },
  {
    id: "tahfiz",
    href: "/tahfiz",
    icon: "tahfiz",
    labelKey: "navigation.tahfiz",
    permission: "tahfiz.view",
  },
  {
    id: "communication",
    href: "/communication",
    icon: "communication",
    labelKey: "navigation.communication",
    permission: "communication.view",
  },
  {
    id: "reports",
    href: "/reports",
    icon: "reports",
    labelKey: "navigation.reports",
    permission: "reports.view",
  },
  {
    id: "settings",
    href: "/settings",
    icon: "settings",
    labelKey: "navigation.settings",
    permission: "settings.view",
  },
];

const ALL_PERMISSIONS: readonly Permission[] = [
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

export const ROLE_DEFINITIONS: readonly RoleDefinition[] = [
  {
    role: "SUPER_ADMIN",
    labelKey: "roles.superAdmin",
    permissions: ALL_PERMISSIONS,
  },
  {
    role: "SCHOOL_ADMINISTRATOR",
    labelKey: "roles.schoolAdministrator",
    permissions: ALL_PERMISSIONS,
  },
  {
    role: "PRINCIPAL",
    labelKey: "roles.principal",
    permissions: [
      "dashboard.view",
      "students.view",
      "academics.view",
      "results.view",
      "results.publish",
      "attendance.view",
      "finance.view",
      "tahfiz.view",
      "communication.view",
      "reports.view",
      "reports.generate",
    ],
  },
  {
    role: "TEACHER",
    labelKey: "roles.teacher",
    permissions: [
      "dashboard.view",
      "students.view",
      "academics.view",
      "academics.manage",
      "results.view",
      "results.manage",
      "attendance.view",
      "attendance.manage",
      "tahfiz.view",
      "tahfiz.manage",
      "communication.view",
    ],
  },
  {
    role: "ACCOUNTANT",
    labelKey: "roles.accountant",
    permissions: [
      "dashboard.view",
      "students.view",
      "finance.view",
      "finance.manage",
      "reports.view",
      "reports.generate",
    ],
  },
  {
    role: "STUDENT",
    labelKey: "roles.student",
    permissions: [
      "dashboard.view",
      "academics.view",
      "results.view",
      "attendance.view",
      "tahfiz.view",
      "communication.view",
    ],
  },
  {
    role: "PARENT_GUARDIAN",
    labelKey: "roles.parentGuardian",
    permissions: [
      "dashboard.view",
      "students.view",
      "academics.view",
      "results.view",
      "attendance.view",
      "finance.view",
      "tahfiz.view",
      "communication.view",
    ],
  },
  {
    role: "RESULT_CHECKER",
    labelKey: "roles.resultChecker",
    permissions: [],
  },
];

export function getRoleDefinition(role: Role): RoleDefinition | undefined {
  return ROLE_DEFINITIONS.find((definition) => definition.role === role);
}

export function hasPermission(
  role: Role,
  permission: Permission,
): boolean {
  return getRoleDefinition(role)?.permissions.includes(permission) ?? false;
}

export function getVisibleNavigation(
  role: Role,
): readonly NavigationItem[] {
  return NAVIGATION_ITEMS.filter((item) => {
    if (!item.permission) {
      return true;
    }

    return hasPermission(role, item.permission);
  });
}
