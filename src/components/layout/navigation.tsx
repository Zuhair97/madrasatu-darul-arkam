import Link from "next/link";
import { NAVIGATION_ITEMS } from "@/config/navigation";
import type { Locale } from "@/i18n/config";
import type {
  NavigationIcon,
  NavigationLabels,
  Permission,
} from "@/types/navigation";

interface NavigationProps {
  locale: Locale;
  permissions?: readonly Permission[];
  navigationLabels: NavigationLabels;
  onNavigate?: () => void;
}

const ICON_PATHS: Record<NavigationIcon, string> = {
  dashboard:
    "M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z",
  students:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  academics:
    "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z",
  results:
    "M4 4h16v16H4V4Zm4 8 2.5 2.5L16 9",
  attendance:
    "M7 3v4M17 3v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm3 9 2 2 4-4",
  finance:
    "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7",
  tahfiz:
    "M5 4h14a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Zm0 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14M9 8h7M9 12h7",
  communication:
    "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 8.7 3.9a8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z",
  reports:
    "M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14M4 19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M8 7h8M8 11h8M8 15h5",
  settings:
    "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8.94-3.5a7.95 7.95 0 0 0-.1-1.25l2-1.55-2-3.46-2.38.96a8.06 8.06 0 0 0-2.16-1.25L15.95 3h-4l-.36 2.45a8.06 8.06 0 0 0-2.16 1.25l-2.38-.96-2 3.46 2 1.55a7.95 7.95 0 0 0-.1 1.25l-2 1.55 2 3.46 2.38-.96a8.06 8.06 0 0 0 2.16 1.25L11.95 21h4l.36-2.45a8.06 8.06 0 0 0 2.16-1.25l2.38.96 2-3.46-2-1.55c.07-.41.1-.83.1-1.25Z",
};

function NavigationIconView({ icon }: { icon: NavigationIcon }) {
  return (
    <svg
      className="navigation-item__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICON_PATHS[icon]} />
    </svg>
  );
}

export function Navigation({
  locale,
  permissions = [],
  navigationLabels,
  onNavigate,
}: NavigationProps) {
  const permissionSet = new Set(permissions);

  const items = NAVIGATION_ITEMS.filter((item) => {
    if (!item.permission) {
      return true;
    }

    return permissionSet.has(item.permission);
  });

  return (
    <nav className="main-navigation" aria-label="Main navigation">
      <ul className="main-navigation__list">
        {items.map((item) => (
          <li key={item.id} className="main-navigation__item">
            <Link
              href={`/${locale}${item.href}`}
              className="navigation-item"
              onClick={onNavigate}
            >
              <NavigationIconView icon={item.icon} />
              <span>{navigationLabels[item.id]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
