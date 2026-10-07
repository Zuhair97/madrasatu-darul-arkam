import { notFound } from "next/navigation";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

interface ResetPasswordPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ResetPasswordPage({
  params,
}: ResetPasswordPageProps) {
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

        <ResetPasswordForm
          locale={locale}
          initialState={{
            error: null,
            success: false,
          }}
          labels={{
            password: dictionary.auth.newPassword,
            confirmPassword: dictionary.auth.confirmPassword,
            updatePassword: dictionary.auth.updatePassword,
            updatingPassword: dictionary.auth.updatingPassword,
            showPassword: dictionary.auth.showPassword,
            hidePassword: dictionary.auth.hidePassword,
            success: dictionary.auth.passwordUpdateSuccess,
            invalidSession: dictionary.auth.invalidResetSession,
            checkingSession: dictionary.auth.checkingSession,
            backToLogin: dictionary.auth.backToLogin,
          }}
        />
      </section>
    </main>
  );
}
