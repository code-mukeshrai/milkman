import { CustomerShell } from "@/components/layout/customer-shell";
import { getCustomerProfileData } from "@/lib/data-service";

type CustomerProfilePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CustomerProfilePage({
  params,
}: CustomerProfilePageProps) {
  const { locale } = await params;
  const profile = await getCustomerProfileData();
  const rows = profile
    ? [
        ["Name", profile.name],
        ["Phone", profile.phone],
        ["Address", profile.address],
        ["Area", `${profile.areaName} • ${profile.areaCode}`],
        ["Preferred language", profile.preferredLanguage === "hi" ? "हिंदी" : "English"],
      ]
    : [];

  return (
    <CustomerShell
      locale={locale}
      title={locale === "hi" ? "मेरा प्रोफाइल" : "My Profile"}
      subtitle={
        locale === "hi"
          ? "आपकी संपर्क जानकारी और डिलीवरी पता."
          : "Your contact information and delivery address."
      }
    >
      <section className="public-panel rounded-[30px] p-5">
        <div className="grid gap-3">
          {rows.map(([label, value]) => (
            <div key={label} className="rounded-[22px] border border-border bg-white px-4 py-3">
              <p className="text-sm text-muted">{label}</p>
              <p className="mt-1 font-medium">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </CustomerShell>
  );
}
