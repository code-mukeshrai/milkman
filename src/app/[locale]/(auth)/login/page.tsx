import { LockKeyhole, Phone } from "lucide-react";
import { SectionHeading } from "@/components/layout/section-heading";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;

  return (
    <main className="public-shell flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
      <div className="public-panel w-full max-w-md rounded-[32px] p-6 sm:p-8">
        <SectionHeading
          eyebrow={locale === "hi" ? "सुरक्षित लॉगिन" : "Secure Login"}
          title={locale === "hi" ? "अपना खाता खोलें" : "Access your account"}
          description={
            locale === "hi"
              ? "यह अभी starter screen है. आगे OTP या password-based auth जोड़ सकते हैं."
              : "This is a starter screen. OTP or password-based auth can be added next."
          }
        />

        <form className="mt-8 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium">
              {locale === "hi" ? "मोबाइल नंबर" : "Mobile number"}
            </span>
            <div className="public-soft-ring flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3">
              <Phone className="h-4 w-4 text-muted" />
              <input
                className="w-full bg-transparent outline-none"
                placeholder={locale === "hi" ? "10 अंकों का नंबर" : "10-digit number"}
              />
            </div>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">
              {locale === "hi" ? "पासवर्ड" : "Password"}
            </span>
            <div className="public-soft-ring flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3">
              <LockKeyhole className="h-4 w-4 text-muted" />
              <input
                type="password"
                className="w-full bg-transparent outline-none"
                placeholder={locale === "hi" ? "पासवर्ड दर्ज करें" : "Enter password"}
              />
            </div>
          </label>

          <button
            type="button"
            className="w-full rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-strong"
          >
            {locale === "hi" ? "लॉगिन" : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
