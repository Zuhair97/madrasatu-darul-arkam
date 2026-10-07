import { ModulePage } from "@/components/ui/module-page";
import { getDictionary } from "@/i18n/get-dictionary";
import { requireActiveUser } from "@/lib/auth/server";
import type { Locale } from "@/i18n/config";

interface StudentsPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function StudentsPage({
  params,
}: StudentsPageProps) {
  const { locale } = await params;
  await requireActiveUser(locale);
  const dictionary = await getDictionary(locale);

  return (
    <ModulePage
      title={dictionary.navigation.students}
      description="Foundation for student records, profiles, enrollment, and student management."
    />
  );
}
