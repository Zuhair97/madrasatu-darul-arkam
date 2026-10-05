import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <main className="app-shell">
      <section className="status-card">
        <h1>404</h1>
        <p>The requested page could not be found.</p>
        <Link href="/en">Return to home</Link>
      </section>
    </main>
  );
}
