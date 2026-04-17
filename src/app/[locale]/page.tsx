import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/layout/section-heading";

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="public-shell min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="public-panel rounded-[32px] p-6 sm:p-8">
          <SectionHeading
            eyebrow={locale === "hi" ? "मिल्कमैन" : "Milkman"}
            title={
              locale === "hi"
                ? "दूध डिलीवरी मैनेजमेंट के लिए bilingual starter"
                : "Bilingual starter for milk delivery management"
            }
            description={
              locale === "hi"
                ? "एडमिन और कस्टमर दोनों के लिए responsive panels, MongoDB foundation, और INR-friendly billing flow."
                : "Responsive admin and customer panels, MongoDB foundation, and an INR-friendly billing flow."
            }
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={`/${locale}/admin/dashboard`}
              className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-strong"
            >
              {locale === "hi" ? "एडमिन खोलें" : "Open Admin"}
            </Link>
            <Link
              href={`/${locale}/customer/dashboard`}
              className="rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold"
            >
              {locale === "hi" ? "कस्टमर व्यू" : "Customer View"}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
