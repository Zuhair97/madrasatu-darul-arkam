import { UiGalleryClient } from "./ui-gallery-client";
import { requireActiveUser } from "@/lib/auth/server";
import type { Locale } from "@/i18n/config";

interface UiGalleryPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function UiGalleryPage({ params }: UiGalleryPageProps) {
  const { locale } = await params;
  await requireActiveUser(locale);

  return <UiGalleryClient locale={locale} />;
}
