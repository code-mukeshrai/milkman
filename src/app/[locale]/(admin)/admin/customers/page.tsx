import Link from "next/link";
import { CirclePlus, Filter, Search, UserRound } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AdminShell } from "@/components/layout/admin-shell";
import { AdminButton, AdminCard } from "@/components/layout/admin-ui";
import { CustomerCardActions } from "@/components/customers/customer-card-actions";
import { getCustomerListData } from "@/lib/data-service";
import { formatCurrencyINR } from "@/lib/utils";

type AdminCustomersPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminCustomersPage({
  params,
}: AdminCustomersPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "admin.customers" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const customers = await getCustomerListData();

  return (
    <AdminShell locale={locale} title={t("title")} subtitle={t("subtitle")}>
      <AdminCard>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--admin-text)]">{t("listTitle")}</h2>
            <p className="mt-1 text-sm text-[var(--admin-muted)]">{t("listSubtitle")}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="admin-secondary-button w-full justify-start gap-3 px-4 py-3 sm:w-[280px]">
              <Search className="h-4 w-4 text-[var(--admin-muted)]" />
              <span className="text-sm font-medium text-[var(--admin-muted)]">
                {t("searchPlaceholder")}
              </span>
            </div>
            <AdminButton variant="secondary">
              <Filter className="h-4 w-4" />
              {tCommon("filter")}
            </AdminButton>
            <Link
              href={`/${locale}/admin/customers/new`}
              className="admin-primary-button px-4 py-3 text-sm font-semibold"
            >
              <CirclePlus className="h-4 w-4" />
              {t("addCustomer")}
            </Link>
          </div>
        </div>
      </AdminCard>

      <section className="grid gap-3">
        {customers.map((customer) => (
          <article key={customer.customerCode} className="admin-panel rounded-[18px] px-3 py-3 sm:px-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--admin-primary-soft)] text-[var(--admin-primary-strong)] sm:flex">
                  <UserRound className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-[var(--admin-text)]">{customer.name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-[var(--admin-muted)]">
                    {customer.quantityLabel}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <div className="text-right">
                  <p
                    className={
                      customer.due > 500
                        ? "text-sm font-bold text-[#d14646]"
                        : "text-sm font-semibold text-[var(--admin-text)]"
                    }
                  >
                    {formatCurrencyINR(customer.due)}
                  </p>
                  <p className="text-[11px] font-semibold uppercase text-[var(--admin-muted)]">
                    {t("due")}
                  </p>
                </div>
                <CustomerCardActions customerCode={customer.customerCode} locale={locale} />
              </div>
            </div>
          </article>
        ))}
      </section>
    </AdminShell>
  );
}
