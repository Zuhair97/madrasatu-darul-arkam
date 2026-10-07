import type { Locale } from "@/i18n/config";
import type { NavigationLabels, Permission } from "@/types/navigation";
import { Navigation } from "@/components/layout/navigation";

interface SidebarProps {
  locale: Locale;
  permissions?: readonly Permission[];
  navigationLabels: NavigationLabels;
}

export function Sidebar({
  locale,
  permissions,
  navigationLabels,
}: SidebarProps) {
  return (
    <aside className="desktop-sidebar" aria-label="Application sidebar">
      <div className="desktop-sidebar__inner">
        <Navigation
          locale={locale}
          permissions={permissions}
          navigationLabels={navigationLabels}
        />
      </div>
    </aside>
  );
}
