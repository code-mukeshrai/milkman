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
import { AdminBadge, AdminButton, AdminCard, AdminStatCard } from "@/components/layout/admin-ui";

type AdminDashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminDashboardPage({
  params,
}: AdminDashboardPageProps) {
  const { locale } = await params;

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "एडमिन डैशबोर्ड" : "Admin Dashboard"}
      subtitle={
        locale === "hi"
          ? "आज की डिलीवरी, कस्टमर स्टेटस और पेमेंट्स पर त्वरित नज़र."
          : "A quick view of today's deliveries, customer status, and payments."
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Active customers"
          value="128"
          hint="7 customers are paused this week"
          icon={Users}
        />
        <AdminStatCard
          label="Today's deliveries"
          value="94"
          hint="34 households still pending"
          icon={Droplets}
          tone="success"
        />
        <AdminStatCard
          label="Monthly sales"
          value="₹48,650"
          hint="Projected from current milk plans"
          icon={BadgeIndianRupee}
          tone="warning"
        />
        <AdminStatCard
          label="Outstanding dues"
          value="₹12,400"
          hint="11 accounts need follow-up"
          icon={CircleAlert}
          tone="danger"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
        <AdminCard className="overflow-hidden">
          <div className="rounded-[24px] bg-[linear-gradient(180deg,#edf4ff_0%,#e8efff_100%)] p-5">
            <AdminBadge tone="blue">Morning milk cycle</AdminBadge>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-[var(--admin-text)]">
              Deliveries, dues, and customer actions from one compact control room.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--admin-muted)]">
              This dashboard is designed for quick daily work on mobile: open the route,
              mark delivery status, and follow outstanding amounts without leaving the same
              admin shell.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <AdminButton>
                Start morning run
                <MoveRight className="h-4 w-4" />
              </AdminButton>
              <AdminButton variant="secondary">Manage customer routes</AdminButton>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ["Green Park", "18 customers", "12 delivered"],
              ["Shivaji Nagar", "26 customers", "21 delivered"],
              ["Station Road", "15 customers", "8 delivered"],
            ].map(([area, customers, delivered]) => (
              <article key={area} className="admin-panel-muted rounded-[22px] px-4 py-4">
                <p className="text-sm font-medium text-[var(--admin-muted)]">{area}</p>
                <p className="mt-2 text-lg font-semibold text-[var(--admin-text)]">{customers}</p>
                <p className="mt-1 text-sm font-medium text-[var(--admin-primary-strong)]">
                  {delivered}
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
                  Thumb-friendly actions for the morning route
                </p>
              </div>
              <Gauge className="h-5 w-5 text-[var(--admin-primary-strong)]" />
            </div>
            <div className="mt-4 grid gap-3">
              {["Add customer", "Mark deliveries", "Record payment", "Review dues"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className="admin-secondary-button w-full justify-between px-4 py-3 text-left text-sm font-semibold"
                >
                  <span>{item}</span>
                  <MoveRight className="h-4 w-4" />
                </button>
              ))}
            </div>
          </AdminCard>

          <AdminCard>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-[var(--admin-text)]">Progress</h2>
                <p className="mt-1 text-sm text-[var(--admin-muted)]">ETA Friday • 68% complete</p>
              </div>
              <AdminBadge tone="success">On Track</AdminBadge>
            </div>
            <div className="mt-5 space-y-4">
              {[
                ["Delivery completion", 72],
                ["Payment recovery", 48],
                ["Customer verification", 86],
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
                Customers needing a manual follow-up before noon
              </p>
            </div>
            <Activity className="h-5 w-5 text-[var(--admin-primary-strong)]" />
          </div>
          <div className="mt-4 space-y-3">
            {[
              ["Amit Verma", "2.0 L • Green Park", "Payment overdue", "danger"],
              ["Neha Sharma", "1.5 L • Station Road", "Delivery pending", "warning"],
              ["Rakesh Kumar", "2.5 L • Shivaji Nagar", "Address note updated", "blue"],
            ].map(([name, info, issue, tone]) => (
              <div
                key={name}
                className="admin-panel-muted flex flex-col gap-3 rounded-[22px] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-[var(--admin-text)]">{name}</p>
                  <p className="mt-1 text-sm text-[var(--admin-muted)]">{info}</p>
                </div>
                <AdminBadge tone={tone as "blue" | "danger" | "warning"}>{issue}</AdminBadge>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[var(--admin-text)]">Daily performance</h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                Quick snapshot of sales and unresolved route issues
              </p>
            </div>
            <AdminButton variant="outline">View full summary</AdminButton>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Critical", "04", "admin-badge-danger"],
              ["High", "09", "admin-badge-warning"],
              ["Medium", "17", "admin-badge-blue"],
              ["Resolved", "42", "admin-badge-success"],
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
