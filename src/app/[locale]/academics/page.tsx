import { ModulePage } from "@/components/ui/module-page";
import { getDictionary } from "@/i18n/get-dictionary";
import { requireActiveUser } from "@/lib/auth/server";
import type { Locale } from "@/i18n/config";

interface AcademicsPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function AcademicsPage({
  params,
}: AcademicsPageProps) {
  const { locale } = await params;
  await requireActiveUser(locale);
  const dictionary = await getDictionary(locale);

  return (
    <ModulePage
      title={dictionary.navigation.academics}
      description="Foundation for classes, subjects, academic structure, and teaching workflows."
    />
  );
}
