import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { APP_CONFIG } from "@/config/app";
import {
  getDirection,
  isLocale,
  locales,
  type Locale,
} from "@/i18n/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    return {};
  }

  return {
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    alternates: {
      languages: Object.fromEntries(
        locales.map((supportedLocale) => [
          supportedLocale,
          `/${supportedLocale}`,
        ]),
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const direction = getDirection(locale);

  return (
    <div lang={locale} dir={direction} data-locale={locale}>
      {children}
    </div>
  );
}
