import { MetricCard } from "@/components/layout/metric-card";
import { CustomerShell } from "@/components/layout/customer-shell";

type CustomerDashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CustomerDashboardPage({
  params,
}: CustomerDashboardPageProps) {
  const { locale } = await params;

  return (
    <CustomerShell
      locale={locale}
      title={locale === "hi" ? "मेरा डैशबोर्ड" : "My Dashboard"}
      subtitle={
        locale === "hi"
          ? "आपकी दूध योजना, हाल की डिलीवरी और भुगतान की स्थिति."
          : "Your milk plan, recent deliveries, and payment status."
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Daily plan" value="2.0 L" hint="Cow milk • Active" />
        <MetricCard label="This month" value="₹3,840" hint="Current bill estimate" />
        <MetricCard label="Pending due" value="₹820" hint="Last payment on 10 Apr" />
      </div>
      <section className="public-panel mt-4 rounded-[28px] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">
              {locale === "hi" ? "आज का स्टेटस" : "Today's Status"}
            </p>
            <h2 className="mt-2 text-xl font-semibold">
              {locale === "hi" ? "डिलीवरी निर्धारित है" : "Delivery is scheduled"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              {locale === "hi"
                ? "सुबह की डिलीवरी के लिए 2.0 लीटर दर्ज है। भुगतान और हिस्ट्री नीचे की स्क्रीन से कभी भी देख सकते हैं।"
                : "Your morning plan is set to 2.0 liters. You can review billing and delivery history from the sections below at any time."}
            </p>
          </div>
          <div className="public-muted-card rounded-[24px] px-4 py-3 text-sm text-muted">
            <p className="font-medium text-foreground">
              {locale === "hi" ? "आखिरी अपडेट" : "Last update"}
            </p>
            <p className="mt-1">14 Apr 2026, 6:20 AM</p>
          </div>
        </div>
      </section>
    </CustomerShell>
  );
}
