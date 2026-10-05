import { defaultLocale, locales } from "@/i18n/config";

export const APP_CONFIG = {
  name: "Madrasatu Darul Arkam",
  shortName: "Darul Arkam",
  description:
    "School Management Information System for Madrasatu Darul Arkam.",
  defaultLocale,
  supportedLocales: locales,
} as const;
