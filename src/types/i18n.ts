import type { Locale } from "@/i18n/config";

export type Direction = "ltr" | "rtl";

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

export interface RoleLabels {
  superAdmin: string;
  schoolAdministrator: string;
  principal: string;
  teacher: string;
  accountant: string;
  student: string;
  parentGuardian: string;
  resultChecker: string;
}

export interface Dictionary {
  common: {
    appName: string;
    schoolManagementSystem: string;
    welcome: string;
    dashboard: string;
    language: string;
  };

  home: {
    title: string;
    description: string;
  };

  auth: {
    loginTitle: string;
    loginDescription: string;
    email: string;
    password: string;
    login: string;
    loggingIn: string;
    forgotPassword: string;
    showPassword: string;
    hidePassword: string;
  };
  navigation: NavigationLabels;

  roles: RoleLabels;
}

export interface LocaleMetadata {
  locale: Locale;
  direction: Direction;
}
