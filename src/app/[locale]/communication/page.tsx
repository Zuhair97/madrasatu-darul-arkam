import { ModulePage } from "@/components/ui/module-page";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

interface CommunicationPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function CommunicationPage({
  params,
}: CommunicationPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <ModulePage
      title={dictionary.navigation.communication}
      description="Foundation for structured communication between authorized school users and stakeholders."
    />
  );
}
