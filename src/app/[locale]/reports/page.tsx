import { ModulePage } from "@/components/ui/module-page";
import { getDictionary } from "@/i18n/get-dictionary";
import { requireActiveUser } from "@/lib/auth/server";
import type { Locale } from "@/i18n/config";

interface ReportsPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ReportsPage({
  params,
}: ReportsPageProps) {
  const { locale } = await params;
  await requireActiveUser(locale);
  const dictionary = await getDictionary(locale);

  return (
    <ModulePage
      title={dictionary.navigation.reports}
      description="Foundation for operational, academic, financial, and administrative reporting."
    />
  );
}
