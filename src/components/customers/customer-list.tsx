"use client";

import { useState } from "react";
import { Filter, Search, CirclePlus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AdminButton, AdminCard } from "@/components/layout/admin-ui";
import { CustomerListItem } from "./customer-list-item";
import { CustomerDetailModal } from "./customer-detail-modal";

type CustomerListProps = {
  customers: any[];
  locale: string;
};

export function CustomerList({ customers, locale }: CustomerListProps) {
  const t = useTranslations("admin.customers");
  const tCommon = useTranslations("common");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'view' | 'details'>('view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleViewCustomer = (customer: any, mode: 'view' | 'details' = 'view') => {
    setSelectedCustomer(customer);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  return (
    <>
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
          <CustomerListItem
            key={customer.id}
            customer={customer}
            locale={locale}
            tDue={t("due")}
            onView={(mode) => handleViewCustomer(customer, mode)}
            isMenuOpen={openMenuId === customer.id}
            setMenuOpen={(isOpen) => setOpenMenuId(isOpen ? customer.id : null)}
          />
        ))}
      </section>

      <CustomerDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={selectedCustomer}
        locale={locale}
        mode={modalMode}
      />
    </>
  );
}
