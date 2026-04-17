import { BadgeIndianRupee, CircleDollarSign, CreditCard, WalletCards } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminSelect,
  AdminStatCard,
} from "@/components/layout/admin-ui";
import { demoCustomers, demoPayments } from "@/lib/demo-data";
import { formatCurrencyINR } from "@/lib/utils";

type AdminBillingPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminBillingPage({ params }: AdminBillingPageProps) {
  const { locale } = await params;

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "बिलिंग और पेमेंट्स" : "Billing & Payments"}
      subtitle={
        locale === "hi"
          ? "हर कस्टमर का billed amount, paid amount और due amount."
          : "Track billed amount, paid amount, and due amount for every customer."
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          label="Billed this month"
          value="₹11,370"
          hint="Combined total for visible accounts"
          icon={BadgeIndianRupee}
        />
        <AdminStatCard
          label="Amount received"
          value="₹9,100"
          hint="UPI, bank, and cash reconciled"
          icon={WalletCards}
          tone="success"
        />
        <AdminStatCard
          label="Due amount"
          value="₹2,270"
          hint="Follow up before monthly closing"
          icon={CircleDollarSign}
          tone="warning"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <AdminCard>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--admin-text)]">Accounts overview</h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                Compact ledger cards designed to stay readable on phones.
              </p>
            </div>
            <AdminBadge tone="blue">
              <CreditCard className="h-3.5 w-3.5" />
              Month-end summary
            </AdminBadge>
          </div>
          <div className="mt-5 grid gap-3">
            {demoCustomers.map((account) => (
              <article key={account.id} className="admin-panel-muted rounded-[26px] p-4">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-[var(--admin-text)]">{account.name}</h3>
                      <AdminBadge tone={account.due > 0 ? "warning" : "success"}>
                        {account.due > 0 ? "Due pending" : "Cleared"}
                      </AdminBadge>
                    </div>
                    <p className="mt-1 text-sm text-[var(--admin-muted)]">{account.area} ledger</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[500px]">
                    <div className="rounded-[20px] bg-white px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">
                        Billed
                      </p>
                      <p className="mt-2 font-semibold text-[var(--admin-text)]">
                        {formatCurrencyINR(account.billed)}
                      </p>
                    </div>
                    <div className="rounded-[20px] bg-white px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">
                        Paid
                      </p>
                      <p className="mt-2 font-semibold text-[var(--admin-text)]">
                        {formatCurrencyINR(account.paid)}
                      </p>
                    </div>
                    <div className="rounded-[20px] bg-white px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">
                        Due
                      </p>
                      <p className="mt-2 font-semibold text-[var(--admin-text)]">
                        {formatCurrencyINR(account.due)}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </AdminCard>

        <div className="space-y-4">
          <AdminCard>
            <div>
              <h2 className="text-lg font-semibold text-[var(--admin-text)]">Record payment</h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                Add cash, UPI, or bank entries without leaving the billing screen.
              </p>
            </div>

            <form className="mt-5 space-y-4">
              <AdminField label="Customer">
                <AdminSelect defaultValue="amit-verma">
                  {demoCustomers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </AdminSelect>
              </AdminField>

              <div className="grid gap-4 sm:grid-cols-2">
                <AdminField label="Amount">
                  <AdminInput defaultValue="1200" />
                </AdminField>
                <AdminField label="Mode">
                  <AdminSelect defaultValue="UPI">
                    <option value="UPI">UPI</option>
                    <option value="CASH">Cash</option>
                    <option value="BANK">Bank</option>
                  </AdminSelect>
                </AdminField>
              </div>

              <AdminField label="Payment note">
                <AdminInput defaultValue="Partial monthly payment" />
              </AdminField>

              <div className="grid gap-2 sm:grid-cols-2">
                <AdminButton className="justify-center">Save payment</AdminButton>
                <AdminButton variant="secondary" className="justify-center">
                  Send receipt
                </AdminButton>
              </div>
            </form>
          </AdminCard>

          <AdminCard>
            <div>
              <h2 className="text-lg font-semibold text-[var(--admin-text)]">Recent entries</h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                Latest billing actions and collections
              </p>
            </div>
            <div className="mt-4 space-y-3">
              {demoPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="admin-panel-muted flex flex-col gap-2 rounded-[22px] px-4 py-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-[var(--admin-text)]">{payment.customerName}</p>
                    <AdminBadge tone="success">{payment.mode}</AdminBadge>
                  </div>
                  <p className="text-sm text-[var(--admin-muted)]">{payment.date}</p>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-base font-semibold text-[var(--admin-text)]">
                      {formatCurrencyINR(payment.amount)}
                    </p>
                    <p className="text-sm text-[var(--admin-muted)]">{payment.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>
    </AdminShell>
  );
}
