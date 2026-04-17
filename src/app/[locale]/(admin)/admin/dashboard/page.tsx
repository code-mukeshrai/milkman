import Link from "next/link";
import {
  Activity,
  BadgeIndianRupee,
  CircleAlert,
  Droplets,
  Gauge,
  MoveRight,
  Users,
} from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { AdminBadge, AdminCard, AdminStatCard } from "@/components/layout/admin-ui";
import {
  getAdminCalendarData,
  getDashboardData,
  getPurchaseLedgerData,
} from "@/lib/data-service";
import { formatCurrencyINR } from "@/lib/utils";

type AdminDashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminDashboardPage({
  params,
}: AdminDashboardPageProps) {
  const { locale } = await params;
  const [{ kpis, routeSnapshot, attentionCustomers }, purchaseLedger, adminCalendar] =
    await Promise.all([getDashboardData(), getPurchaseLedgerData(), getAdminCalendarData()]);

  const routeCoverage = kpis.activeCustomers
    ? Math.round((kpis.todayDelivered / kpis.activeCustomers) * 100)
    : 0;
  const collectionRate = kpis.monthlySales
    ? Math.round(((kpis.monthlySales - kpis.monthlyDue) / kpis.monthlySales) * 100)
    : 0;
  const inwardCoverage = adminCalendar.summary.totalLiters
    ? Math.min(
        Math.round(
          (purchaseLedger.summary.totalMilkInward / Math.max(adminCalendar.summary.totalLiters, 1)) *
            100,
        ),
        100,
      )
    : 0;

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "एडमिन डैशबोर्ड" : "Admin Dashboard"}
      subtitle={
        locale === "hi"
          ? "आज की डिलीवरी, कस्टमर स्टेटस, बकाया और purchase cycle पर त्वरित नज़र."
          : "A quick view of today's deliveries, customer status, outstanding dues, and purchase cycle."
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Active customers"
          value={String(kpis.activeCustomers)}
          hint={`${kpis.todayPending} customers still need today's status update`}
          icon={Users}
        />
        <AdminStatCard
          label="Today's deliveries"
          value={String(kpis.todayDelivered)}
          hint={`${kpis.todayPending} households still pending`}
          icon={Droplets}
          tone="success"
        />
        <AdminStatCard
          label="Monthly sales"
          value={formatCurrencyINR(kpis.monthlySales)}
          hint="Built from delivered milk and add-on products"
          icon={BadgeIndianRupee}
          tone="warning"
        />
        <AdminStatCard
          label="Outstanding dues"
          value={formatCurrencyINR(kpis.monthlyDue)}
          hint={`${attentionCustomers.filter((entry) => entry.issue === "Payment overdue").length} accounts need follow-up`}
          icon={CircleAlert}
          tone="danger"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
        <AdminCard className="overflow-hidden">
          <div className="rounded-[24px] bg-[linear-gradient(180deg,#edf4ff_0%,#e8efff_100%)] p-5">
            <AdminBadge tone="blue">Morning milk cycle</AdminBadge>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-[var(--admin-text)]">
              Deliveries, dues, and milk purchase operations from one compact control room.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--admin-muted)]">
              This dashboard now reads from live MongoDB records, so delivery status, extra milk,
              add-on products, payments, and inward purchase activity stay aligned in one place.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/admin/deliveries`}
                className="admin-primary-button px-4 py-3 text-sm font-semibold"
              >
                Start morning run
                <MoveRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/${locale}/admin/purchases`}
                className="admin-secondary-button px-4 py-3 text-sm font-semibold"
              >
                Review purchase ledger
              </Link>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {routeSnapshot.slice(0, 3).map((area) => (
              <article key={area.areaCode} className="admin-panel-muted rounded-[22px] px-4 py-4">
                <p className="text-sm font-medium text-[var(--admin-muted)]">{area.areaName}</p>
                <p className="mt-2 text-lg font-semibold text-[var(--admin-text)]">
                  {area.customerCount} customers
                </p>
                <p className="mt-1 text-sm font-medium text-[var(--admin-primary-strong)]">
                  {area.deliveredCount} delivered • {area.liters.toFixed(1)} L
                </p>
              </article>
            ))}
          </div>
        </AdminCard>

        <div className="space-y-4">
          <AdminCard>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-[var(--admin-text)]">Quick actions</h2>
                <p className="mt-1 text-sm text-[var(--admin-muted)]">
                  Thumb-friendly actions for customer delivery and supply cycle
                </p>
              </div>
              <Gauge className="h-5 w-5 text-[var(--admin-primary-strong)]" />
            </div>
            <div className="mt-4 grid gap-3">
              {[
                ["Add customer", `/${locale}/admin/customers/new`],
                ["Mark deliveries", `/${locale}/admin/deliveries`],
                ["Record payment", `/${locale}/admin/billing`],
                ["Capture purchase", `/${locale}/admin/purchases`],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="admin-secondary-button w-full justify-between px-4 py-3 text-left text-sm font-semibold"
                >
                  <span>{label}</span>
                  <MoveRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </AdminCard>

          <AdminCard>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-[var(--admin-text)]">Progress</h2>
                <p className="mt-1 text-sm text-[var(--admin-muted)]">
                  Live completion from customer, billing, and purchase records
                </p>
              </div>
              <AdminBadge tone="success">On Track</AdminBadge>
            </div>
            <div className="mt-5 space-y-4">
              {[
                ["Delivery completion", routeCoverage],
                ["Payment recovery", collectionRate],
                ["Milk inward coverage", inwardCoverage],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <p className="font-medium text-[var(--admin-text)]">{label}</p>
                    <p className="text-[var(--admin-muted)]">{value}%</p>
                  </div>
                  <div className="admin-progress-track h-2.5">
                    <div className="admin-progress-fill" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <AdminCard>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[var(--admin-text)]">
                Delivery attention points
              </h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                Customers needing a manual follow-up based on today&apos;s delivery or billing
              </p>
            </div>
            <Activity className="h-5 w-5 text-[var(--admin-primary-strong)]" />
          </div>
          <div className="mt-4 space-y-3">
            {attentionCustomers.map((entry) => (
              <div
                key={entry.customerCode}
                className="admin-panel-muted flex flex-col gap-3 rounded-[22px] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-[var(--admin-text)]">{entry.name}</p>
                  <p className="mt-1 text-sm text-[var(--admin-muted)]">{entry.info}</p>
                </div>
                <AdminBadge tone={entry.tone as "blue" | "danger" | "warning"}>
                  {entry.issue}
                </AdminBadge>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[var(--admin-text)]">Daily performance</h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                Quick snapshot of route, dues, and purchase-health metrics
              </p>
            </div>
            <Link
              href={`/${locale}/admin/reports`}
              className="admin-outline-button px-4 py-3 text-sm font-semibold"
            >
              View full summary
            </Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Pending", String(kpis.todayPending), "admin-badge-danger"],
              ["Delivered", String(kpis.todayDelivered), "admin-badge-success"],
              ["Unpaid purchases", String(purchaseLedger.summary.unpaidEntries), "admin-badge-warning"],
              ["Milk inward", `${purchaseLedger.summary.totalMilkInward.toFixed(1)} L`, "admin-badge-blue"],
            ].map(([label, value, badgeClass]) => (
              <div key={label} className="admin-panel-muted rounded-[24px] px-4 py-5">
                <span className={`admin-badge ${badgeClass}`}>{label}</span>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-[var(--admin-text)]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
