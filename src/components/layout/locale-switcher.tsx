"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";

const localeLabels: Record<Locale, string> = {
  en: "English",
  ha: "Hausa",
  ar: "العربية",
};

export function LocaleSwitcher() {
  const pathname = usePathname();

  const segments = pathname.split("/");
  const firstSegment = segments[1] ?? "";

  const currentLocale = isLocale(firstSegment)
    ? firstSegment
    : defaultLocale;

  const remainingPath = isLocale(firstSegment)
    ? `/${segments.slice(2).join("/")}`.replace(/\/+$/, "") || "/"
    : pathname;

  return (
    <nav
      className="locale-switcher"
      aria-label="Language selection"
      dir="ltr"
    >
      {locales.map((locale) => {
        const targetPath =
          remainingPath === "/"
            ? `/${locale}`
            : `/${locale}${remainingPath}`;

        const isCurrent = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={targetPath}
            className={`locale-switcher__link${
              isCurrent ? " locale-switcher__link--active" : ""
            }`}
            aria-current={isCurrent ? "page" : undefined}
          >
            {localeLabels[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
