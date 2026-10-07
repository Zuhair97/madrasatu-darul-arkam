import { notFound } from "next/navigation";

import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

interface ForbiddenPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ForbiddenPage({
  params,
}: ForbiddenPageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dictionary = await getDictionary(locale);

  return (
    <main className="auth-page">
      <section
        className="auth-card"
        aria-labelledby="forbidden-title"
      >
        <div className="auth-card__header">
          <h1 id="forbidden-title">
            {dictionary.auth.forbiddenTitle}
          </h1>

          <p>{dictionary.auth.forbiddenDescription}</p>
        </div>
      </section>
    </main>
  );
}
