import { BarChart3, ChartSpline, CircleDollarSign, MapPinned, ShoppingBasket } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { AdminBadge, AdminCard, AdminStatCard } from "@/components/layout/admin-ui";
import { getPurchaseLedgerData, getReportsData } from "@/lib/data-service";
import { formatCurrencyINR } from "@/lib/utils";

type AdminReportsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminReportsPage({ params }: AdminReportsPageProps) {
  const { locale } = await params;
  const [{ areaAnalytics, summary }, purchaseLedger] = await Promise.all([
    getReportsData(),
    getPurchaseLedgerData(),
  ]);
  const topArea = summary.topArea;

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "रिपोर्ट्स" : "Reports"}
      subtitle={
        locale === "hi"
          ? "एरिया, डिलीवरी, बिलिंग और purchase insights के लिए summary cards."
          : "Summary cards for area, delivery, billing, and purchase insights."
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          label="Area coverage"
          value={`${areaAnalytics.length} areas`}
          hint="Area codes are used by customer and delivery analytics"
          icon={MapPinned}
          tone="blue"
        />
        <AdminStatCard
          label="Top monthly consumption"
          value={`${topArea?.monthlyConsumption?.toFixed(1) ?? "0.0"} L`}
          hint={topArea ? `${topArea.name} leads route demand` : "No area data yet"}
          icon={CircleDollarSign}
          tone="success"
        />
        <AdminStatCard
          label="Collection rate"
          value={`${summary.collectionRate}%`}
          hint={`${formatCurrencyINR(summary.purchaseTotal)} purchase total this month`}
          icon={ChartSpline}
          tone="warning"
        />
      </div>

      <section className="grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
        <AdminCard>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[var(--admin-text)]">Area analytics</h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                Customer count, consumption, billed amount, and dues based on area code mapping.
              </p>
            </div>
            <BarChart3 className="h-5 w-5 text-[var(--admin-primary-strong)]" />
          </div>

          <div className="mt-4 grid gap-3">
            {areaAnalytics.map((area) => (
              <article key={area.code} className="admin-panel-muted rounded-[24px] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-[var(--admin-text)]">{area.name}</p>
                      <AdminBadge tone="blue">{area.code}</AdminBadge>
                    </div>
                    <p className="mt-1 text-sm text-[var(--admin-muted)]">
                      {area.customerCount} customers mapped
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-4">
                    <div className="rounded-[18px] bg-white px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">
                        Daily
                      </p>
                      <p className="mt-2 font-semibold text-[var(--admin-text)]">
                        {area.dailyConsumption.toFixed(1)} L
                      </p>
                    </div>
                    <div className="rounded-[18px] bg-white px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">
                        Monthly
                      </p>
                      <p className="mt-2 font-semibold text-[var(--admin-text)]">
                        {area.monthlyConsumption.toFixed(1)} L
                      </p>
                    </div>
                    <div className="rounded-[18px] bg-white px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">
                        Billed
                      </p>
                      <p className="mt-2 font-semibold text-[var(--admin-text)]">
                        {formatCurrencyINR(area.monthlyBilled)}
                      </p>
                    </div>
                    <div className="rounded-[18px] bg-white px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">
                        Due
                      </p>
                      <p className="mt-2 font-semibold text-[var(--admin-text)]">
                        {formatCurrencyINR(area.dueAmount)}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="text-lg font-semibold text-[var(--admin-text)]">Consumption trend</h2>
          <p className="mt-1 text-sm text-[var(--admin-muted)]">
            Month-wise route demand built from real delivery records.
          </p>
          <div className="mt-6 flex h-[260px] items-end gap-3 rounded-[24px] bg-[linear-gradient(180deg,#f9fbff_0%,#edf3ff_100%)] px-4 py-5">
            {areaAnalytics.map((area, index) => (
              <div key={area.code} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={
                    index === 0
                      ? "w-full rounded-full bg-[var(--admin-primary)]"
                      : "w-full rounded-full bg-[#b8d0fb]"
                  }
                  style={{ height: `${Math.max(area.monthlyConsumption * 2, 14)}px` }}
                />
                <span className="text-center text-[10px] font-medium leading-4 text-[var(--admin-muted)]">
                  {area.code.replaceAll("_", " ")}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="admin-panel-muted rounded-[22px] p-4">
              <div className="flex items-center gap-2">
                <ShoppingBasket className="h-4 w-4 text-[var(--admin-primary-strong)]" />
                <p className="text-sm font-medium text-[var(--admin-text)]">Purchase total</p>
              </div>
              <p className="mt-3 text-xl font-semibold text-[var(--admin-text)]">
                {formatCurrencyINR(purchaseLedger.summary.totalPurchaseAmount)}
              </p>
            </div>
            <div className="admin-panel-muted rounded-[22px] p-4">
              <p className="text-sm font-medium text-[var(--admin-text)]">Milk inward</p>
              <p className="mt-3 text-xl font-semibold text-[var(--admin-text)]">
                {purchaseLedger.summary.totalMilkInward.toFixed(1)} L
              </p>
            </div>
            <div className="admin-panel-muted rounded-[22px] p-4">
              <p className="text-sm font-medium text-[var(--admin-text)]">Unpaid purchase rows</p>
              <p className="mt-3 text-xl font-semibold text-[var(--admin-text)]">
                {purchaseLedger.summary.unpaidEntries}
              </p>
            </div>
          </div>
        </AdminCard>
      </section>
    </AdminShell>
  );
}
