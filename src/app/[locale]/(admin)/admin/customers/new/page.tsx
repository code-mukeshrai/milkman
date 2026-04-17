import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CustomerForm } from "@/components/customers/customer-form";
import { AdminShell } from "@/components/layout/admin-shell";
import { AdminBadge, AdminCard } from "@/components/layout/admin-ui";
import { getAreasData } from "@/lib/data-service";

type NewCustomerPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function NewCustomerPage({ params }: NewCustomerPageProps) {
  const { locale } = await params;
  const areas = await getAreasData();

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "नया कस्टमर जोड़ें" : "Add New Customer"}
      subtitle={
        locale === "hi"
          ? "कस्टमर प्रोफाइल, दूध योजना और area mapping दर्ज करें."
          : "Enter the customer profile, milk plan, and area mapping."
      }
    >
      <AdminCard>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/${locale}/admin/customers`} className="admin-icon-button h-11 w-11">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div>
              <h2 className="text-lg font-semibold text-[var(--admin-text)]">
                Customer onboarding form
              </h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                Designed for quick mobile data entry during route setup.
              </p>
            </div>
          </div>
          <AdminBadge tone="blue">Live create flow</AdminBadge>
        </div>
      </AdminCard>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <CustomerForm
          locale={locale}
          mode="create"
          areas={areas.map((area) => ({ code: area.code, name: area.name }))}
        />

        <AdminCard>
          <h2 className="text-lg font-semibold text-[var(--admin-text)]">Setup checklist</h2>
          <div className="mt-4 space-y-3">
            {[
              "Capture phone and exact address",
              "Set quantity and rate per liter",
              "Map the correct area code for analytics",
              "Add gate, landmark, or doorstep note",
            ].map((item) => (
              <div key={item} className="admin-panel-muted rounded-[22px] px-4 py-4">
                <p className="text-sm font-medium text-[var(--admin-text)]">{item}</p>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
