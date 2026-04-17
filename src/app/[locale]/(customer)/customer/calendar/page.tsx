import { CalendarClock, CircleDollarSign, Droplets } from "lucide-react";
import { MonthGrid } from "@/components/calendar/month-grid";
import { CustomerShell } from "@/components/layout/customer-shell";
import { MetricCard } from "@/components/layout/metric-card";
import { getCustomerCalendarData } from "@/lib/data-service";
import { formatCurrencyINR } from "@/lib/utils";

type CustomerCalendarPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CustomerCalendarPage({
  params,
}: CustomerCalendarPageProps) {
  const { locale } = await params;
  const calendar = await getCustomerCalendarData();

  if (!calendar) {
    return (
      <CustomerShell
        locale={locale}
        title={locale === "hi" ? "मेरा कैलेंडर" : "My Calendar"}
        subtitle={
          locale === "hi"
            ? "जब delivery data उपलब्ध होगा तब calendar यहाँ दिखेगा."
            : "Your calendar will appear here once delivery data is available."
        }
      >
        <section className="public-panel rounded-[28px] p-5 text-sm text-muted">
          No calendar data is available yet.
        </section>
      </CustomerShell>
    );
  }

  const { customer, monthMeta, days, summary } = calendar;

  return (
    <CustomerShell
      locale={locale}
      title={locale === "hi" ? "मेरा कैलेंडर" : "My Calendar"}
      subtitle={
        locale === "hi"
          ? "दिनवार दूध consumption, skipped days और monthly estimate देखें."
          : "See day-wise milk consumption, skipped days, and your monthly estimate."
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Monthly liters"
          value={`${summary.totalLiters.toFixed(1)} L`}
          hint={`${customer.areaName} route summary`}
        />
        <MetricCard
          label="Delivered days"
          value={`${summary.deliveredDays}`}
          hint={`${summary.skippedDays} skipped • ${summary.pausedDays} paused`}
        />
        <MetricCard
          label="Estimated bill"
          value={formatCurrencyINR(summary.estimatedBill)}
          hint="Projected from delivered consumption and add-ons"
        />
      </div>

      <section className="public-panel mt-4 rounded-[28px] p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Consumption calendar</h2>
            <p className="mt-1 text-sm text-muted">
              Daily entries for your milk plan in {monthMeta.monthLabel}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700">
              Delivered
            </span>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-700">
              Paused
            </span>
            <span className="rounded-full bg-rose-100 px-2.5 py-1 text-rose-700">
              Skipped
            </span>
          </div>
        </div>

        <div className="mt-5">
          <MonthGrid
            monthLabel={monthMeta.monthLabel}
            leadingBlankSlots={monthMeta.leadingBlankSlots}
            days={days}
            variant="customer"
            renderFooter={(day) => (
              <>
                <div>{day.dateLabel}</div>
                <div>{day.itemCount} add-ons</div>
              </>
            )}
          />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="public-panel rounded-[28px] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Droplets className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Average per active day</p>
              <p className="mt-1 text-sm text-muted">
                {(summary.totalLiters / Math.max(summary.deliveredDays, 1)).toFixed(1)} L
              </p>
            </div>
          </div>
        </article>
        <article className="public-panel rounded-[28px] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <CalendarClock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Paused days</p>
              <p className="mt-1 text-sm text-muted">{summary.pausedDays} this month</p>
            </div>
          </div>
        </article>
        <article className="public-panel rounded-[28px] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <CircleDollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Billing rate</p>
              <p className="mt-1 text-sm text-muted">
                {formatCurrencyINR(customer.rate)} per liter
              </p>
            </div>
          </div>
        </article>
      </section>
    </CustomerShell>
  );
}
