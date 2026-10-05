import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/config";

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">{dictionary.common.schoolManagementSystem}</p>

        <h1>{dictionary.home.title}</h1>

        <p className="description">{dictionary.home.description}</p>

        <div className="language-links" aria-label={dictionary.common.language}>
          <Link href="/en">English</Link>
          <Link href="/ha">Hausa</Link>
          <Link href="/ar">العربية</Link>
        </div>
      </section>
    </main>
  );
}
