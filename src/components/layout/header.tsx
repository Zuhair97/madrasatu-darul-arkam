import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { SchoolBranding } from "@/components/layout/school-branding";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__branding">
        <SchoolBranding />
      </div>

      <div className="site-header__tools">
        <LocaleSwitcher />
      </div>
    </header>
  );
}
