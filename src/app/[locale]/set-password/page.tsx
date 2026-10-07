import { notFound } from "next/navigation";

import { SetPasswordForm } from "@/components/auth/set-password-form";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

interface SetPasswordPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function SetPasswordPage({
  params,
}: SetPasswordPageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dictionary = await getDictionary(locale);

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="set-password-title">
        <div className="auth-card__header">
          <h1 id="set-password-title">
            {dictionary.auth.setPasswordTitle}
          </h1>

          <p>{dictionary.auth.setPasswordDescription}</p>
        </div>

        <SetPasswordForm
          locale={locale}
          dictionary={dictionary}
        />
      </section>
    </main>
  );
}
