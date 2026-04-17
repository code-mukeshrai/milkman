import { CustomerShell } from "@/components/layout/customer-shell";
import { getCustomerDetailData, getDefaultCustomerCode } from "@/lib/data-service";
import { formatCurrencyINR } from "@/lib/utils";

type CustomerBillingPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CustomerBillingPage({
  params,
}: CustomerBillingPageProps) {
  const { locale } = await params;
  const customerCode = await getDefaultCustomerCode();
  const customer = customerCode ? await getCustomerDetailData(customerCode) : null;
  const rows = customer
    ? [
        { label: "Monthly bill", value: customer.billed },
        { label: "Amount paid", value: customer.paid },
        { label: "Pending due", value: customer.due },
      ]
    : [];

  return (
    <CustomerShell
      locale={locale}
      title={locale === "hi" ? "मेरा बिल" : "My Billing"}
      subtitle={
        locale === "hi"
          ? "वर्तमान महीने की billing summary और pending due."
          : "Current month billing summary and pending due."
      }
    >
      <section className="public-panel rounded-[30px] p-5">
        <div className="space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-2 rounded-[22px] border border-border bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="font-medium">{row.label}</p>
              <p className="text-base font-semibold">{formatCurrencyINR(row.value)}</p>
            </div>
          ))}
        </div>
        {customer?.recentDeliveries.length ? (
          <div className="mt-4 rounded-[22px] border border-border bg-white px-4 py-4">
            <p className="text-sm font-medium text-muted">Recent billable add-ons</p>
            <p className="mt-2 text-sm text-foreground">
              {customer.recentDeliveries
                .flatMap((entry) => entry.addOnItems)
                .slice(0, 4)
                .map((item) => `${item.productName || item.productCode} x ${item.quantity || 0}`)
                .join(", ") || "No add-on products billed this month."}
            </p>
          </div>
        ) : null}
      </section>
    </CustomerShell>
  );
}
