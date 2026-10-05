import { ModulePage } from "@/components/ui/module-page";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

interface TahfizPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function TahfizPage({
  params,
}: TahfizPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <ModulePage
      title={dictionary.navigation.tahfiz}
      description="Foundation for Tahfiz, Qur'an memorization, Islamic education, and related academic records."
    />
  );
}
