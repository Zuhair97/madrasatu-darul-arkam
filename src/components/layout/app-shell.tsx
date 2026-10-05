import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import type { Locale } from "@/i18n/config";
import type { NavigationLabels, Role } from "@/types/navigation";

interface AppShellProps {
  locale: Locale;
  children: ReactNode;
  navigationLabels: NavigationLabels;
  role?: Role;
}

export function AppShell({
  locale,
  children,
  navigationLabels,
  role,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <Header />

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
