import { ModulePage } from "@/components/ui/module-page";
import { getDictionary } from "@/i18n/get-dictionary";
import { requireActiveUser } from "@/lib/auth/server";
import type { Locale } from "@/i18n/config";

interface SettingsPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function SettingsPage({
  params,
}: SettingsPageProps) {
  const { locale } = await params;
  await requireActiveUser(locale);
  const dictionary = await getDictionary(locale);

  return (
    <ModulePage
      title={dictionary.navigation.settings}
      description="Foundation for authorized application, school, user, and system configuration."
    />
  );
}
