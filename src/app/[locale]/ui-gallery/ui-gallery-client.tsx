"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";

type GalleryTab = "components" | "modules";

const copy = {
  en: {
    eyebrow: "DESIGN REFERENCE",
    title: "UI & School Modules Gallery",
    description: "A reference for interface components and school module layouts. Examples below use sample data and do not perform school-record operations.",
    components: "UI Components",
    modules: "School Modules",
    sample: "SAMPLE PREVIEW",
    sampleNotice: "Illustrative examples only — these controls do not save or modify school records.",
    buttons: "Buttons and links",
    primary: "Primary action",
    secondary: "Secondary action",
    badges: "Status badges",
    active: "Active",
    pending: "Pending",
    suspended: "Suspended",
    alerts: "Alerts and feedback",
    info: "Information: this is an informational message.",
    success: "Success: example operation completed locally.",
    warning: "Warning: verify information before continuing.",
    error: "Error: an example validation issue.",
    fields: "Form controls",
    fullName: "Full name",
    email: "Email address",
    chooseRole: "Choose a role",
    teacher: "Teacher",
    accountant: "Accountant",
    administrator: "School administrator",
    accept: "I confirm these are sample details.",
    validation: "Example validation: enter a name and a valid email address.",
    check: "Check example form",
    tableTitle: "Example data table",
    student: "Student",
    className: "Class",
    status: "Status",
    action: "Action",
    sampleStudent1: "Sample Student A",
    sampleStudent2: "Sample Student B",
    sampleStudent3: "Sample Student C",
    grade1: "JSS 1",
    grade2: "JSS 2",
    grade3: "SSS 1",
    view: "View",
    states: "Interface states",
    empty: "Empty state",
    emptyText: "No sample records to display.",
    loading: "Loading state",
    loadingText: "Example loading indicator — no request is running.",
    failure: "Error state",
    failureText: "Example error message with a recovery suggestion.",
    moduleTitle: "School module previews",
    moduleDescription: "These are layout references, not claims that every workflow is implemented.",
    search: "Filter modules",
    searchPlaceholder: "Search school modules…",
    dashboard: "Dashboard",
    students: "Students",
    academics: "Academics",
    attendance: "Attendance",
    results: "Results",
    reports: "Reports",
    finance: "Finance",
    tahfiz: "Tahfiz / Islamic Education",
    communication: "Communication",
    settings: "Settings",
    users: "User management",
    overview: "Overview",
    exampleMetrics: "Illustrative metrics",
    records: "Sample records",
    attendanceRate: "Attendance rate",
    pendingTasks: "Pending tasks",
    exampleOnly: "Sample layout",
    noMatches: "No modules match this search.",
    note: "Data integrity note",
    noteText: "Real operations must use server-side authorization, validated inputs, and the approved database workflows. This gallery does not connect to or change the database.",
  },
  ha: {
    eyebrow: "MISALIN TSARIN ZANE",
    title: "Gidan Nuna UI da Sassan Makaranta",
    description: "Wurin duba abubuwan haɗin fuska da tsarin sassan makaranta. Bayanan da ke ƙasa na misali ne; ba sa aiwatar da ayyukan bayanan makaranta.",
    components: "Abubuwan UI",
    modules: "Sassan Makaranta",
    sample: "MISALIN NUNA",
    sampleNotice: "Misalai ne kawai — waɗannan sarrafawa ba sa adana ko sauya bayanan makaranta.",
    buttons: "Maɓallai da hanyoyin haɗi",
    primary: "Babban aiki",
    secondary: "Aiki na biyu",
    badges: "Alamomin matsayi",
    active: "Aiki",
    pending: "Ana jira",
    suspended: "An dakatar",
    alerts: "Saƙonnin sanarwa",
    info: "Bayani: wannan saƙon sanarwa ne.",
    success: "An yi nasara: an kammala misalin aiki a nan.",
    warning: "Gargaɗi: tabbatar da bayanai kafin ci gaba.",
    error: "Kuskure: an nuna matsalar tantancewa ta misali.",
    fields: "Filayen fom",
    fullName: "Cikakken suna",
    email: "Adireshin imel",
    chooseRole: "Zaɓi matsayi",
    teacher: "Malami",
    accountant: "Akanta",
    administrator: "Mai kula da makaranta",
    accept: "Na tabbatar waɗannan bayanan misali ne.",
    validation: "Misalin tantancewa: shigar da suna da ingantaccen imel.",
    check: "Duba fom ɗin misali",
    tableTitle: "Teburin bayanan misali",
    student: "Ɗalibi",
    className: "Ajin karatu",
    status: "Matsayi",
    action: "Aiki",
    sampleStudent1: "Ɗalibin Misali A",
    sampleStudent2: "Ɗalibin Misali B",
    sampleStudent3: "Ɗalibin Misali C",
    grade1: "JSS 1",
    grade2: "JSS 2",
    grade3: "SSS 1",
    view: "Duba",
    states: "Yanayin fuska",
    empty: "Babu bayanai",
    emptyText: "Babu bayanan misali da za a nuna.",
    loading: "Yanayin lodawa",
    loadingText: "Alamar lodawa ta misali ce — babu buƙatar sadarwa da ke gudana.",
    failure: "Yanayin kuskure",
    failureText: "Saƙon kuskure na misali tare da shawarar gyara.",
    moduleTitle: "Misalan sassan makaranta",
    moduleDescription: "Waɗannan misalan tsarin fuska ne; ba hujja ba ce cewa an kammala dukkan ayyukan.",
    search: "Tace sassan",
    searchPlaceholder: "Nemo sassan makaranta…",
    dashboard: "Allon taƙaitawa",
    students: "Dalibai",
    academics: "Tsarin karatu",
    attendance: "Halartar makaranta",
    results: "Sakamakon karatu",
    reports: "Rahotanni",
    finance: "Kuɗaɗe",
    tahfiz: "Tahfiz / Ilimin Musulunci",
    communication: "Sadarwa",
    settings: "Saituna",
    users: "Gudanar da masu amfani",
    overview: "Taƙaitaccen bayani",
    exampleMetrics: "Ma'aunai na misali",
    records: "Bayanan misali",
    attendanceRate: "Adadin halarta",
    pendingTasks: "Ayyukan da ake jira",
    exampleOnly: "Tsarin misali",
    noMatches: "Ba a sami sashen da ya dace da wannan bincike ba.",
    note: "Muhimmancin ingancin bayanai",
    noteText: "Ayyukan gaske dole su yi amfani da izinin uwar garke, tantance bayanai, da hanyoyin bayanai da aka amince da su. Wannan gallery ba ya haɗuwa da rumbun bayanai ko sauya shi.",
  },
  ar: {
    eyebrow: "مرجع التصميم",
    title: "معرض واجهات المستخدم ووحدات المدرسة",
    description: "مرجع لمكونات الواجهة وتخطيطات وحدات المدرسة. البيانات أدناه تجريبية ولا تنفذ عمليات على سجلات المدرسة.",
    components: "مكونات الواجهة",
    modules: "وحدات المدرسة",
    sample: "معاينة توضيحية",
    sampleNotice: "أمثلة توضيحية فقط — هذه العناصر لا تحفظ سجلات المدرسة ولا تعدلها.",
    buttons: "الأزرار والروابط",
    primary: "إجراء أساسي",
    secondary: "إجراء ثانوي",
    badges: "شارات الحالة",
    active: "نشط",
    pending: "قيد الانتظار",
    suspended: "موقوف",
    alerts: "التنبيهات والرسائل",
    info: "معلومات: هذه رسالة توضيحية.",
    success: "نجاح: اكتمل الإجراء التجريبي محلياً.",
    warning: "تحذير: تحقق من المعلومات قبل المتابعة.",
    error: "خطأ: مثال على مشكلة في التحقق.",
    fields: "حقول النموذج",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    chooseRole: "اختر الدور",
    teacher: "معلم",
    accountant: "محاسب",
    administrator: "مسؤول المدرسة",
    accept: "أؤكد أن هذه بيانات تجريبية.",
    validation: "تحقق توضيحي: أدخل اسماً وبريداً إلكترونياً صالحاً.",
    check: "تحقق من النموذج التجريبي",
    tableTitle: "جدول بيانات توضيحي",
    student: "الطالب",
    className: "الفصل",
    status: "الحالة",
    action: "الإجراء",
    sampleStudent1: "طالب تجريبي أ",
    sampleStudent2: "طالب تجريبي ب",
    sampleStudent3: "طالب تجريبي ج",
    grade1: "JSS 1",
    grade2: "JSS 2",
    grade3: "SSS 1",
    view: "عرض",
    states: "حالات الواجهة",
    empty: "حالة فارغة",
    emptyText: "لا توجد سجلات تجريبية للعرض.",
    loading: "حالة التحميل",
    loadingText: "مؤشر تحميل توضيحي — لا يوجد طلب جارٍ.",
    failure: "حالة الخطأ",
    failureText: "رسالة خطأ توضيحية مع اقتراح للتعافي.",
    moduleTitle: "معاينات وحدات المدرسة",
    moduleDescription: "هذه مراجع للتخطيط وليست دليلاً على تنفيذ جميع الإجراءات.",
    search: "تصفية الوحدات",
    searchPlaceholder: "ابحث عن وحدات المدرسة…",
    dashboard: "لوحة المعلومات",
    students: "الطلاب",
    academics: "الشؤون الأكاديمية",
    attendance: "الحضور",
    results: "النتائج",
    reports: "التقارير",
    finance: "المالية",
    tahfiz: "التحفيظ / التعليم الإسلامي",
    communication: "التواصل",
    settings: "الإعدادات",
    users: "إدارة المستخدمين",
    overview: "نظرة عامة",
    exampleMetrics: "مؤشرات توضيحية",
    records: "سجلات تجريبية",
    attendanceRate: "معدل الحضور",
    pendingTasks: "المهام المعلقة",
    exampleOnly: "تخطيط توضيحي",
    noMatches: "لا توجد وحدات تطابق البحث.",
    note: "سلامة البيانات",
    noteText: "يجب أن تستخدم العمليات الفعلية تفويضاً على الخادم ومدخلات تم التحقق منها ومسارات قاعدة البيانات المعتمدة. هذا المعرض لا يتصل بقاعدة البيانات ولا يغيرها.",
  },
} as const;

const moduleKeys = [
  "dashboard",
  "students",
  "academics",
  "attendance",
  "results",
  "reports",
  "finance",
  "tahfiz",
  "communication",
  "settings",
  "users",
] as const;

export function UiGalleryClient({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [tab, setTab] = useState<GalleryTab>("components");
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const filteredModules = useMemo(
    () =>
      moduleKeys.filter((key) =>
        t[key].toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
      ),
    [query, t],
  );

  const validExample = name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <main className="ui-gallery">
      <header className="ui-gallery__hero">
        <div>
          <p className="ui-gallery__eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="ui-gallery__description">{t.description}</p>
        </div>
        <span className="ui-gallery__sample-tag">{t.sample}</span>
      </header>

      <div className="ui-gallery__notice" role="note">
        <strong>{t.sampleNotice}</strong>
      </div>

      <div className="ui-gallery__tabs" role="tablist" aria-label={t.title}>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "components"}
          className={tab === "components" ? "is-active" : ""}
          onClick={() => setTab("components")}
        >
          {t.components}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "modules"}
          className={tab === "modules" ? "is-active" : ""}
          onClick={() => setTab("modules")}
        >
          {t.modules}
        </button>
      </div>

      {tab === "components" ? (
        <div className="ui-gallery__sections">
          <section className="ui-gallery__panel">
            <h2>{t.buttons}</h2>
            <div className="ui-gallery__example-row">
              <button type="button" className="ui-gallery__button ui-gallery__button--primary" onClick={() => setShowValidation(false)}>{t.primary}</button>
              <button type="button" className="ui-gallery__button ui-gallery__button--secondary" onClick={() => setShowValidation(true)}>{t.secondary}</button>
              <a href="#ui-gallery-table" className="ui-gallery__link">{t.tableTitle}</a>
            </div>
            {showValidation ? <p className="ui-gallery__inline-note">{t.validation}</p> : null}
          </section>

          <section className="ui-gallery__panel">
            <h2>{t.badges}</h2>
            <div className="ui-gallery__example-row">
              <span className="ui-gallery__badge ui-gallery__badge--active">{t.active}</span>
              <span className="ui-gallery__badge ui-gallery__badge--pending">{t.pending}</span>
              <span className="ui-gallery__badge ui-gallery__badge--suspended">{t.suspended}</span>
            </div>
          </section>

          <section className="ui-gallery__panel">
            <h2>{t.alerts}</h2>
            <div className="ui-gallery__alert ui-gallery__alert--info">{t.info}</div>
            <div className="ui-gallery__alert ui-gallery__alert--success">{t.success}</div>
            <div className="ui-gallery__alert ui-gallery__alert--warning">{t.warning}</div>
            <div className="ui-gallery__alert ui-gallery__alert--error">{t.error}</div>
          </section>

          <section className="ui-gallery__panel">
            <h2>{t.fields}</h2>
            <form className="ui-gallery__form" onSubmit={(event) => { event.preventDefault(); setShowValidation(true); }}>
              <label>
                {t.fullName}
                <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="off" placeholder={t.fullName} />
              </label>
              <label>
                {t.email}
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="off" placeholder="example@school.test" />
              </label>
              <label>
                {t.chooseRole}
                <select value={role} onChange={(event) => setRole(event.target.value)}>
                  <option value="">{t.chooseRole}</option>
                  <option value="teacher">{t.teacher}</option>
                  <option value="accountant">{t.accountant}</option>
                  <option value="administrator">{t.administrator}</option>
                </select>
              </label>
              <label className="ui-gallery__checkbox">
                <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} />
                <span>{t.accept}</span>
              </label>
              <button type="submit" className="ui-gallery__button ui-gallery__button--primary">{t.check}</button>
              {showValidation ? (
                <p className={validExample && role && confirmed ? "ui-gallery__form-result ui-gallery__form-result--success" : "ui-gallery__form-result ui-gallery__form-result--error"} role="status">
                  {validExample && role && confirmed ? t.success : t.validation}
                </p>
              ) : null}
            </form>
          </section>

          <section className="ui-gallery__panel" id="ui-gallery-table">
            <h2>{t.tableTitle}</h2>
            <div className="ui-gallery__table-wrap">
              <table className="ui-gallery__table">
                <thead>
                  <tr><th>{t.student}</th><th>{t.className}</th><th>{t.status}</th><th>{t.action}</th></tr>
                </thead>
                <tbody>
                  <tr><td>{t.sampleStudent1}</td><td>{t.grade1}</td><td><span className="ui-gallery__badge ui-gallery__badge--active">{t.active}</span></td><td><button type="button" className="ui-gallery__text-button" onClick={() => setShowValidation(true)}>{t.view}</button></td></tr>
                  <tr><td>{t.sampleStudent2}</td><td>{t.grade2}</td><td><span className="ui-gallery__badge ui-gallery__badge--pending">{t.pending}</span></td><td><button type="button" className="ui-gallery__text-button" onClick={() => setShowValidation(true)}>{t.view}</button></td></tr>
                  <tr><td>{t.sampleStudent3}</td><td>{t.grade3}</td><td><span className="ui-gallery__badge ui-gallery__badge--suspended">{t.suspended}</span></td><td><button type="button" className="ui-gallery__text-button" onClick={() => setShowValidation(true)}>{t.view}</button></td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="ui-gallery__panel">
            <h2>{t.states}</h2>
            <div className="ui-gallery__state-grid">
              <article className="ui-gallery__state"><h3>{t.empty}</h3><p>{t.emptyText}</p></article>
              <article className="ui-gallery__state"><h3>{t.loading}</h3><p><span className="ui-gallery__spinner" aria-hidden="true" /> {t.loadingText}</p></article>
              <article className="ui-gallery__state ui-gallery__state--error"><h3>{t.failure}</h3><p>{t.failureText}</p></article>
            </div>
          </section>
        </div>
      ) : (
        <section className="ui-gallery__panel ui-gallery__modules">
          <div className="ui-gallery__module-heading">
            <div><h2>{t.moduleTitle}</h2><p>{t.moduleDescription}</p></div>
            <label className="ui-gallery__search">
              <span>{t.search}</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.searchPlaceholder} />
            </label>
          </div>
          <div className="ui-gallery__module-grid">
            {filteredModules.map((key, index) => (
              <article className="ui-gallery__module-card" key={key}>
                <div className="ui-gallery__module-card-top">
                  <span className="ui-gallery__module-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="ui-gallery__sample-tag">{t.exampleOnly}</span>
                </div>
                <h3>{t[key]}</h3>
                <p>{t.overview}: {t.exampleMetrics}</p>
                <div className="ui-gallery__metric-row">
                  <span>{t.records}</span><strong>{(index + 3) * 7}</strong>
                </div>
                <div className="ui-gallery__metric-row">
                  <span>{t.pendingTasks}</span><strong>{(index % 4) + 1}</strong>
                </div>
              </article>
            ))}
          </div>
          {filteredModules.length === 0 ? <p className="ui-gallery__empty-result">{t.noMatches}</p> : null}
        </section>
      )}

      <footer className="ui-gallery__footnote">
        <strong>{t.note}</strong>
        <p>{t.noteText}</p>
      </footer>
    </main>
  );
}
