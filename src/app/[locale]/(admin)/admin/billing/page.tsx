import { BadgeIndianRupee, CircleDollarSign, CreditCard, WalletCards } from "lucide-react";
import { PaymentEntryForm } from "@/components/billing/payment-entry-form";
import { AdminShell } from "@/components/layout/admin-shell";
import { AdminBadge, AdminCard, AdminStatCard } from "@/components/layout/admin-ui";
import { getBillingData } from "@/lib/data-service";
import { formatCurrencyINR } from "@/lib/utils";

type AdminBillingPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminBillingPage({ params }: AdminBillingPageProps) {
  const { locale } = await params;
  const billing = await getBillingData();

  return (
    <AdminShell
      locale={locale}
      title={locale === "hi" ? "बिलिंग और पेमेंट्स" : "Billing & Payments"}
      subtitle={
        locale === "hi"
          ? "हर कस्टमर का billed amount, paid amount और due amount live records से."
          : "Track billed amount, paid amount, and due amount for every customer from live records."
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          label="Billed this month"
          value={formatCurrencyINR(billing.summary.billedAmount)}
          hint="Combined total from delivered milk and add-on line items"
          icon={BadgeIndianRupee}
        />
        <AdminStatCard
          label="Amount received"
          value={formatCurrencyINR(billing.summary.paidAmount)}
          hint="UPI, bank, and cash entries reconciled"
          icon={WalletCards}
          tone="success"
        />
        <AdminStatCard
          label="Due amount"
          value={formatCurrencyINR(billing.summary.dueAmount)}
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
            {billing.customers.map((account) => (
              <article key={account.customerCode} className="admin-panel-muted rounded-[26px] p-4">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-[var(--admin-text)]">{account.name}</h3>
                      <AdminBadge tone={account.due > 0 ? "warning" : "success"}>
                        {account.due > 0 ? "Due pending" : "Cleared"}
                      </AdminBadge>
                    </div>
                    <p className="mt-1 text-sm text-[var(--admin-muted)]">
                      {account.areaName} ledger • {account.areaCode}
                    </p>
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
          <PaymentEntryForm
            customers={billing.customers.map((customer) => ({
              customerCode: customer.customerCode,
              name: customer.name,
              areaCode: customer.areaCode,
            }))}
          />

          <AdminCard>
            <div>
              <h2 className="text-lg font-semibold text-[var(--admin-text)]">Recent entries</h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                Latest billing actions and collections
              </p>
            </div>
            <div className="mt-4 space-y-3">
              {billing.recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="admin-panel-muted flex flex-col gap-2 rounded-[22px] px-4 py-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-[var(--admin-text)]">{payment.customerName}</p>
                    <AdminBadge tone="success">{payment.mode}</AdminBadge>
                  </div>
                  <p className="text-sm text-[var(--admin-muted)]">{payment.dateLabel}</p>
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
