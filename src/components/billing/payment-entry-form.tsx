"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminSelect,
} from "@/components/layout/admin-ui";

type PaymentEntryFormProps = {
  customers: Array<{ customerCode: string; name: string; areaCode: string }>;
};

export function PaymentEntryForm({ customers }: PaymentEntryFormProps) {
  const router = useRouter();
  const [customerCode, setCustomerCode] = useState(customers[0]?.customerCode || "");
  const [amount, setAmount] = useState("0");
  const [mode, setMode] = useState("UPI");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerCode,
          amount: Number(amount),
          mode,
          note,
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Unable to save payment");
      }
      router.refresh();
      setAmount("0");
      setNote("");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save payment");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AdminCard>
      <div>
        <h2 className="text-lg font-semibold text-[var(--admin-text)]">Record payment</h2>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          Add cash, UPI, or bank entries without leaving the billing screen.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <AdminField label="Customer">
          <AdminSelect value={customerCode} onChange={(event) => setCustomerCode(event.target.value)}>
            {customers.map((customer) => (
              <option key={customer.customerCode} value={customer.customerCode}>
                {customer.name} • {customer.areaCode}
              </option>
            ))}
          </AdminSelect>
        </AdminField>

        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Amount">
            <AdminInput value={amount} onChange={(event) => setAmount(event.target.value)} />
          </AdminField>
          <AdminField label="Mode">
            <AdminSelect value={mode} onChange={(event) => setMode(event.target.value)}>
              <option value="UPI">UPI</option>
              <option value="CASH">Cash</option>
              <option value="BANK">Bank</option>
            </AdminSelect>
          </AdminField>
        </div>

        <AdminField label="Payment note">
          <AdminInput value={note} onChange={(event) => setNote(event.target.value)} />
        </AdminField>

        {error ? (
          <div className="rounded-[18px] bg-[var(--admin-danger-soft)] px-4 py-3 text-sm font-medium text-[#d14646]">
            {error}
          </div>
        ) : null}

        <div className="grid gap-2 sm:grid-cols-2">
          <AdminButton className="justify-center" onClick={handleSubmit} disabled={isSubmitting}>
            Save payment
          </AdminButton>
          <AdminButton
            variant="secondary"
            className="justify-center"
            onClick={() => {
              setAmount("0");
              setNote("");
            }}
          >
            Reset
          </AdminButton>
        </div>
      </div>
    </AdminCard>
  );
}
