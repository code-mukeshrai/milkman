import { LockKeyhole, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <main className="app-shell-main" style={{ paddingBottom: 40 }}>
      <div className="onboarding" style={{ minHeight: "auto", borderRadius: 28, padding: 24 }}>
        <div className="stack gap-2" style={{ marginBottom: 20 }}>
          <span className="chip brand" style={{ alignSelf: "flex-start" }}>
            {t("auth.eyebrow")}
          </span>
          <h1 style={{ marginTop: 12 }}>{t("auth.title")}</h1>
          <p>{t("auth.description")}</p>
        </div>

        <form className="stack gap-3">
          <label className="stack gap-2">
            <span className="text-sm bold">{t("auth.mobile")}</span>
            <div
              className="search"
              style={{ padding: "12px 14px", borderRadius: 14 }}
            >
              <Phone
                className="h-4 w-4"
                style={{ color: "var(--ink-400)" }}
                aria-hidden="true"
              />
              <input
                inputMode="numeric"
                placeholder={t("auth.mobilePlaceholder")}
                aria-label={t("auth.mobile")}
              />
            </div>
          </label>

          <label className="stack gap-2">
            <span className="text-sm bold">{t("auth.password")}</span>
            <div
              className="search"
              style={{ padding: "12px 14px", borderRadius: 14 }}
            >
              <LockKeyhole
                className="h-4 w-4"
                style={{ color: "var(--ink-400)" }}
                aria-hidden="true"
              />
              <input
                type="password"
                placeholder={t("auth.passwordPlaceholder")}
                aria-label={t("auth.password")}
              />
            </div>
          </label>

          <button type="button" className="btn btn-primary btn-block mt-3">
            {t("auth.submit")}
          </button>

          <a
            href="#"
            className="text-sm"
            style={{
              color: "var(--brand)",
              fontWeight: 700,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            {t("auth.forgot")}
          </a>
        </form>
      </div>
    </main>
  );
}
