import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { SchoolBranding } from "@/components/layout/school-branding";
import type { Dictionary } from "@/types/i18n";
import type { Role } from "@/types/navigation";
import type { DatabaseUserStatus } from "@/lib/auth/server";

interface HeaderProps {
  dictionary: Dictionary;
  fullName?: string | null;
  role?: Role;
  status?: DatabaseUserStatus;
}

const ROLE_LABEL_KEYS: Record<Role, keyof Dictionary["roles"]> = {
  SUPER_ADMIN: "superAdmin",
  SCHOOL_ADMINISTRATOR: "schoolAdministrator",
  PRINCIPAL: "principal",
  TEACHER: "teacher",
  ACCOUNTANT: "accountant",
  STUDENT: "student",
  PARENT_GUARDIAN: "parentGuardian",
  RESULT_CHECKER: "resultChecker",
};

export function Header({
  dictionary,
  fullName,
  role,
  status,
}: HeaderProps) {
  const roleLabel = role
    ? dictionary.roles[ROLE_LABEL_KEYS[role]]
    : null;

  const statusLabel = status
    ? status === "active"
      ? dictionary.auth.statusActive
      : status === "pending"
        ? dictionary.auth.statusPending
        : dictionary.auth.statusSuspended
    : null;

  return (
    <header className="site-header">
      <div className="site-header__branding">
        <SchoolBranding />
      </div>

      <div className="site-header__tools">
        <div
          className="header-account"
          aria-label={dictionary.auth.accountName}
        >
          <div className="header-account__identity">
            <span className="header-account__name">
              {fullName ?? dictionary.auth.accountName}
            </span>

            <span className="header-account__meta">
              {roleLabel} · {statusLabel}
            </span>
          </div>

          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
