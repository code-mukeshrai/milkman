import { CalendarRange, CircleDollarSign, Droplets, Users } from "lucide-react";
import { MonthGrid } from "@/components/calendar/month-grid";
import { AdminShell } from "@/components/layout/admin-shell";
import { AdminBadge, AdminCard, AdminStatCard } from "@/components/layout/admin-ui";
import { getAdminCalendarData } from "@/lib/data-service";
import { formatCurrencyINR } from "@/lib/utils";

type AdminCalendarPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminCalendarPage({ params }: AdminCalendarPageProps) {
  const { locale } = await params;
  const { monthMeta, days, areaBreakdown, summary } = await getAdminCalendarData();

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "कैलेंडर व्यू" : "Calendar View"}
      subtitle={
        locale === "hi"
          ? "दिनवार consumption, peak days और area-wise insights देखें."
          : "Review day-wise consumption, peak days, and area-wise insights."
      }
    >
      <div className="grid gap-4 md:grid-cols-4">
        <AdminStatCard
          label="Monthly liters"
          value={`${summary.totalLiters.toFixed(1)} L`}
          hint="Combined delivered liters across routes"
          icon={Droplets}
          tone="blue"
        />
        <AdminStatCard
          label="Active customers"
          value={`${summary.activeCustomers}`}
          hint="Customers contributing to calendar totals"
          icon={Users}
          tone="success"
        />
        <AdminStatCard
          label="Peak day"
          value={`${summary.peakDay.dayOfMonth} ${monthMeta.monthLabel.slice(0, 3)}`}
          hint={`${summary.peakDay.liters.toFixed(1)} L consumed`}
          icon={CalendarRange}
          tone="warning"
        />
        <AdminStatCard
          label="Revenue estimate"
          value={formatCurrencyINR(summary.totalRevenueEstimate)}
          hint="Built from actual billable records"
          icon={CircleDollarSign}
          tone="danger"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
        <AdminCard>
          <MonthGrid
            monthLabel={monthMeta.monthLabel}
            leadingBlankSlots={monthMeta.leadingBlankSlots}
            days={days}
            variant="admin"
            renderFooter={(day) => (
              <>
                <div>{day.dateLabel}</div>
                <div>
                  {day.deliveredCount} delivered • {day.pausedCount} paused • {day.skippedCount} skipped
                </div>
              </>
            )}
          />
        </AdminCard>

        <div className="space-y-4">
          <AdminCard>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-[var(--admin-text)]">
                  Area consumption insights
                </h2>
                <p className="mt-1 text-sm text-[var(--admin-muted)]">
                  Compare mapped customer count and liters by area.
                </p>
              </div>
              <AdminBadge tone="blue">Month summary</AdminBadge>
            </div>

            <div className="mt-4 space-y-3">
              {areaBreakdown.map((area) => (
                <div key={area.code} className="admin-panel-muted rounded-[22px] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[var(--admin-text)]">{area.name}</p>
                      <p className="mt-1 text-sm text-[var(--admin-muted)]">{area.code}</p>
                    </div>
                    <AdminBadge tone={area.customerCount > 0 ? "success" : "warning"}>
                      {area.customerCount} customers
                    </AdminBadge>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
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
              ))}
            </div>
          </AdminCard>
        </div>
      </div>
    </AdminShell>
  );
}
