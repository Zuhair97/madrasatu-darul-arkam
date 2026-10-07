import { ModulePage } from "@/components/ui/module-page";
import { getDictionary } from "@/i18n/get-dictionary";
import { requireActiveUser } from "@/lib/auth/server";
import type { Locale } from "@/i18n/config";

interface AttendancePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function AttendancePage({
  params,
}: AttendancePageProps) {
  const { locale } = await params;
  await requireActiveUser(locale);
  const dictionary = await getDictionary(locale);

  return (
    <ModulePage
      title={dictionary.navigation.attendance}
      description="Foundation for student and staff attendance management and attendance records."
    />
  );
}
