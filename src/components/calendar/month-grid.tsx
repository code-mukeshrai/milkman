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
};

const weekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getToneClass(status: CalendarDayRecord["status"], variant: "admin" | "customer") {
  if (variant === "admin") {
    if (status === "DELIVERED") {
      return "bg-[var(--admin-success-soft)]";
    }

    if (status === "PAUSED") {
      return "bg-[var(--admin-warning-soft)]";
    }

    return "bg-[var(--admin-danger-soft)]";
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
}: MonthGridProps) {
  const labels = legendLabels ?? {
    delivered: "Delivered",
    paused: "Paused",
    skipped: "Skipped",
  };

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
          <div key={`blank-${index}`} className="hidden min-h-[118px] rounded-[20px] sm:block" />
        ))}

        {days.map((day) => (
          <article
            key={day.dateKey}
            className={cn(
              "min-h-[118px] rounded-[20px] border p-2.5 sm:p-3",
              variant === "admin"
                ? "border-[var(--admin-border)] text-[var(--admin-text)]"
                : "border-border text-foreground",
              getToneClass(day.status, variant),
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold">{day.dayOfMonth}</p>
                <p className="text-[10px] font-medium opacity-70">{day.weekdayLabel}</p>
              </div>
              <span
                className={cn(
                  "rounded-full px-2 py-1 text-[10px] font-semibold uppercase",
                  day.status === "DELIVERED" && "bg-white/80 text-emerald-700",
                  day.status === "PAUSED" && "bg-white/80 text-amber-700",
                  day.status === "SKIPPED" && "bg-white/80 text-rose-700",
                )}
              >
                {day.status}
              </span>
            </div>

            <div className="mt-3">
              <p className="text-lg font-semibold">{day.liters.toFixed(1)} L</p>
              {renderFooter ? (
                <div className="mt-2 text-[11px] leading-5 opacity-80">{renderFooter(day)}</div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
