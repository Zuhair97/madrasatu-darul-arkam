import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { getCurrentUser } from "@/lib/auth/server";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LoginPage({
  params,
}: LoginPageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const user = await getCurrentUser();

  if (user) {
    redirect(`/${locale}/dashboard`);
  }

  const dictionary = getDictionary(locale);

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-card__header">
          <p className="eyebrow">
            {dictionary.common.schoolManagementSystem}
          </p>

          <h1>{dictionary.auth.loginTitle}</h1>

          <p className="description">
            {dictionary.auth.loginDescription}
          </p>
        </div>

        <LoginForm
          locale={locale}
          initialState={{ error: null }}
          labels={{
            email: dictionary.auth.email,
            password: dictionary.auth.password,
            login: dictionary.auth.login,
            loggingIn: dictionary.auth.loggingIn,
            forgotPassword: dictionary.auth.forgotPassword,
            showPassword: dictionary.auth.showPassword,
            hidePassword: dictionary.auth.hidePassword,
          }}
        />
      </section>
    </main>
  );
}
