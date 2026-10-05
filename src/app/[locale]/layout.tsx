import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  getDirection,
  isLocale,
  locales,
  type Locale,
} from "@/i18n/config";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const direction = getDirection(locale);
  const dictionary = await getDictionary(locale);

  return (
    <div
      lang={locale}
      dir={direction}
      data-locale={locale}
      className="locale-root"
    >
      <AppShell
        locale={locale}
        navigationLabels={dictionary.navigation}
      >
        {children}
      </AppShell>
    </div>
  );
}
