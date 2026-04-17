import { Clock3, MapPin, MoveRight, PauseCircle, ShieldAlert, Truck } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminSelect,
  AdminStatCard,
} from "@/components/layout/admin-ui";
import { demoDeliveries } from "@/lib/demo-data";

type AdminDeliveriesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminDeliveriesPage({
  params,
}: AdminDeliveriesPageProps) {
  const { locale } = await params;

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "आज की डिलीवरी" : "Today's Deliveries"}
      subtitle={
        locale === "hi"
          ? "मोबाइल पर जल्दी mark करने के लिए one-tap actions."
          : "One-tap actions for fast delivery marking on mobile."
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          label="Delivered"
          value="94"
          hint="Marked successfully by morning run"
          icon={Truck}
          tone="success"
        />
        <AdminStatCard
          label="Pending"
          value="34"
          hint="Needs doorstep confirmation"
          icon={Clock3}
          tone="warning"
        />
        <AdminStatCard
          label="Paused/Skipped"
          value="08"
          hint="Temporary plan changes recorded"
          icon={PauseCircle}
          tone="danger"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <AdminCard>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--admin-text)]">Live route board</h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                Swipe-friendly delivery cards for phones and compact tablets.
              </p>
            </div>
            <AdminBadge tone="blue">
              <MapPin className="h-3.5 w-3.5" />
              Green Park route live
            </AdminBadge>
          </div>

          <div className="mt-5 space-y-3">
            {demoDeliveries.map((task) => (
              <article key={task.customerId} className="admin-panel-muted rounded-[26px] p-4">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold text-[var(--admin-text)]">
                        {task.customerName}
                      </h2>
                      <AdminBadge tone={task.status === "Delivered" ? "success" : "warning"}>
                        {task.status}
                      </AdminBadge>
                    </div>
                    <p className="mt-1 text-sm text-[var(--admin-muted)]">
                      {task.quantityLabel} planned for today • {task.route} • ETA {task.eta}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-[var(--admin-muted)]">
                      <span className="rounded-full bg-white px-3 py-1.5">Morning slot</span>
                      <span className="rounded-full bg-white px-3 py-1.5">Area verified</span>
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-3 xl:w-[420px]">
                    <AdminButton className="justify-center">Delivered</AdminButton>
                    <AdminButton variant="secondary" className="justify-center">
                      Skip
                    </AdminButton>
                    <AdminButton variant="secondary" className="justify-center">
                      Pause
                    </AdminButton>
                  </div>
                </div>

                <div className="admin-divider my-5" />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--admin-muted)]">
                    <ShieldAlert className="h-4 w-4 text-[var(--admin-primary-strong)]" />
                    <span>{task.note}</span>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--admin-primary-strong)]"
                  >
                    View full log
                    <MoveRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </AdminCard>

        <AdminCard>
          <div>
            <h2 className="text-lg font-semibold text-[var(--admin-text)]">Bulk mark delivery</h2>
            <p className="mt-1 text-sm text-[var(--admin-muted)]">
              Use this compact form to mark route status or record a route-level note.
            </p>
          </div>

          <form className="mt-5 space-y-4">
            <AdminField label="Customer">
              <AdminSelect defaultValue="neha-sharma">
                <option value="amit-verma">Amit Verma</option>
                <option value="neha-sharma">Neha Sharma</option>
                <option value="rakesh-kumar">Rakesh Kumar</option>
              </AdminSelect>
            </AdminField>

            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Quantity delivered">
                <AdminInput defaultValue="1.5" />
              </AdminField>
              <AdminField label="Status">
                <AdminSelect defaultValue="PENDING">
                  <option value="DELIVERED">Delivered</option>
                  <option value="SKIPPED">Skipped</option>
                  <option value="PAUSED">Paused</option>
                </AdminSelect>
              </AdminField>
            </div>

            <AdminField label="Delivery note" hint="Visible in the daily admin record">
              <AdminInput defaultValue="Ring bell once, no doorstep knock" />
            </AdminField>

            <div className="grid gap-2 sm:grid-cols-3">
              <AdminButton className="justify-center">Mark delivered</AdminButton>
              <AdminButton variant="secondary" className="justify-center">
                Save skip
              </AdminButton>
              <AdminButton variant="outline" className="justify-center">
                Save pause
              </AdminButton>
            </div>
          </form>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
