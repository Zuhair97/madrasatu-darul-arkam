import { notFound } from "next/navigation";

import { InviteUserForm } from "@/components/auth/invite-user-form";
import { getDictionary } from "@/i18n/get-dictionary";
import { requirePermission } from "@/lib/auth/server";
import { isLocale, type Locale } from "@/i18n/config";

interface InviteUserPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function InviteUserPage({
  params,
}: InviteUserPageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  await requirePermission(locale, "users.manage");

  const dictionary = await getDictionary(locale);

  return (
    <main className="auth-page">
      <section
        className="auth-card"
        aria-labelledby="invite-user-title"
      >
        <div className="auth-card__header">
          <h1 id="invite-user-title">
            {dictionary.auth.inviteUserTitle}
          </h1>

          <p>{dictionary.auth.inviteUserDescription}</p>
        </div>

        <InviteUserForm
          locale={locale}
          dictionary={dictionary}
        />
      </section>
    </main>
  );
}
