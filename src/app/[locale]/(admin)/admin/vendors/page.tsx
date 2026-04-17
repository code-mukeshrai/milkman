import { VendorManagementPanel } from "@/components/vendors/vendor-management-panel";
import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCard } from "@/components/layout/admin-ui";
import { getAreasData, getVendorsData } from "@/lib/data-service";

type AdminVendorsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminVendorsPage({ params }: AdminVendorsPageProps) {
  const { locale } = await params;
  const [vendors, areas] = await Promise.all([getVendorsData(), getAreasData()]);

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "वेंडर्स" : "Vendors"}
      subtitle={
        locale === "hi"
          ? "बाहरी दूध suppliers और उनकी area mapping यहाँ manage करें."
          : "Manage external milk suppliers and their area mapping here."
      }
    >
      <AdminCard>
        <p className="text-sm text-[var(--admin-muted)]">
          Vendor master data feeds the daily purchase ledger, inward milk tracking, and unpaid
          supplier visibility.
        </p>
      </AdminCard>
      <VendorManagementPanel
        initialVendors={vendors}
        areas={areas.map((area) => ({ code: area.code, name: area.name }))}
      />
    </AdminShell>
  );
}
