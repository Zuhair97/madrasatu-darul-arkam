import { ModulePage } from "@/components/ui/module-page";
import { getDictionary } from "@/i18n/get-dictionary";
import { requirePermission } from "@/lib/auth/server";
import type { Locale } from "@/i18n/config";

interface ResultsPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ResultsPage({
  params,
}: ResultsPageProps) {
  const { locale } = await params;
  await requirePermission(locale, "results.view");
  const dictionary = await getDictionary(locale);

  return (
    <ModulePage
      title={dictionary.navigation.results}
      description="Foundation for academic results, review, publication, and the secure result-checking workflow."
    />
  );
}
