import { CalendarClock, CircleDollarSign, Droplets } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MonthGrid } from "@/components/calendar/month-grid";
import { CustomerShell } from "@/components/layout/customer-shell";
import { getCustomerCalendarData } from "@/lib/data-service";
import { formatCurrencyINR } from "@/lib/utils";

type CustomerCalendarPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CustomerCalendarPage({
  params,
}: CustomerCalendarPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const calendar = await getCustomerCalendarData();

  if (!calendar) {
    return (
      <CustomerShell locale={locale}>
        <div className="app-header">
          <div>
            <div className="title">{t("calendar.title")}</div>
            <div className="subtitle">{t("calendar.emptySubtitle")}</div>
          </div>
        </div>
        <section className="card">
          <p className="card-sub">{t("calendar.noData")}</p>
        </section>
      </CustomerShell>
    );
  }

  const { customer, monthMeta, days, summary } = calendar;
  
  const now = new Date();
  const processedDays = days.map(day => {
    const dayDate = new Date(day.dateKey);
    const isFuture = dayDate > now;
    if (isFuture) {
      return { 
        ...day, 
        liters: 0, 
        status: "PENDING" as const, 
        itemCount: 0, 
        isFuture: true 
      };
    }
    return { ...day, isFuture: false };
  });

  return (
    <CustomerShell locale={locale}>
      <div className="app-header">
        <div>
          <div className="title">{t("calendar.title")}</div>
          <div className="subtitle">{t("calendar.subtitle")}</div>
        </div>
      </div>

      {/* Top stats row */}
      <div className="stats-grid">
        <article className="stat">
          <div className="stat-label">{t("calendar.monthlyLiters")}</div>
          <div className="stat-value">{summary.totalLiters.toFixed(1)} {t("common.liters")}</div>
          <div className="trend up">
            {t("calendar.routeSummary", { area: customer.areaName })}
          </div>
        </article>
        <article className="stat">
          <div className="stat-label">{t("calendar.deliveredDays")}</div>
          <div className="stat-value">{summary.deliveredDays}</div>
          <div className="trend">
            {t("calendar.skippedPaused", {
              skipped: summary.skippedDays,
              paused: summary.pausedDays,
            })}
          </div>
        </article>
      </div>

      <div className="mt-3">
        <article className="card">
          <div className="card-row">
            <div className="thumb sun">
              <CircleDollarSign className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="card-title">{t("calendar.estimatedBill")}</div>
              <div className="card-sub">{t("calendar.estimateHint")}</div>
            </div>
            <div className="text-lg xbold">{formatCurrencyINR(summary.estimatedBill)}</div>
          </div>
        </article>
      </div>

      {/* Calendar */}
      <div className="section-head">
        <h3>{t("calendar.headline")}</h3>
      </div>
      <section className="card">
        <div className="row between mb-3">
          <div className="card-sub">
            {t("calendar.headlineHint", { month: monthMeta.monthLabel })}
          </div>
          <div className="row gap-2 text-xs">
            <span className="chip mint">
              <span className="status-dot mint" />
              {t("calendar.legend.delivered")}
            </span>
          </div>
        </div>
        <MonthGrid
          monthLabel={monthMeta.monthLabel}
          leadingBlankSlots={monthMeta.leadingBlankSlots}
          days={processedDays}
          variant="customer"
          showLegend={false}
          renderFooter={(day) => (
            <>
              <div>{day.dateLabel}</div>
              <div>{t("calendar.addOns", { count: day.itemCount ?? 0 })}</div>
            </>
          )}
        />
        <div className="row gap-2 mt-3" style={{ flexWrap: "wrap" }}>
          <span className="chip mint"><span className="status-dot mint" />{t("calendar.legend.delivered")}</span>
          <span className="chip sun"><span className="status-dot sun" />{t("calendar.legend.paused")}</span>
          <span className="chip rose"><span className="status-dot rose" />{t("calendar.legend.skipped")}</span>
        </div>
      </section>

      {/* Secondary stats */}
      <div className="section-head">
        <h3>{t("calendar.avgPerDay")}</h3>
      </div>
      <article className="list-item">
        <div className="thumb">
          <Droplets className="h-5 w-5" />
        </div>
        <div className="meta">
          <strong>{t("calendar.avgPerDay")}</strong>
          <span>
            {(summary.totalLiters / Math.max(summary.deliveredDays, 1)).toFixed(1)}{" "}
            {t("common.liters")}
          </span>
        </div>
      </article>
      <article className="list-item">
        <div className="thumb sun">
          <CalendarClock className="h-5 w-5" />
        </div>
        <div className="meta">
          <strong>{t("calendar.pausedDays")}</strong>
          <span>{t("calendar.pausedCount", { count: summary.pausedDays })}</span>
        </div>
      </article>
      <article className="list-item">
        <div className="thumb mint">
          <CircleDollarSign className="h-5 w-5" />
        </div>
        <div className="meta">
          <strong>{t("calendar.billingRate")}</strong>
          <span>
            {t("calendar.perLiter", { amount: formatCurrencyINR(customer.rate) })}
          </span>
        </div>
      </article>
    </CustomerShell>
  );
}
