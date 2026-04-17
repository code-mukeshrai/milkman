import { ProductManagementPanel } from "@/components/products/product-management-panel";
import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCard } from "@/components/layout/admin-ui";
import { getProductsData } from "@/lib/data-service";

type AdminProductsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminProductsPage({ params }: AdminProductsPageProps) {
  const { locale } = await params;
  const products = await getProductsData();

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "प्रोडक्ट्स" : "Products"}
      subtitle={
        locale === "hi"
          ? "दूध, घी, लस्सी और अन्य add-on products के rates manage करें."
          : "Manage rate cards for milk, ghee, lassi, and other add-on products."
      }
    >
      <AdminCard>
        <p className="text-sm text-[var(--admin-muted)]">
          Milk products drive consumption analytics, while add-on items stay billable without
          inflating milk-liter totals.
        </p>
      </AdminCard>
      <ProductManagementPanel initialProducts={products} />
    </AdminShell>
  );
}
