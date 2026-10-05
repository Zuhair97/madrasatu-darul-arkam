import type { Locale } from "@/i18n/config";
import type { NavigationLabels, Role } from "@/types/navigation";
import { Navigation } from "@/components/layout/navigation";

interface SidebarProps {
  locale: Locale;
  role?: Role;
  navigationLabels: NavigationLabels;
}

export function Sidebar({
  locale,
  role,
  navigationLabels,
}: SidebarProps) {
  return (
    <aside className="desktop-sidebar" aria-label="Application sidebar">
      <div className="desktop-sidebar__inner">
        <Navigation
          locale={locale}
          role={role}
          navigationLabels={navigationLabels}
        />
      </div>
    </aside>
  );
}
