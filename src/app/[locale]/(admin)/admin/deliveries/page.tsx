import { CheckCircle2, PauseCircle, XCircle } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DeliveryOperationsPanel } from "@/components/deliveries/delivery-operations-panel";
import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCard, AdminStatCard } from "@/components/layout/admin-ui";
import { getAreasData, getDeliveryRunData } from "@/lib/data-service";

type AdminDeliveriesPageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminDeliveriesPage({
  params,
  searchParams,
}: AdminDeliveriesPageProps) {
  const { locale } = await params;
  const query = (await searchParams) || {};
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "admin.deliveries" });
  const selectedDate =
    typeof query.date === "string" && query.date ? query.date : new Date().toISOString().slice(0, 10);
  const selectedArea = typeof query.area === "string" ? query.area : "";
  const selectedStatus =
    typeof query.status === "string" &&
    ["ALL", "DELIVERED", "SKIPPED", "PAUSED", "PENDING"].includes(query.status)
      ? query.status
      : "ALL";
  const startRun = query.start === "1";
  const [entries, countEntries, areas] = await Promise.all([
    getDeliveryRunData({
      date: selectedDate,
      areaCode: selectedArea || undefined,
      status: selectedStatus as "ALL" | "DELIVERED" | "SKIPPED" | "PAUSED" | "PENDING",
    }),
    getDeliveryRunData({
      date: selectedDate,
      areaCode: selectedArea || undefined,
      status: "ALL",
    }),
    getAreasData(),
  ]);

  const deliveredCount = countEntries.filter((entry) => entry.status === "DELIVERED").length;
  const skippedCount = countEntries.filter((entry) => entry.status === "SKIPPED").length;
  const pausedCount = countEntries.filter((entry) => entry.status === "PAUSED").length;
  const pendingCount = countEntries.filter((entry) => entry.status === "PENDING").length;

  return (
    <AdminShell locale={locale} title={t("title")} subtitle={t("subtitle")}>
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          label={t("stats.delivered")}
          value={String(deliveredCount)}
          hint={t("stats.deliveredHint")}
          icon={CheckCircle2}
          tone="success"
        />
        <AdminStatCard
          label="Skipped"
          value={String(skippedCount)}
          hint="Exception rows only"
          icon={XCircle}
          tone="danger"
        />
        <AdminStatCard
          label="Paused"
          value={String(pausedCount)}
          hint={t("stats.pausedSkippedHint")}
          icon={PauseCircle}
          tone="warning"
        />
      </div>

      <AdminCard>
        <p className="text-sm text-[var(--admin-muted)]">{t("note")}</p>
      </AdminCard>

      <DeliveryOperationsPanel
        entries={entries}
        areas={areas.map((area) => ({ code: area.code, name: area.name }))}
        counts={{
          delivered: deliveredCount,
          skipped: skippedCount,
          paused: pausedCount,
          pending: pendingCount,
          total: countEntries.length,
        }}
        filters={{
          date: selectedDate,
          area: selectedArea,
          status: selectedStatus as "ALL" | "DELIVERED" | "SKIPPED" | "PAUSED" | "PENDING",
        }}
        locale={locale}
        startRun={startRun}
      />
    </AdminShell>
  );
}
