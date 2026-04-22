import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, LayoutDashboard, UserCircle } from "lucide-react";

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <main className="app-shell-main">
      <div className="app-header">
        <div>
          <div className="eyebrow">{t("landing.eyebrow")}</div>
          <div className="title">{t("landing.title")}</div>
          <div className="subtitle" style={{ marginTop: 6 }}>
            {t("landing.description")}
          </div>
        </div>
      </div>

      <div className="stack gap-3 mt-3">
        <Link href={`/${locale}/customer/dashboard`} className="card">
          <div className="card-row">
            <div className="thumb">
              <UserCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="card-title">{t("landing.customerView")}</div>
              <div className="card-sub">{t("nav.dashboard")} · {t("nav.calendar")}</div>
            </div>
            <ArrowRight
              className="h-5 w-5"
              style={{ color: "var(--ink-400)" }}
              aria-hidden="true"
            />
          </div>
        </Link>

        <Link href={`/${locale}/admin/dashboard`} className="card">
          <div className="card-row">
            <div className="thumb sun">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="card-title">{t("landing.openAdmin")}</div>
              <div className="card-sub">
                {t("nav.customers")} · {t("nav.deliveries")} · {t("nav.reports")}
              </div>
            </div>
            <ArrowRight
              className="h-5 w-5"
              style={{ color: "var(--ink-400)" }}
              aria-hidden="true"
            />
          </div>
        </Link>
      </div>

      <div className="section-head">
        <h3>{t("landing.starterStatus")}</h3>
      </div>
      <ul className="stack gap-2" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li className="list-item">
          <span className="status-dot mint" style={{ marginLeft: 4 }} />
          <div className="meta">
            <strong>{t("landing.statusItems.shell")}</strong>
          </div>
        </li>
        <li className="list-item">
          <span className="status-dot mint" style={{ marginLeft: 4 }} />
          <div className="meta">
            <strong>{t("landing.statusItems.locales")}</strong>
          </div>
        </li>
        <li className="list-item">
          <span className="status-dot mint" style={{ marginLeft: 4 }} />
          <div className="meta">
            <strong>{t("landing.statusItems.mongo")}</strong>
          </div>
        </li>
        <li className="list-item">
          <span className="status-dot mint" style={{ marginLeft: 4 }} />
          <div className="meta">
            <strong>{t("landing.statusItems.skeletons")}</strong>
          </div>
        </li>
      </ul>
    </main>
  );
}
