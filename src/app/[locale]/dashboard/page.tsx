import { ModulePage } from "@/components/ui/module-page";
import { getDictionary } from "@/i18n/get-dictionary";
import { requireActiveUser } from "@/lib/auth/server";
import type { Locale } from "@/i18n/config";

interface DashboardPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function DashboardPage({
  params,
}: DashboardPageProps) {
  const { locale } = await params;
  await requireActiveUser(locale);
  const dictionary = await getDictionary(locale);

  return (
    <ModulePage
      title={dictionary.navigation.dashboard}
      description="Central entry point for authorized school management activities."
    />
  );
}
