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
    setPasswordTitle: string;
    setPasswordDescription: string;
    setPassword: string;
    settingPassword: string;
    passwordSetSuccess: string;
    invitationSessionInvalid: string;
    checkingInvitationSession: string;
  forbiddenTitle: string;
  forbiddenDescription: string;
  accountStatusTitle: string;
  accountStatusDescription: string;
  contactAdministrator: string;
    inviteUserTitle: string;
    inviteUserDescription: string;
    fullName: string;
    role: string;
    selectRole: string;
    inviteUser: string;
    invitingUser: string;
    invitationSent: string;
    invitationError: string;
    users: string;
    manageUsers: string;
    roleSchoolAdministrator: string;
    rolePrincipal: string;
    roleTeacher: string;
    roleAccountant: string;
    roleStudent: string;
    roleParentGuardian: string;
    roleResultChecker: string;
    forgotPasswordTitle: string;
    forgotPasswordDescription: string;
    sendResetLink: string;
    sendingResetLink: string;
    backToLogin: string;
    resetRequestSuccess: string;
    newPassword: string;
    confirmPassword: string;
    updatePassword: string;
    updatingPassword: string;
    passwordUpdateSuccess: string;
    invalidResetSession: string;
    checkingSession: string;
    accountName: string;
    accountRole: string;
    accountStatus: string;
    statusActive: string;
    statusPending: string;
    statusSuspended: string;
    logout: string;
    loggingOut: string;
  };
  navigation: NavigationLabels;

  roles: RoleLabels;
}

export interface LocaleMetadata {
  locale: Locale;
  direction: Direction;
}
