import { BadgeIndianRupee, Droplets, WalletCards } from "lucide-react";
import { PurchaseManagementPanel } from "@/components/purchases/purchase-management-panel";
import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCard, AdminStatCard } from "@/components/layout/admin-ui";
import { getProductsData, getPurchaseLedgerData, getVendorsData } from "@/lib/data-service";
import { formatCurrencyINR } from "@/lib/utils";

type AdminPurchasesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminPurchasesPage({ params }: AdminPurchasesPageProps) {
  const { locale } = await params;
  const [ledger, vendors, products] = await Promise.all([
    getPurchaseLedgerData(),
    getVendorsData(),
    getProductsData(),
  ]);

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "परचेज लेजर" : "Purchase Ledger"}
      subtitle={
        locale === "hi"
          ? "वेंडर से daily purchase, milk inward और payment status को track करें."
          : "Track daily vendor purchases, milk inward, and supplier payment status."
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          label="Purchase total"
          value={formatCurrencyINR(ledger.summary.totalPurchaseAmount)}
          hint="Current month inward purchase amount"
          icon={BadgeIndianRupee}
        />
        <AdminStatCard
          label="Milk inward"
          value={`${ledger.summary.totalMilkInward.toFixed(1)} L`}
          hint="Milk-category purchases only"
          icon={Droplets}
          tone="success"
        />
        <AdminStatCard
          label="Unpaid entries"
          value={String(ledger.summary.unpaidEntries)}
          hint="Supplier dues needing follow-up"
          icon={WalletCards}
          tone="warning"
        />
      </div>

      <AdminCard>
        <p className="text-sm text-[var(--admin-muted)]">
          Purchase rows stay separate from customer sales so outward billing and inward sourcing
          analytics remain logically correct.
        </p>
      </AdminCard>

      <PurchaseManagementPanel
        entries={ledger.entries}
        vendors={vendors.map((vendor) => ({ code: vendor.code, name: vendor.name }))}
        products={products.map((product) => ({
          code: product.code,
          name: product.name,
          category: product.category,
        }))}
      />
    </AdminShell>
  );
}
