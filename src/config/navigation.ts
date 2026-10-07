import type { NavigationItem } from "@/types/navigation";

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
