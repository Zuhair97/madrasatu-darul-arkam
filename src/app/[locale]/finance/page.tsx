import { ModulePage } from "@/components/ui/module-page";
import { getDictionary } from "@/i18n/get-dictionary";
import { requireActiveUser } from "@/lib/auth/server";
import type { Locale } from "@/i18n/config";

interface FinancePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function FinancePage({
  params,
}: FinancePageProps) {
  const { locale } = await params;
  await requireActiveUser(locale);
  const dictionary = await getDictionary(locale);

  return (
    <ModulePage
      title={dictionary.navigation.finance}
      description="Foundation for school financial records, fees, transactions, and financial reporting."
    />
  );
}
