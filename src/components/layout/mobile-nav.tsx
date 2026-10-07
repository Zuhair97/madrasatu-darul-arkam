"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { NavigationLabels, Permission } from "@/types/navigation";
import { Navigation } from "@/components/layout/navigation";

interface MobileNavProps {
  locale: Locale;
  permissions?: readonly Permission[];
  navigationLabels: NavigationLabels;
}

export function MobileNav({
  locale,
  permissions,
  navigationLabels,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="mobile-nav__trigger"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>

      {open ? (
        <div
          className="mobile-nav__overlay"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <aside
            id="mobile-navigation-panel"
            className="mobile-nav__panel"
            aria-label="Mobile navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mobile-nav__header">
              <span className="mobile-nav__title">
                Madrasatu Darul Arkam
              </span>

              <button
                type="button"
                className="mobile-nav__close"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>

            <Navigation
              locale={locale}
              permissions={permissions}
              navigationLabels={navigationLabels}
              onNavigate={() => setOpen(false)}
            />
          </aside>
        </div>
      ) : null}
    </>
  );
}
