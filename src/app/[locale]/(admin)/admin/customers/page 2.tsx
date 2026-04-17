import Link from "next/link";
import { CirclePlus, Eye, FilePenLine, Filter, Search, UserRound } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { AdminBadge, AdminButton, AdminCard } from "@/components/layout/admin-ui";
import { demoCustomers } from "@/lib/demo-data";
import { formatCurrencyINR } from "@/lib/utils";

type AdminCustomersPageProps = {
  params: Promise<{ locale: string }>;
};

function getStatusTone(status: "ACTIVE" | "PAUSED" | "INACTIVE") {
  if (status === "ACTIVE") return "success";
  if (status === "PAUSED") return "warning";
  return "danger";
}

export default async function AdminCustomersPage({
  params,
}: AdminCustomersPageProps) {
  const { locale } = await params;

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "कस्टमर मैनेजमेंट" : "Customer Management"}
      subtitle={
        locale === "hi"
          ? "कस्टमर प्रोफाइल, दूध की मात्रा और बकाया रिकॉर्ड एक जगह."
          : "Manage customer profiles, milk quantities, and outstanding balances in one place."
      }
    >
      <AdminCard>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--admin-text)]">Customer list</h2>
            <p className="mt-1 text-sm text-[var(--admin-muted)]">
              Search, filter, and open complete customer records from the same screen.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="admin-secondary-button w-full justify-start gap-3 px-4 py-3 sm:w-[280px]">
              <Search className="h-4 w-4 text-[var(--admin-muted)]" />
              <span className="text-sm font-medium text-[var(--admin-muted)]">Search customer</span>
            </div>
            <AdminButton variant="secondary">
              <Filter className="h-4 w-4" />
              Filter
            </AdminButton>
            <Link
              href={`/${locale}/admin/customers/new`}
              className="admin-primary-button px-4 py-3 text-sm font-semibold"
            >
              <CirclePlus className="h-4 w-4" />
              Add customer
            </Link>
          </div>
        </div>
      </AdminCard>

      <section className="grid gap-3">
        {demoCustomers.map((customer) => (
          <article key={customer.id} className="admin-panel rounded-[28px] p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--admin-primary-soft)] text-[var(--admin-primary-strong)]">
                  <UserRound className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-[var(--admin-text)]">{customer.name}</h3>
                    <AdminBadge tone={getStatusTone(customer.status)}>{customer.status}</AdminBadge>
                    <AdminBadge tone={customer.due > 0 ? "warning" : "success"}>
                      {customer.due > 0 ? "Due pending" : "Up to date"}
                    </AdminBadge>
                  </div>
                  <p className="mt-1 text-sm text-[var(--admin-muted)]">{customer.area}</p>
                  <p className="mt-1 text-sm text-[var(--admin-muted)]">{customer.address}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--admin-muted)]">
                    Code • MK-{customer.name.split(" ")[0].toUpperCase()} • {customer.deliverySlot}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[470px]">
                <div className="rounded-[20px] bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">
                    Plan
                  </p>
                  <p className="mt-2 text-base font-semibold text-[var(--admin-text)]">
                    {customer.quantityLabel}
                  </p>
                </div>
                <div className="rounded-[20px] bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">
                    Rate
                  </p>
                  <p className="mt-2 text-base font-semibold text-[var(--admin-text)]">
                    {formatCurrencyINR(customer.rate)}
                  </p>
                </div>
                <div className="rounded-[20px] bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">
                    Due
                  </p>
                  <p className="mt-2 text-base font-semibold text-[var(--admin-text)]">
                    {formatCurrencyINR(customer.due)}
                  </p>
                </div>
              </div>
            </div>

            <div className="admin-divider my-5" />

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2 text-sm text-[var(--admin-muted)]">
                <span className="admin-panel-muted rounded-full px-3 py-1.5">{customer.phone}</span>
                <span className="admin-panel-muted rounded-full px-3 py-1.5">
                  Notes available
                </span>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  href={`/${locale}/admin/customers/${customer.id}`}
                  className="admin-secondary-button px-4 py-3 text-sm font-semibold"
                >
                  <Eye className="h-4 w-4" />
                  View
                </Link>
                <Link
                  href={`/${locale}/admin/customers/${customer.id}/edit`}
                  className="admin-outline-button px-4 py-3 text-sm font-semibold"
                >
                  <FilePenLine className="h-4 w-4" />
                  Edit
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </AdminShell>
  );
}
