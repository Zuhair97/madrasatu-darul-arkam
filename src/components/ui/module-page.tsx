import type { ReactNode } from "react";

interface ModulePageProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export function ModulePage({
  title,
  description,
  children,
}: ModulePageProps) {
  return (
    <section className="module-page" aria-labelledby="module-page-title">
      <div className="module-page__header">
        <div>
          <h1 id="module-page-title" className="module-page__title">
            {title}
          </h1>
          <p className="module-page__description">{description}</p>
        </div>
      </div>

      {children ? (
        <div className="module-page__content">{children}</div>
      ) : null}
    </section>
  );
}
