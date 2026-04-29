import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CalendarDayRecord } from "@/lib/calendar";

type MonthGridProps = {
  monthLabel: string;
  leadingBlankSlots: number;
  days: CalendarDayRecord[];
  variant: "admin" | "customer";
  renderFooter?: (day: CalendarDayRecord) => React.ReactNode;
  /**
   * When true (default for admin), the component renders its built-in English
   * legend. Customer calendar renders its own translated legend, so it passes
   * `showLegend={false}`.
   */
  showLegend?: boolean;
  /** Optional translated labels for the built-in legend. */
  legendLabels?: { delivered: string; paused: string; skipped: string };
  onDateClick?: (dateKey: string) => void;
};

const weekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getToneClass(day: CalendarDayRecord, variant: "admin" | "customer") {
  const { status, skippedCount, pausedCount } = day;

  if (status === "PENDING") {
    return "bg-[var(--admin-panel-muted)] opacity-60";
  }

  if (variant === "admin") {
    // Priority: Skipped (Red) > Paused (Yellow) > Delivered (Green)
    if (skippedCount && skippedCount > 0) {
      return "bg-[var(--admin-danger-soft)] hover:bg-[var(--admin-danger-soft)]/80";
    }

    if (pausedCount && pausedCount > 0) {
      return "bg-[var(--admin-warning-soft)] hover:bg-[var(--admin-warning-soft)]/80";
    }

    return "bg-[var(--admin-success-soft)] hover:bg-[var(--admin-success-soft)]/80";
  }

  if (status === "DELIVERED") {
    return "bg-emerald-50";
  }

  if (status === "PAUSED") {
    return "bg-amber-50";
  }

  return "bg-rose-50";
}

export function MonthGrid({
  monthLabel,
  leadingBlankSlots,
  days,
  variant,
  renderFooter,
  showLegend = true,
  legendLabels,
  onDateClick,
}: MonthGridProps) {
  const labels = legendLabels ?? {
    delivered: "Delivered",
    paused: "Paused",
    skipped: "Skipped",
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2
          className={cn(
            "text-lg font-semibold",
            variant === "admin" ? "text-[var(--admin-text)]" : "text-foreground",
          )}
        >
          {monthLabel}
        </h2>
        {showLegend ? (
          <div className="flex flex-wrap gap-2">
            {[
              [labels.delivered, "bg-emerald-100 text-emerald-700"],
              [labels.paused, "bg-amber-100 text-amber-700"],
              [labels.skipped, "bg-rose-100 text-rose-700"],
            ].map(([label, style]) => (
              <span
                key={label}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
                  style,
                )}
              >
                {label}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div
        className={cn(
          "grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.16em]",
          variant === "admin" ? "text-[var(--admin-muted)]" : "text-muted",
        )}
      >
        {weekLabels.map((label) => (
          <div key={label} className="py-2">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {Array.from({ length: leadingBlankSlots }).map((_, index) => (
          <div key={`blank-${index}`} className="hidden min-h-[140px] rounded-[24px] sm:block" />
        ))}

        {days.map((day) => {
          const isFuture = day.isFuture;
          const isToday = day.dateKey === today;

          return (
            <article
              key={day.dateKey}
              onClick={() => !isFuture && onDateClick?.(day.dateKey)}
              className={cn(
                "group relative flex min-h-[140px] flex-col rounded-[24px] border p-3 transition-all duration-200",
                variant === "admin"
                  ? "border-[var(--admin-border)] text-[var(--admin-text)]"
                  : "border-border text-foreground",
                getToneClass(day, variant),
                !isFuture && "cursor-pointer",
                isFuture && "border-dashed",
                isToday && "ring-2 ring-[var(--admin-primary-strong)] ring-offset-2"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={cn("text-base font-bold", isToday && "text-[var(--admin-primary-strong)]")}>
                    {day.dayOfMonth}
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-wider opacity-60">
                    {day.weekdayLabel}
                  </p>
                </div>
                {isToday && (
                  <span className="rounded-full bg-[var(--admin-primary-strong)] px-1.5 py-0.5 text-[8px] font-bold text-white uppercase">
                    Today
                  </span>
                )}
                {isFuture && (
                  <span className="rounded-full bg-slate-200 px-1.5 py-0.5 text-[8px] font-bold text-slate-500 uppercase">
                    Upcoming
                  </span>
                )}
              </div>

              <div className="mt-auto flex flex-col gap-1.5">
                {!isFuture ? (
                  <>
                    <div className="flex flex-wrap gap-1">
                      <div className="flex items-center gap-1 rounded-md bg-white/60 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
                        <span>D: {day.deliveredCount || 0}</span>
                      </div>
                      {(day.pausedCount || 0) > 0 && (
                        <div className="flex items-center gap-1 rounded-md bg-white/60 px-1.5 py-0.5 text-[9px] font-bold text-amber-700">
                          <span>P: {day.pausedCount}</span>
                        </div>
                      )}
                      {(day.skippedCount || 0) > 0 && (
                        <div className="flex items-center gap-1 rounded-md bg-white/60 px-1.5 py-0.5 text-[9px] font-bold text-rose-700">
                          <span>S: {day.skippedCount}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xl font-black tracking-tight">
                      {day.liters.toFixed(1)}<span className="ml-0.5 text-xs font-bold opacity-60">L</span>
                    </p>
                  </>
                ) : (
                  <div className="h-10 w-full rounded-xl bg-slate-100/30" />
                )}
              </div>
              
              {!isFuture && (
                <div className="absolute right-2 bottom-2 translate-y-1 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
                    <ChevronRight className="h-3 w-3 text-[var(--admin-text)]" />
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
