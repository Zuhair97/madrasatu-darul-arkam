import Image from "next/image";

export function SchoolBranding() {
  return (
    <div className="school-branding">
      <div className="school-branding__logo">
        <Image
          src="/branding/darul-arkam-logo.png"
          alt="Madrasatu Darul Arkam official logo"
          width={120}
          height={120}
          priority
        />
      </div>

      <div className="school-branding__identity">
        <div className="school-branding__arabic" lang="ar" dir="rtl">
          مدرسة دار الأرقم
        </div>

        <div className="school-branding__name">
          MADRASATU DARUL ARKAM
        </div>

        <div className="school-branding__institution">
          Bayero University Old Campus Central Mosque
        </div>

        <div className="school-branding__contact">
          P.O Box 1234 Kano&nbsp;&nbsp; | &nbsp;&nbsp;Tel: 03094069333
        </div>

        <div className="school-branding__web">
          www.darularkamkano.com&nbsp;&nbsp; | &nbsp;&nbsp;e-mail: infor@darularkamkano.com
        </div>
      </div>
    </div>
  );
}
