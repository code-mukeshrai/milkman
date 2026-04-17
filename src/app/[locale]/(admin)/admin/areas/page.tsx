import { AreaManagementPanel } from "@/components/areas/area-management-panel";
import { AdminShell } from "@/components/layout/admin-shell";

type AdminAreasPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminAreasPage({ params }: AdminAreasPageProps) {
  const { locale } = await params;

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "एरिया मैनेजमेंट" : "Area Management"}
      subtitle={
        locale === "hi"
          ? "एरिया कोड्स, नाम और स्टेटस को मैनेज करें."
          : "Manage area codes, names, and status for customer mapping and analytics."
      }
    >
      <AreaManagementPanel />
    </AdminShell>
  );
}
