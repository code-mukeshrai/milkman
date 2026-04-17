import { CustomerShell } from "@/components/layout/customer-shell";
import { formatCurrencyINR } from "@/lib/utils";

type CustomerBillingPageProps = {
  params: Promise<{ locale: string }>;
};

const rows = [
  { label: "Monthly bill", value: 3840 },
  { label: "Amount paid", value: 3020 },
  { label: "Pending due", value: 820 },
];

export default async function CustomerBillingPage({
  params,
}: CustomerBillingPageProps) {
  const { locale } = await params;

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
      </section>
    </CustomerShell>
  );
}
