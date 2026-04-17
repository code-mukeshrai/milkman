import { MetricCard } from "@/components/layout/metric-card";
import { CustomerShell } from "@/components/layout/customer-shell";
import { getCustomerDetailData, getDefaultCustomerCode } from "@/lib/data-service";
import { formatCurrencyINR } from "@/lib/utils";

type CustomerDashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CustomerDashboardPage({
  params,
}: CustomerDashboardPageProps) {
  const { locale } = await params;
  const customerCode = await getDefaultCustomerCode();
  const customer = customerCode ? await getCustomerDetailData(customerCode) : null;

  if (!customer) {
    return (
      <CustomerShell
        locale={locale}
        title={locale === "hi" ? "मेरा डैशबोर्ड" : "My Dashboard"}
        subtitle={
          locale === "hi"
            ? "जब कस्टमर डेटा उपलब्ध होगा तब summary यहाँ दिखेगी."
            : "Your summary will appear here once customer data is available."
        }
      >
        <section className="public-panel rounded-[28px] p-5 text-sm text-muted">
          No customer record is available yet.
        </section>
      </CustomerShell>
    );
  }

  const latestEntry = customer.recentDeliveries[0];
  const todayStatus = latestEntry?.status || "PENDING";

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
        <MetricCard
          label="Daily plan"
          value={customer.quantityLabel}
          hint={`${customer.areaName} • ${customer.status}`}
        />
        <MetricCard
          label="This month"
          value={formatCurrencyINR(customer.billed)}
          hint="Actual bill from delivered milk and add-ons"
        />
        <MetricCard
          label="Pending due"
          value={formatCurrencyINR(customer.due)}
          hint={latestEntry ? `Last delivery on ${latestEntry.dateLabel}` : "No recent delivery"}
        />
      </div>
      <section className="public-panel mt-4 rounded-[28px] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">
              {locale === "hi" ? "आज का स्टेटस" : "Today's Status"}
            </p>
            <h2 className="mt-2 text-xl font-semibold">
              {locale === "hi"
                ? `डिलीवरी स्टेटस: ${todayStatus}`
                : `Delivery status: ${todayStatus}`}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              {locale === "hi"
                ? `आपकी योजना ${customer.quantityLabel} है। इस महीने का billed amount ${formatCurrencyINR(customer.billed)} और due ${formatCurrencyINR(customer.due)} है।`
                : `Your plan is ${customer.quantityLabel}. This month's billed amount is ${formatCurrencyINR(customer.billed)} and your due is ${formatCurrencyINR(customer.due)}.`}
            </p>
          </div>
          <div className="public-muted-card rounded-[24px] px-4 py-3 text-sm text-muted">
            <p className="font-medium text-foreground">
              {locale === "hi" ? "आखिरी अपडेट" : "Last update"}
            </p>
            <p className="mt-1">{latestEntry?.dateLabel || "No update yet"}</p>
          </div>
        </div>
      </section>
    </CustomerShell>
  );
}
