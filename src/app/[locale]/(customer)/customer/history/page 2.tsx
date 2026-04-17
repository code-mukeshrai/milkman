import { CustomerShell } from "@/components/layout/customer-shell";

type CustomerHistoryPageProps = {
  params: Promise<{ locale: string }>;
};

const entries = [
  ["14 Apr 2026", "2.0 L", "Delivered"],
  ["13 Apr 2026", "2.0 L", "Delivered"],
  ["12 Apr 2026", "2.0 L", "Skipped"],
];

export default async function CustomerHistoryPage({
  params,
}: CustomerHistoryPageProps) {
  const { locale } = await params;

  return (
    <CustomerShell
      locale={locale}
      title={locale === "hi" ? "डिलीवरी हिस्ट्री" : "Delivery History"}
      subtitle={
        locale === "hi"
          ? "हाल की डिलीवरी एंट्री और स्टेटस देखें."
          : "Review recent delivery entries and statuses."
      }
    >
      <section className="public-panel rounded-[30px] p-5">
        <div className="space-y-3">
          {entries.map(([date, quantity, status]) => (
            <div
              key={date}
              className="flex flex-col gap-3 rounded-[22px] border border-border bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{date}</p>
                <p className="text-sm text-muted">{quantity}</p>
              </div>
              <p className="text-sm font-medium text-primary">{status}</p>
            </div>
          ))}
        </div>
      </section>
    </CustomerShell>
  );
}
