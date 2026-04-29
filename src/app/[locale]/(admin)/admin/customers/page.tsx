import { getTranslations, setRequestLocale } from "next-intl/server";
import { AdminShell } from "@/components/layout/admin-shell";
import { CustomerList } from "@/components/customers/customer-list";
import { getCustomerListData } from "@/lib/data-service";

type AdminCustomersPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminCustomersPage({
  params,
}: AdminCustomersPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "admin.customers" });
  const customers = await getCustomerListData();

  return (
    <AdminShell locale={locale} title={t("title")} subtitle={t("subtitle")} hideHero={true}>
      <CustomerList customers={customers} locale={locale} />
    </AdminShell>
  );
}
