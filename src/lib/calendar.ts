export type CalendarStatus = "DELIVERED" | "SKIPPED" | "PAUSED" | "PENDING";

export type CalendarDayRecord = {
  dateKey: string;
  dateLabel: string;
  dayOfMonth: number;
  weekdayLabel: string;
  liters: number;
  status: CalendarStatus;
  deliveredCount?: number;
  pausedCount?: number;
  skippedCount?: number;
  itemCount?: number;
  isFuture?: boolean;
};

type BuildMonthOptions = {
  year: number;
  month: number;
};

function formatDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatDateLabel(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatWeekdayLabel(date: Date) {
  return new Intl.DateTimeFormat("en-IN", { weekday: "short" }).format(date);
}

export function getMonthMeta({ year, month }: BuildMonthOptions) {
  const firstDate = new Date(Date.UTC(year, month - 1, 1));
  const lastDate = new Date(Date.UTC(year, month, 0));
  const monthLabel = new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(firstDate);

  return {
    year,
    month,
    monthLabel,
    daysInMonth: lastDate.getUTCDate(),
    leadingBlankSlots: firstDate.getUTCDay(),
  };
}

export function buildMonthRecords(
  options: BuildMonthOptions,
  resolver: (date: Date) => { liters: number; status: CalendarStatus },
) {
  const { year, month } = options;
  const { daysInMonth } = getMonthMeta(options);

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const date = new Date(Date.UTC(year, month - 1, day));
    const resolved = resolver(date);

    return {
      dateKey: formatDateKey(date),
      dateLabel: formatDateLabel(date),
      dayOfMonth: day,
      weekdayLabel: formatWeekdayLabel(date),
      liters: resolved.liters,
      status: resolved.status,
    };
  });
}
