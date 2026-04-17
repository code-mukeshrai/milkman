"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MoveRight, ShieldAlert } from "lucide-react";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminSelect,
} from "@/components/layout/admin-ui";

type DeliveryEntry = {
  customerCode: string;
  customerName: string;
  quantityLabel: string;
  status: string;
  note: string;
  route: string;
  areaCode: string;
  baseQuantity: number;
  extraQuantity: number;
  finalQuantity: number;
  productItems: Array<{ productName?: string; quantity?: number; totalAmount?: number }>;
};

type ProductOption = {
  code: string;
  name: string;
  category: string;
};

type CustomerOption = {
  customerCode: string;
  name: string;
};

type DeliveryOperationsPanelProps = {
  entries: DeliveryEntry[];
  customers: CustomerOption[];
  products: ProductOption[];
};

export function DeliveryOperationsPanel({
  entries,
  customers,
  products,
}: DeliveryOperationsPanelProps) {
  const router = useRouter();
  const defaultEntry = useMemo(
    () => entries.find((entry) => entry.customerCode === customers[0]?.customerCode) || entries[0],
    [customers, entries],
  );
  const [selectedCustomerCode, setSelectedCustomerCode] = useState(
    defaultEntry?.customerCode || "",
  );
  const [status, setStatus] = useState("DELIVERED");
  const [extraQuantity, setExtraQuantity] = useState("0");
  const [finalQuantity, setFinalQuantity] = useState(String(defaultEntry?.finalQuantity ?? 0));
  const [note, setNote] = useState(defaultEntry?.note || "");
  const [productCode, setProductCode] = useState("");
  const [productQuantity, setProductQuantity] = useState("1");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const entry = entries.find((item) => item.customerCode === selectedCustomerCode);

    if (!entry) {
      return;
    }

    setStatus(entry.status === "PENDING" ? "DELIVERED" : entry.status);
    setExtraQuantity(String(entry.extraQuantity));
    setFinalQuantity(String(entry.finalQuantity || entry.baseQuantity));
    setNote(entry.note || "");
  }, [entries, selectedCustomerCode]);

  async function saveDelivery(payload: {
    customerCode: string;
    status: string;
    extraQuantity?: number;
    finalQuantity?: number;
    note?: string;
    items?: Array<{ productCode: string; quantity: number }>;
  }) {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/deliveries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to save delivery");
      }

      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save delivery");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <AdminCard>
        <div className="space-y-3">
          {entries.map((task) => (
            <article key={task.customerCode} className="admin-panel-muted rounded-[26px] p-4">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-[var(--admin-text)]">
                      {task.customerName}
                    </h2>
                    <AdminBadge
                      tone={
                        task.status === "DELIVERED"
                          ? "success"
                          : task.status === "PAUSED"
                            ? "warning"
                            : "danger"
                      }
                    >
                      {task.status}
                    </AdminBadge>
                  </div>
                  <p className="mt-1 text-sm text-[var(--admin-muted)]">
                    {task.quantityLabel} planned • {task.route} • {task.areaCode}
                  </p>
                  <p className="mt-1 text-sm text-[var(--admin-muted)]">
                    Final: {task.finalQuantity.toFixed(1)} L • Extra: {task.extraQuantity.toFixed(1)} L
                  </p>
                  {task.productItems.length ? (
                    <p className="mt-1 text-sm text-[var(--admin-muted)]">
                      Add-ons:{" "}
                      {task.productItems
                        .map((item) => `${item.productName || "Item"} x ${item.quantity || 0}`)
                        .join(", ")}
                    </p>
                  ) : null}
                </div>
                <div className="grid gap-2 sm:grid-cols-3 xl:w-[420px]">
                  <AdminButton
                    className="justify-center"
                    onClick={() =>
                      saveDelivery({
                        customerCode: task.customerCode,
                        status: "DELIVERED",
                        finalQuantity: task.baseQuantity + task.extraQuantity,
                        extraQuantity: task.extraQuantity,
                        note: task.note,
                      })
                    }
                  >
                    Delivered
                  </AdminButton>
                  <AdminButton
                    variant="secondary"
                    className="justify-center"
                    onClick={() =>
                      saveDelivery({
                        customerCode: task.customerCode,
                        status: "SKIPPED",
                        finalQuantity: 0,
                        note: task.note,
                      })
                    }
                  >
                    Skip
                  </AdminButton>
                  <AdminButton
                    variant="outline"
                    className="justify-center"
                    onClick={() =>
                      saveDelivery({
                        customerCode: task.customerCode,
                        status: "PAUSED",
                        finalQuantity: 0,
                        note: task.note,
                      })
                    }
                  >
                    Pause
                  </AdminButton>
                </div>
              </div>

              <div className="admin-divider my-5" />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm text-[var(--admin-muted)]">
                  <ShieldAlert className="h-4 w-4 text-[var(--admin-primary-strong)]" />
                  <span>{task.note || "No note added for today"}</span>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--admin-primary-strong)]"
                  onClick={() => {
                    setSelectedCustomerCode(task.customerCode);
                    setStatus(task.status === "PENDING" ? "DELIVERED" : task.status);
                    setExtraQuantity(String(task.extraQuantity));
                    setFinalQuantity(String(task.finalQuantity || task.baseQuantity));
                    setNote(task.note || "");
                    setProductCode("");
                    setProductQuantity("1");
                  }}
                >
                  Load in form
                  <MoveRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </AdminCard>

      <AdminCard>
        <div>
          <h2 className="text-lg font-semibold text-[var(--admin-text)]">Daily override form</h2>
          <p className="mt-1 text-sm text-[var(--admin-muted)]">
            Save extra milk and ad hoc product items for one customer today.
          </p>
        </div>
        <div className="mt-5 space-y-4">
          <AdminField label="Customer">
            <AdminSelect
              value={selectedCustomerCode}
              onChange={(event) => setSelectedCustomerCode(event.target.value)}
            >
              {customers.map((customer) => (
                <option key={customer.customerCode} value={customer.customerCode}>
                  {customer.name} • {customer.customerCode}
                </option>
              ))}
            </AdminSelect>
          </AdminField>

          <div className="grid gap-4 sm:grid-cols-3">
            <AdminField label="Status">
              <AdminSelect value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="DELIVERED">Delivered</option>
                <option value="SKIPPED">Skipped</option>
                <option value="PAUSED">Paused</option>
              </AdminSelect>
            </AdminField>
            <AdminField label="Extra milk (L)">
              <AdminInput
                value={extraQuantity}
                onChange={(event) => setExtraQuantity(event.target.value)}
              />
            </AdminField>
            <AdminField label="Final quantity (L)">
              <AdminInput
                value={finalQuantity}
                onChange={(event) => setFinalQuantity(event.target.value)}
              />
            </AdminField>
          </div>

          <AdminField label="Add-on product">
            <AdminSelect value={productCode} onChange={(event) => setProductCode(event.target.value)}>
              <option value="">No add-on product</option>
              {products.map((product) => (
                <option key={product.code} value={product.code}>
                  {product.name} • {product.code}
                </option>
              ))}
            </AdminSelect>
          </AdminField>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Product quantity">
              <AdminInput
                value={productQuantity}
                onChange={(event) => setProductQuantity(event.target.value)}
              />
            </AdminField>
            <AdminField label="Note">
              <AdminInput value={note} onChange={(event) => setNote(event.target.value)} />
            </AdminField>
          </div>

          {error ? (
            <div className="rounded-[18px] bg-[var(--admin-danger-soft)] px-4 py-3 text-sm font-medium text-[#d14646]">
              {error}
            </div>
          ) : null}

          <div className="grid gap-2 sm:grid-cols-2">
            <AdminButton
              className="justify-center"
              disabled={isSubmitting}
              onClick={() =>
                saveDelivery({
                  customerCode: selectedCustomerCode,
                  status,
                  extraQuantity: Number(extraQuantity || 0),
                  finalQuantity: Number(finalQuantity || 0),
                  note,
                  items:
                    productCode && Number(productQuantity) > 0
                      ? [{ productCode, quantity: Number(productQuantity) }]
                      : [],
                })
              }
            >
              Save daily record
            </AdminButton>
            <AdminButton
              variant="secondary"
              className="justify-center"
              disabled={isSubmitting}
              onClick={() => {
                const entry = entries.find((item) => item.customerCode === selectedCustomerCode);
                setExtraQuantity("0");
                setFinalQuantity(String(entry?.baseQuantity || 0));
                setProductCode("");
                setProductQuantity("1");
                setNote(entry?.note || "");
              }}
            >
              Reset form
            </AdminButton>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
