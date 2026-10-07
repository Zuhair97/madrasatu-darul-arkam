import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import type { Locale } from "@/i18n/config";
import type { NavigationLabels, Role } from "@/types/navigation";
import type { Dictionary } from "@/types/i18n";
import type { DatabaseUserStatus } from "@/lib/auth/server";

interface AppShellProps {
  locale: Locale;
  children: ReactNode;
  navigationLabels: NavigationLabels;
  dictionary: Dictionary;
  fullName?: string | null;
  role?: Role;
  status?: DatabaseUserStatus;
}

export function AppShell({
  locale,
  children,
  navigationLabels,
  dictionary,
  fullName,
  role,
  status,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <Header
        dictionary={dictionary}
        fullName={fullName}
        role={role}
        status={status}
      />

      <div className="app-shell__body">
        <Sidebar
          locale={locale}
          role={role}
          navigationLabels={navigationLabels}
        />

        <main className="app-shell__main">
          <div className="mobile-nav__bar">
            <MobileNav
                  locale={locale}
              role={role}
              navigationLabels={navigationLabels}
            />
          </div>

          <div className="app-shell__content">{children}</div>
        </main>
      </div>
    </div>
  );
}
