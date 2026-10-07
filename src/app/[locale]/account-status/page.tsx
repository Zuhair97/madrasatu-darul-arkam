import { notFound, redirect } from "next/navigation";

import { getCurrentAuthContext } from "@/lib/auth/server";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

interface AccountStatusPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function AccountStatusPage({
  params,
}: AccountStatusPageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const context = await getCurrentAuthContext();

  if (!context) {
    redirect(`/${locale}/login`);
  }

  const dictionary = await getDictionary(locale);

  return (
    <main className="auth-page">
      <section
        className="auth-card"
        aria-labelledby="account-status-title"
      >
        <div className="auth-card__header">
          <h1 id="account-status-title">
            {dictionary.auth.accountStatusTitle}
          </h1>

          <p>{dictionary.auth.accountStatusDescription}</p>

          <p className="auth-form__status">
            {dictionary.auth.contactAdministrator}
          </p>
        </div>
      </section>
    </main>
  );
}
