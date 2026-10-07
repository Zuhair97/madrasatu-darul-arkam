export const ROLES = [
  "SUPER_ADMIN",
  "SCHOOL_ADMINISTRATOR",
  "PRINCIPAL",
  "TEACHER",
  "ACCOUNTANT",
  "STUDENT",
  "PARENT_GUARDIAN",
  "RESULT_CHECKER",
] as const;

export type Role = (typeof ROLES)[number];

export const PERMISSIONS = [
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
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export type NavigationId =
  | "dashboard"
  | "students"
  | "academics"
  | "results"
  | "attendance"
  | "finance"
  | "tahfiz"
  | "communication"
  | "reports"
  | "settings";

export type NavigationIcon = NavigationId;

export interface NavigationLabels {
  dashboard: string;
  students: string;
  academics: string;
  results: string;
  attendance: string;
  finance: string;
  tahfiz: string;
  communication: string;
  reports: string;
  settings: string;
}

export interface NavigationItem {
  id: NavigationId;
  href: string;
  icon: NavigationIcon;
  labelKey: string;
  permission?: Permission;
  roles?: readonly Role[];
}

export interface RoleDefinition {
  role: Role;
  labelKey: string;
  permissions: readonly Permission[];
}
