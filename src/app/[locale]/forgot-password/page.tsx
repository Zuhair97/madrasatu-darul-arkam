import { notFound } from "next/navigation";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

interface ForgotPasswordPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ForgotPasswordPage({
  params,
}: ForgotPasswordPageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-card__header">
          <p className="eyebrow">
            {dictionary.common.schoolManagementSystem}
          </p>

          <h1>{dictionary.auth.forgotPasswordTitle}</h1>

          <p className="description">
            {dictionary.auth.forgotPasswordDescription}
          </p>
        </div>

        <ForgotPasswordForm
          locale={locale}
          initialState={{
            error: null,
            success: false,
          }}
          labels={{
            email: dictionary.auth.email,
            submit: dictionary.auth.sendResetLink,
            submitting: dictionary.auth.sendingResetLink,
            backToLogin: dictionary.auth.backToLogin,
            success: dictionary.auth.resetRequestSuccess,
          }}
        />
      </section>
    </main>
  );
}
