import { BarChart3, ChartSpline, CircleDollarSign, Users } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCard, AdminStatCard } from "@/components/layout/admin-ui";

type AdminReportsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminReportsPage({ params }: AdminReportsPageProps) {
  const { locale } = await params;

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "रिपोर्ट्स" : "Reports"}
      subtitle={
        locale === "hi"
          ? "एरिया, डिलीवरी और बिलिंग insights के लिए summary cards."
          : "Summary cards for area, delivery, and billing insights."
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          label="Collection rate"
          value="81%"
          hint="Recovery performance this month"
          icon={CircleDollarSign}
          tone="success"
        />
        <AdminStatCard
          label="Area coverage"
          value="3 zones"
          hint="Green Park leads in on-time deliveries"
          icon={Users}
        />
        <AdminStatCard
          label="Weekly trend"
          value="+12%"
          hint="Improvement compared to last week"
          icon={ChartSpline}
          tone="warning"
        />
      </div>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <AdminCard>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[var(--admin-text)]">Summary cards</h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                High-level insights for route health and billing.
              </p>
            </div>
            <BarChart3 className="h-5 w-5 text-[var(--admin-primary-strong)]" />
          </div>
          <div className="mt-4 grid gap-3">
            {[
              ["Area performance", "Top route: Shivaji Nagar"],
              ["Delivery trends", "92% completion this week"],
              ["Recovery status", "₹12,400 due across 11 accounts"],
            ].map(([title, value]) => (
              <article key={title} className="admin-panel-muted rounded-[24px] p-4">
                <p className="text-sm text-[var(--admin-muted)]">{title}</p>
                <p className="mt-3 text-xl font-semibold tracking-tight text-[var(--admin-text)]">
                  {value}
                </p>
              </article>
            ))}
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="text-lg font-semibold text-[var(--admin-text)]">Operational trend line</h2>
          <p className="mt-1 text-sm text-[var(--admin-muted)]">
            Visual placeholder for route and collection trends in a compact mobile-safe card.
          </p>
          <div className="mt-6 flex h-[220px] items-end gap-2 rounded-[24px] bg-[linear-gradient(180deg,#f9fbff_0%,#edf3ff_100%)] px-4 py-5">
            {[28, 35, 40, 46, 52, 48, 62, 58, 71, 69, 76, 82].map((height, index) => (
              <div key={height} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={
                    index > 7
                      ? "w-full rounded-full bg-[var(--admin-primary)]"
                      : "w-full rounded-full bg-[#b8d0fb]"
                  }
                  style={{ height: `${height * 1.7}px` }}
                />
                <span className="text-[11px] font-medium text-[var(--admin-muted)]">
                  W{index + 1}
                </span>
              </div>
            ))}
          </div>
        </AdminCard>
      </section>
    </AdminShell>
  );
}
