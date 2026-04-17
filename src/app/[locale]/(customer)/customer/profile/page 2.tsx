import { CustomerShell } from "@/components/layout/customer-shell";

type CustomerProfilePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CustomerProfilePage({
  params,
}: CustomerProfilePageProps) {
  const { locale } = await params;

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
          {[
            ["Name", "Amit Verma"],
            ["Phone", "+91 98765 43210"],
            ["Address", "12 Green Park, Near Hanuman Mandir"],
            ["Preferred language", locale === "hi" ? "हिंदी" : "English"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-[22px] border border-border bg-white px-4 py-3"
            >
              <p className="text-sm text-muted">{label}</p>
              <p className="mt-1 font-medium">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </CustomerShell>
  );
}
