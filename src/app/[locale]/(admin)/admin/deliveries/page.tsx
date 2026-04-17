import { Clock3, PauseCircle, Truck } from "lucide-react";
import { DeliveryOperationsPanel } from "@/components/deliveries/delivery-operations-panel";
import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCard, AdminStatCard } from "@/components/layout/admin-ui";
import { getDeliveryOperationOptions, getTodayDeliveriesData } from "@/lib/data-service";

type AdminDeliveriesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminDeliveriesPage({
  params,
}: AdminDeliveriesPageProps) {
  const { locale } = await params;
  const [entries, options] = await Promise.all([
    getTodayDeliveriesData(),
    getDeliveryOperationOptions(),
  ]);

  const deliveredCount = entries.filter((entry) => entry.status === "DELIVERED").length;
  const pausedOrSkippedCount = entries.filter(
    (entry) => entry.status === "PAUSED" || entry.status === "SKIPPED",
  ).length;
  const pendingCount = entries.filter((entry) => entry.status === "PENDING").length;

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "आज की डिलीवरी" : "Today's Deliveries"}
      subtitle={
        locale === "hi"
          ? "मोबाइल पर जल्दी mark करने, extra milk जोड़ने और add-on products save करने के लिए."
          : "One-tap actions for delivery marking, extra milk overrides, and add-on products."
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          label="Delivered"
          value={String(deliveredCount)}
          hint="Saved directly from today's delivery records"
          icon={Truck}
          tone="success"
        />
        <AdminStatCard
          label="Pending"
          value={String(pendingCount)}
          hint="Needs doorstep confirmation or status update"
          icon={Clock3}
          tone="warning"
        />
        <AdminStatCard
          label="Paused/Skipped"
          value={String(pausedOrSkippedCount)}
          hint="Temporary plan changes or no-delivery entries"
          icon={PauseCircle}
          tone="danger"
        />
      </div>

      <AdminCard>
        <p className="text-sm text-[var(--admin-muted)]">
          Super admin can mark delivered customers, save one-time extra milk, and attach ad hoc
          products like ghee or lassi for the same date without breaking monthly analytics.
        </p>
      </AdminCard>

      <DeliveryOperationsPanel
        entries={entries}
        customers={options.customers.map((customer) => ({
          customerCode: customer.customerCode,
          name: customer.name,
        }))}
        products={options.products.map((product) => ({
          code: product.code,
          name: product.name,
          category: product.category,
        }))}
      />
    </AdminShell>
  );
}
