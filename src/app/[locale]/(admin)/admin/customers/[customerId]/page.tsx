import Link from "next/link";
import { ChevronLeft, FilePenLine, MapPin, Phone, WalletCards } from "lucide-react";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/layout/admin-shell";
import { AdminBadge, AdminCard } from "@/components/layout/admin-ui";
import { getCustomerDetailData } from "@/lib/data-service";
import { formatCurrencyINR } from "@/lib/utils";

type CustomerDetailPageProps = {
  params: Promise<{ locale: string; customerId: string }>;
};

export default async function CustomerDetailPage({ params }: CustomerDetailPageProps) {
  const { locale, customerId } = await params;
  const customer = await getCustomerDetailData(customerId);

  if (!customer) {
    notFound();
  }

  const statusTone =
    customer.status === "ACTIVE"
      ? "success"
      : customer.status === "PAUSED"
        ? "warning"
        : "danger";

  return (
    <AdminShell
      locale={locale}
      title={customer.name}
      subtitle={
        locale === "hi"
          ? "कस्टमर की योजना, पता, भुगतान और डिलीवरी रिकॉर्ड."
          : "Customer plan, address, payments, and delivery records."
      }
    >
      <AdminCard>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/${locale}/admin/customers`} className="admin-icon-button h-11 w-11">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-[var(--admin-text)]">{customer.name}</h2>
                <AdminBadge tone={statusTone}>{customer.status}</AdminBadge>
              </div>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                Customer code • {customer.customerCode} • {customer.areaCode}
              </p>
            </div>
          </div>
          <Link
            href={`/${locale}/admin/customers/${customer.customerCode}/edit`}
            className="admin-outline-button px-4 py-3 text-sm font-semibold"
          >
            <FilePenLine className="h-4 w-4" />
            Edit customer
          </Link>
        </div>
      </AdminCard>

      <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
        <AdminCard>
          <div className="space-y-4">
            <div className="admin-panel-muted rounded-[24px] p-4">
              <div className="flex items-center gap-2 text-[var(--admin-muted)]">
                <Phone className="h-4 w-4" />
                <span className="text-sm">Contact</span>
              </div>
              <p className="mt-2 text-base font-semibold text-[var(--admin-text)]">
                {customer.phone}
              </p>
            </div>

            <div className="admin-panel-muted rounded-[24px] p-4">
              <div className="flex items-center gap-2 text-[var(--admin-muted)]">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Address</span>
              </div>
              <p className="mt-2 text-base font-semibold text-[var(--admin-text)]">
                {customer.address}
              </p>
              <p className="mt-2 text-sm text-[var(--admin-muted)]">
                {customer.areaName} • {customer.areaCode}
              </p>
            </div>

            <div className="admin-panel-muted rounded-[24px] p-4">
              <div className="flex items-center gap-2 text-[var(--admin-muted)]">
                <WalletCards className="h-4 w-4" />
                <span className="text-sm">Notes</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--admin-text)]">
                {customer.notes || "No internal note"}
              </p>
            </div>
          </div>
        </AdminCard>

        <AdminCard>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[22px] bg-[var(--admin-primary-soft)] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">
                Milk plan
              </p>
              <p className="mt-2 text-2xl font-semibold text-[var(--admin-text)]">
                {customer.quantityLabel}
              </p>
            </div>
            <div className="rounded-[22px] bg-white px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">
                Rate
              </p>
              <p className="mt-2 text-2xl font-semibold text-[var(--admin-text)]">
                {formatCurrencyINR(customer.rate)}
              </p>
            </div>
            <div className="rounded-[22px] bg-white px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">
                Due
              </p>
              <p className="mt-2 text-2xl font-semibold text-[var(--admin-text)]">
                {formatCurrencyINR(customer.due)}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="admin-panel-muted rounded-[22px] p-4">
              <p className="text-sm text-[var(--admin-muted)]">Billed this month</p>
              <p className="mt-2 text-xl font-semibold text-[var(--admin-text)]">
                {formatCurrencyINR(customer.billed)}
              </p>
            </div>
            <div className="admin-panel-muted rounded-[22px] p-4">
              <p className="text-sm text-[var(--admin-muted)]">Amount paid</p>
              <p className="mt-2 text-xl font-semibold text-[var(--admin-text)]">
                {formatCurrencyINR(customer.paid)}
              </p>
            </div>
          </div>

          <div className="admin-divider my-5" />

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/admin/deliveries`}
              className="admin-primary-button justify-center px-4 py-3 text-sm font-semibold"
            >
              Mark delivery now
            </Link>
            <Link
              href={`/${locale}/admin/billing`}
              className="admin-secondary-button justify-center px-4 py-3 text-sm font-semibold"
            >
              Record payment
            </Link>
            <Link
              href={`/${locale}/admin/customers/${customer.customerCode}/edit`}
              className="admin-outline-button justify-center px-4 py-3 text-sm font-semibold"
            >
              Update profile
            </Link>
          </div>

          <div className="admin-divider my-5" />

          <div>
            <h3 className="text-base font-semibold text-[var(--admin-text)]">Recent delivery log</h3>
            <div className="mt-4 space-y-3">
              {customer.recentDeliveries.length ? (
                customer.recentDeliveries.map((entry) => (
                  <div
                    key={`${entry.dateLabel}-${entry.status}`}
                    className="admin-panel-muted rounded-[22px] p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[var(--admin-text)]">{entry.dateLabel}</p>
                        <p className="mt-1 text-sm text-[var(--admin-muted)]">
                          {entry.finalQuantity.toFixed(1)} L delivered • Extra{" "}
                          {entry.extraQuantity.toFixed(1)} L
                        </p>
                      </div>
                      <AdminBadge
                        tone={
                          entry.status === "DELIVERED"
                            ? "success"
                            : entry.status === "PAUSED"
                              ? "warning"
                              : "danger"
                        }
                      >
                        {entry.status}
                      </AdminBadge>
                    </div>
                    {entry.addOnItems.length ? (
                      <p className="mt-2 text-sm text-[var(--admin-muted)]">
                        Add-ons:{" "}
                        {entry.addOnItems
                          .map((item) => `${item.productName || item.productCode} x ${item.quantity || 0}`)
                          .join(", ")}
                      </p>
                    ) : null}
                    {entry.note ? (
                      <p className="mt-2 text-sm text-[var(--admin-muted)]">{entry.note}</p>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="admin-panel-muted rounded-[22px] p-4 text-sm text-[var(--admin-muted)]">
                  No delivery log found for the current month.
                </div>
              )}
            </div>
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
