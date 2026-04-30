"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import {
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminSelect,
  AdminTextarea,
} from "@/components/layout/admin-ui";

type CustomerFormProps = {
  locale: string;
  mode: "create" | "edit";
  customerCode?: string;
  initialValues?: {
    name: string;
    phone: string;
    preferredLanguage: "en" | "hi";
    addressLine1: string;
    addressLine2: string;
    areaCode: string;
    landmark: string;
    internalNote: string;
    quantityLiters: number;
    pricePerLiter: number;
    unitLabel: string;
    status: "ACTIVE" | "PAUSED" | "INACTIVE";
  };
  areas: Array<{ code: string; name: string }>;
};

export function CustomerForm({
  locale,
  mode,
  customerCode,
  initialValues,
  areas,
}: CustomerFormProps) {
  const router = useRouter();
  const defaults = useMemo(
    () => ({
      name: initialValues?.name || "",
      phone: initialValues?.phone || "",
      preferredLanguage: initialValues?.preferredLanguage || "en",
      addressLine1: initialValues?.addressLine1 || "",
      addressLine2: initialValues?.addressLine2 || "",
      areaCode: initialValues?.areaCode || areas[0]?.code || "",
      landmark: initialValues?.landmark || "",
      internalNote: initialValues?.internalNote || "",
      quantityLiters: String(initialValues?.quantityLiters ?? 2),
      pricePerLiter: String(initialValues?.pricePerLiter ?? 62),
      unitLabel: initialValues?.unitLabel || "L",
      status: initialValues?.status || "ACTIVE",
    }),
    [areas, initialValues],
  );

  const [form, setForm] = useState(defaults);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const updateQuantity = (delta: number) => {
    setForm((prev) => {
      const current = parseFloat(prev.quantityLiters) || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, quantityLiters: String(next) };
    });
  };

  async function handleSubmit() {
    setIsSubmitting(true);
    setError("");

    try {
      const { internalNote, ...rest } = form;
      const payload: any = {
        ...rest,
        quantityLiters: Number(form.quantityLiters),
        pricePerLiter: Number(form.pricePerLiter),
      };

      if (internalNote && internalNote.trim() !== "") {
        payload.notes = internalNote;
      }
      const response = await fetch(
        mode === "create" ? "/api/customers" : `/api/customers/${customerCode}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = (await response.json()) as { error?: string; profile?: { customerCode: string } };

      if (!response.ok) {
        throw new Error(data.error || "Unable to save customer");
      }

      router.push(
        mode === "create"
          ? `/${locale}/admin/customers`
          : `/${locale}/admin/customers/${customerCode}`,
      );
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save customer");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AdminCard>
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Customer name">
            <AdminInput
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            />
          </AdminField>
          <AdminField label="Phone number">
            <AdminInput
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            />
          </AdminField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Preferred language">
            <AdminSelect
              value={form.preferredLanguage}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  preferredLanguage: event.target.value as "en" | "hi",
                }))
              }
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </AdminSelect>
          </AdminField>
          <AdminField label="Area code">
            <AdminSelect
              value={form.areaCode}
              onChange={(event) =>
                setForm((current) => ({ ...current, areaCode: event.target.value }))
              }
            >
              {areas.map((area) => (
                <option key={area.code} value={area.code}>
                  {area.code} • {area.name}
                </option>
              ))}
            </AdminSelect>
          </AdminField>
        </div>

        <AdminField label="Address line 1">
          <AdminInput
            value={form.addressLine1}
            onChange={(event) =>
              setForm((current) => ({ ...current, addressLine1: event.target.value }))
            }
          />
        </AdminField>

        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Address line 2">
            <AdminInput
              value={form.addressLine2}
              onChange={(event) =>
                setForm((current) => ({ ...current, addressLine2: event.target.value }))
              }
            />
          </AdminField>
          <AdminField label="Landmark">
            <AdminInput
              value={form.landmark}
              onChange={(event) =>
                setForm((current) => ({ ...current, landmark: event.target.value }))
              }
            />
          </AdminField>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <AdminField label="Milk quantity">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateQuantity(-0.5)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--admin-border)] bg-white text-[var(--admin-muted)] transition hover:bg-[var(--admin-panel-muted)] active:scale-95"
              >
                <Minus className="h-4 w-4" />
              </button>
              <AdminInput
                className="text-center font-bold"
                value={form.quantityLiters}
                onChange={(event) =>
                  setForm((current) => ({ ...current, quantityLiters: event.target.value }))
                }
              />
              <button
                type="button"
                onClick={() => updateQuantity(0.5)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--admin-border)] bg-white text-[var(--admin-muted)] transition hover:bg-[var(--admin-panel-muted)] active:scale-95"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </AdminField>
          <AdminField label="Rate per liter">
            <AdminInput
              value={form.pricePerLiter}
              onChange={(event) =>
                setForm((current) => ({ ...current, pricePerLiter: event.target.value }))
              }
            />
          </AdminField>
          <AdminField label="Unit">
            <AdminInput
              value={form.unitLabel}
              onChange={(event) =>
                setForm((current) => ({ ...current, unitLabel: event.target.value }))
              }
            />
          </AdminField>
          <AdminField label="Status">
            <AdminSelect
              value={form.status}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  status: event.target.value as "ACTIVE" | "PAUSED" | "INACTIVE",
                }))
              }
            >
              <option value="ACTIVE">Active</option>
              <option value="PAUSED">Paused</option>
              <option value="INACTIVE">Inactive</option>
            </AdminSelect>
          </AdminField>
        </div>

        <AdminField label="Internal note">
          <AdminTextarea
            value={form.internalNote}
            onChange={(event) =>
              setForm((current) => ({ ...current, internalNote: event.target.value }))
            }
          />
        </AdminField>

        {error ? (
          <div className="rounded-[18px] bg-[var(--admin-danger-soft)] px-4 py-3 text-sm font-medium text-[#d14646]">
            {error}
          </div>
        ) : null}

        <div className="grid gap-2 sm:grid-cols-3">
          <AdminButton className="justify-center" onClick={handleSubmit} disabled={isSubmitting}>
            {mode === "create" ? "Create customer" : "Save changes"}
          </AdminButton>
          <AdminButton
            variant="secondary"
            className="justify-center"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </AdminButton>
          <AdminButton
            variant="outline"
            className="justify-center"
            onClick={() => setForm(defaults)}
            disabled={isSubmitting}
          >
            Reset
          </AdminButton>
        </div>
      </div>
    </AdminCard>
  );
}
