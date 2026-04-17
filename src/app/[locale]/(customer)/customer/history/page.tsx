import { CustomerShell } from "@/components/layout/customer-shell";
import { getCustomerHistoryData } from "@/lib/data-service";

type CustomerHistoryPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CustomerHistoryPage({
  params,
}: CustomerHistoryPageProps) {
  const { locale } = await params;
  const entries = await getCustomerHistoryData();

  return (
    <CustomerShell
      locale={locale}
      title={locale === "hi" ? "डिलीवरी हिस्ट्री" : "Delivery History"}
      subtitle={
        locale === "hi"
          ? "हाल की डिलीवरी एंट्री, extra milk और add-on items देखें."
          : "Review recent delivery entries, extra milk, and add-on items."
      }
    >
      <section className="public-panel rounded-[30px] p-5">
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={`${entry.dateLabel}-${entry.status}`}
              className="flex flex-col gap-3 rounded-[22px] border border-border bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{entry.dateLabel}</p>
                <p className="text-sm text-muted">
                  {entry.finalQuantity.toFixed(1)} L • Extra {entry.extraQuantity.toFixed(1)} L
                </p>
                {entry.addOnItems.length ? (
                  <p className="mt-1 text-sm text-muted">
                    Add-ons:{" "}
                    {entry.addOnItems
                      .map((item) => `${item.productName || item.productCode} x ${item.quantity || 0}`)
                      .join(", ")}
                  </p>
                ) : null}
              </div>
              <p className="text-sm font-medium text-primary">{entry.status}</p>
            </div>
          ))}
        </div>
      </section>
    </CustomerShell>
  );
}
