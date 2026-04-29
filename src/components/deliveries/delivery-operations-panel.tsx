"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Check, Filter, MapPin, Minus, Pause, Play, Plus, X } from "lucide-react";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminSelect,
} from "@/components/layout/admin-ui";
import { formatCurrencyINR } from "@/lib/utils";

type DeliveryStatus = "ALL" | "DELIVERED" | "SKIPPED" | "PAUSED" | "PENDING";

type DeliveryEntry = {
  customerCode: string;
  customerName: string;
  quantityLabel: string;
  status: Exclude<DeliveryStatus, "ALL">;
  dueAmount: number;
  route: string;
  areaCode: string;
  note: string;
};

type DeliveryOperationsPanelProps = {
  entries: DeliveryEntry[];
  areas: Array<{ code: string; name: string }>;
  counts: {
    delivered: number;
    skipped: number;
    paused: number;
    pending: number;
    total: number;
  };
  filters: {
    date: string;
    area: string;
    status: DeliveryStatus;
  };
  locale: string;
  startRun: boolean;
};

const statusOptions: Array<{ value: DeliveryStatus; label: string }> = [
  { value: "ALL", label: "All" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "SKIPPED", label: "Skipped" },
  { value: "PAUSED", label: "Paused" },
  { value: "PENDING", label: "Pending" },
];

function getStatusTone(status: DeliveryEntry["status"]) {
  if (status === "DELIVERED") return "success";
  if (status === "PAUSED") return "warning";
  if (status === "SKIPPED") return "danger";
  return "blue";
}

export function DeliveryOperationsPanel({
  entries,
  areas,
  counts,
  filters,
  locale,
  startRun,
}: DeliveryOperationsPanelProps) {
  const router = useRouter();
  const [localEntries, setLocalEntries] = useState(entries);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [isLocationOpen, setIsLocationOpen] = useState(startRun);
  const [locationOptions, setLocationOptions] = useState(areas);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [locationError, setLocationError] = useState("");

  const STATUS_PRIORITY: Record<string, number> = {
    PENDING: 1,
    PAUSED: 2,
    SKIPPED: 3,
    DELIVERED: 4,
  };

  useEffect(() => {
    setLocalEntries(entries);
  }, [entries]);

  const sortedEntries = useMemo(() => {
    return [...localEntries].sort((a, b) => {
      const pA = STATUS_PRIORITY[a.status] || 5;
      const pB = STATUS_PRIORITY[b.status] || 5;
      if (pA !== pB) return pA - pB;
      return a.customerName.localeCompare(b.customerName);
    });
  }, [localEntries]);

  const selectedAreaName = useMemo(
    () => areas.find((area) => area.code === filters.area)?.name || "All locations",
    [areas, filters.area],
  );

  useEffect(() => {
    if (startRun) {
      openLocationSelector();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startRun]);

  function updateFilters(nextFilters: Partial<typeof filters>) {
    const params = new URLSearchParams();
    const next = { ...filters, ...nextFilters };

    if (next.date) params.set("date", next.date);
    if (next.area) params.set("area", next.area);
    if (next.status !== "ALL") params.set("status", next.status);

    router.push(`/${locale}/admin/deliveries?${params.toString()}`);
  }

  async function openLocationSelector() {
    setIsLocationOpen(true);
    setLocationError("");
    setIsLoadingLocations(true);

    try {
      const response = await fetch("/api/areas", { cache: "no-store" });
      const data = (await response.json()) as {
        areas?: Array<{ code: string; name: string; isActive?: boolean }>;
      };
      const areaPayload: Array<{ code: string; name: string; isActive?: boolean }> =
        data.areas || areas;
      const activeAreas = areaPayload
        .filter((area) => area.isActive !== false)
        .map((area) => ({ code: area.code, name: area.name }));
      setLocationOptions(activeAreas);
    } catch {
      setLocationError("Unable to load locations. Showing cached locations.");
      setLocationOptions(areas);
    } finally {
      setIsLoadingLocations(false);
    }
  }

  function selectLocation(areaCode: string) {
    if (areaCode) {
      window.localStorage.setItem("milkman:last-area", areaCode);
    }
    setIsLocationOpen(false);
    updateFilters({ area: areaCode, status: "ALL" });
  }

  async function saveStatus(
    customerCode: string,
    type: "DELIVERED" | "SKIPPED" | "PAUSED",
    currentStatus: string
  ) {
    const isTogglingOff = currentStatus === type;
    setLoadingKey(`${customerCode}:${type}`);

    // Optimistic update
    setLocalEntries((prev) =>
      prev.map((entry) =>
        entry.customerCode === customerCode 
          ? { ...entry, status: isTogglingOff ? "PENDING" : type } 
          : entry
      )
    );

    try {
      if (isTogglingOff) {
        await fetch(`/api/deliveries?customerCode=${customerCode}&date=${filters.date}`, {
          method: "DELETE",
        });
      } else {
        await fetch("/api/deliveries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customerCode, type, date: filters.date }),
        });
      }
      router.refresh();
    } catch (error) {
      console.error("Failed to save status:", error);
      setLocalEntries(entries);
    } finally {
      setLoadingKey(null);
    }
  }

  async function updateCustomerQuantity(customerCode: string, newQuantity: number) {
    if (newQuantity < 0) return;

    // Optimistic update
    setLocalEntries((prev) =>
      prev.map((entry) =>
        entry.customerCode === customerCode
          ? {
              ...entry,
              quantityLabel: `${newQuantity.toFixed(1)} L`,
            }
          : entry
      )
    );

    try {
      const response = await fetch(`/api/customers/${customerCode}/quantity`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantityLiters: newQuantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }
      router.refresh();
    } catch (error) {
      console.error(error);
      setLocalEntries(entries);
    }
  }

  return (
    <AdminCard className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-[var(--admin-primary-strong)]" />
            <h2 className="text-lg font-semibold text-[var(--admin-text)]">Delivery filters</h2>
          </div>
          <p className="mt-1 text-sm text-[var(--admin-muted)]">
            {selectedAreaName} · {counts.total} customers · {counts.pending} pending
          </p>
        </div>
        <AdminButton onClick={openLocationSelector} className="w-full sm:w-auto">
          <Play className="h-4 w-4" />
          Start Morning Run
        </AdminButton>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <AdminField label="Date">
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-muted)]" />
            <AdminInput
              type="date"
              value={filters.date}
              onChange={(event) => updateFilters({ date: event.target.value })}
              className="pl-10"
            />
          </div>
        </AdminField>
        <AdminField label="Status">
          <AdminSelect
            value={filters.status}
            onChange={(event) => updateFilters({ status: event.target.value as DeliveryStatus })}
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </AdminSelect>
        </AdminField>
        <AdminField label="Location">
          <AdminSelect
            value={filters.area}
            onChange={(event) => updateFilters({ area: event.target.value })}
          >
            <option value="">All locations</option>
            {areas.map((area) => (
              <option key={area.code} value={area.code}>
                {area.name}
              </option>
            ))}
          </AdminSelect>
        </AdminField>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="admin-panel-muted rounded-[16px] px-3 py-3">
          <p className="text-xs font-semibold text-[var(--admin-muted)]">Delivered</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--admin-text)]">{counts.delivered}</p>
        </div>
        <div className="admin-panel-muted rounded-[16px] px-3 py-3">
          <p className="text-xs font-semibold text-[var(--admin-muted)]">Skipped</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--admin-text)]">{counts.skipped}</p>
        </div>
        <div className="admin-panel-muted rounded-[16px] px-3 py-3">
          <p className="text-xs font-semibold text-[var(--admin-muted)]">Paused</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--admin-text)]">{counts.paused}</p>
        </div>
        <div className="admin-panel-muted rounded-[16px] px-3 py-3">
          <p className="text-xs font-semibold text-[var(--admin-muted)]">Pending</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--admin-text)]">{counts.pending}</p>
        </div>
      </div>

      {counts.total > 0 && counts.delivered + counts.skipped + counts.paused === 0 ? (
        <div className="rounded-[18px] border border-[var(--admin-border)] bg-white px-4 py-3 text-sm text-[var(--admin-muted)]">
          No saved delivery records for this date yet. Pending customers are ready for marking.
        </div>
      ) : null}

      <div className="max-h-[72vh] space-y-2 overflow-y-auto pr-1">
        {entries.length === 0 ? (
          <div className="admin-panel-muted rounded-[20px] px-4 py-8 text-center">
            <MapPin className="mx-auto h-8 w-8 text-[var(--admin-primary-strong)]" />
            <h3 className="mt-3 text-base font-semibold text-[var(--admin-text)]">
              {counts.total === 0 && filters.area
                ? "No customers in this location"
                : "No deliveries match these filters"}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--admin-muted)]">
              {counts.total === 0 && filters.area
                ? "Choose another location or add customers with this area mapping."
                : "Try All status, another date, or a different location."}
            </p>
          </div>
        ) : null}

        {sortedEntries.map((task) => (
          <article
            key={task.customerCode}
            className={`admin-panel-muted rounded-[16px] px-3 py-2.5 transition-all duration-300 ${
              task.status === "DELIVERED" ? "opacity-70" : "opacity-100"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="truncate text-sm font-semibold text-[var(--admin-text)]">
                    {task.customerName}
                  </h2>
                  <AdminBadge tone={getStatusTone(task.status)}>{task.status}</AdminBadge>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <button
                    onClick={() => {
                      const current = parseFloat(task.quantityLabel);
                      updateCustomerQuantity(task.customerCode, Math.max(0, current - 0.5));
                    }}
                    className="flex h-6 w-6 items-center justify-center rounded-md border border-[var(--admin-border)] bg-white text-[var(--admin-text)] transition hover:bg-[var(--admin-panel-muted)] active:scale-95"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <p className="min-w-[3rem] text-center text-xs font-bold text-[var(--admin-primary-strong)]">
                    {task.quantityLabel}
                  </p>
                  <button
                    onClick={() => {
                      const current = parseFloat(task.quantityLabel);
                      updateCustomerQuantity(task.customerCode, current + 0.5);
                    }}
                    className="flex h-6 w-6 items-center justify-center rounded-md border border-[var(--admin-border)] bg-white text-[var(--admin-text)] transition hover:bg-[var(--admin-panel-muted)] active:scale-95"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  <span className="text-[10px] text-[var(--admin-muted)]">· {task.route}</span>
                </div>
                {task.note ? (
                  <p className="mt-1 truncate text-xs text-[var(--admin-muted)]">{task.note}</p>
                ) : null}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <div className="w-[78px] text-right">
                  <p
                    className={
                      task.dueAmount > 500
                        ? "text-sm font-bold text-[#d14646]"
                        : "text-sm font-semibold text-[var(--admin-text)]"
                    }
                  >
                    {formatCurrencyINR(task.dueAmount)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => saveStatus(task.customerCode, "DELIVERED", task.status)}
                  disabled={loadingKey !== null}
                  className={`admin-primary-button h-9 w-9 justify-center p-0 text-sm disabled:opacity-60 ${
                    task.status === "DELIVERED" ? "ring-2 ring-offset-2 ring-[var(--admin-primary-strong)]" : ""
                  }`}
                  aria-label={`Mark ${task.customerName} delivered`}
                  title="Delivered"
                >
                  {loadingKey === `${task.customerCode}:DELIVERED` ? "..." : <Check className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => saveStatus(task.customerCode, "SKIPPED", task.status)}
                  disabled={loadingKey !== null}
                  className={`admin-secondary-button h-9 w-9 justify-center p-0 text-sm disabled:opacity-60 ${
                    task.status === "SKIPPED" ? "ring-2 ring-offset-2 ring-red-500" : ""
                  }`}
                  aria-label={`Skip ${task.customerName}`}
                  title="Skip"
                >
                  {loadingKey === `${task.customerCode}:SKIPPED` ? "..." : <X className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => saveStatus(task.customerCode, "PAUSED", task.status)}
                  disabled={loadingKey !== null}
                  className={`admin-outline-button h-9 w-9 justify-center p-0 text-sm disabled:opacity-60 ${
                    task.status === "PAUSED" ? "ring-2 ring-offset-2 ring-yellow-500" : ""
                  }`}
                  aria-label={`Pause ${task.customerName}`}
                  title="Pause"
                >
                  {loadingKey === `${task.customerCode}:PAUSED` ? "..." : <Pause className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {isLocationOpen ? (
        <div className="fixed inset-0 z-50 flex items-end bg-black/35 p-3 sm:items-center sm:justify-center">
          <div className="admin-panel w-full max-w-lg rounded-[24px] p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-[var(--admin-text)]">
                  Select route location
                </h2>
                <p className="mt-1 text-sm text-[var(--admin-muted)]">
                  Pick one area to load only its customers for the morning run.
                </p>
              </div>
              <button
                type="button"
                className="admin-secondary-button h-9 w-9 p-0"
                onClick={() => setIsLocationOpen(false)}
                aria-label="Close location selector"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid max-h-[52vh] gap-2 overflow-y-auto pr-1">
              {isLoadingLocations ? (
                <div className="admin-panel-muted rounded-[16px] px-4 py-3 text-sm text-[var(--admin-muted)]">
                  Loading locations...
                </div>
              ) : null}
              {locationError ? (
                <div className="rounded-[16px] border border-[var(--admin-border)] bg-white px-4 py-3 text-sm text-[var(--admin-muted)]">
                  {locationError}
                </div>
              ) : null}
              <button
                type="button"
                className="admin-secondary-button justify-between px-4 py-3 text-left text-sm font-semibold"
                onClick={() => selectLocation("")}
              >
                <span>All locations</span>
                <MapPin className="h-4 w-4" />
              </button>
              {locationOptions.map((area) => (
                <button
                  key={area.code}
                  type="button"
                  className="admin-secondary-button justify-between px-4 py-3 text-left text-sm font-semibold"
                  onClick={() => selectLocation(area.code)}
                >
                  <span>{area.name}</span>
                  <MapPin className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </AdminCard>
  );
}
