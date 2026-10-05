import type { Locale } from "@/i18n/config";

export type Direction = "ltr" | "rtl";

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
}

export interface LocaleMetadata {
  locale: Locale;
  direction: Direction;
}
