"use client";

import { useState } from "react";
import { Package2, PencilLine, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminSelect,
} from "@/components/layout/admin-ui";

type ProductRecord = {
  code: string;
  name: string;
  category: "MILK" | "DAIRY_ADDON" | "OTHER";
  unit: string;
  defaultRate: number;
  isActive?: boolean;
};

type ProductManagementPanelProps = {
  initialProducts: ProductRecord[];
};

export function ProductManagementPanel({ initialProducts }: ProductManagementPanelProps) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [form, setForm] = useState({
    code: "",
    name: "",
    category: "MILK" as ProductRecord["category"],
    unit: "L",
    defaultRate: "0",
    isActive: true,
  });
  const [error, setError] = useState("");

  function loadProduct(product: ProductRecord) {
    setSelectedCode(product.code);
    setForm({
      code: product.code,
      name: product.name,
      category: product.category,
      unit: product.unit,
      defaultRate: String(product.defaultRate),
      isActive: product.isActive !== false,
    });
  }

  async function saveProduct() {
    setError("");
    try {
      const response = await fetch(
        selectedCode ? `/api/products/${selectedCode}` : "/api/products",
        {
          method: selectedCode ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            defaultRate: Number(form.defaultRate),
          }),
        },
      );
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Unable to save product");
      }
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save product");
    }
  }

  async function deleteProduct() {
    if (!selectedCode) return;
    setError("");
    try {
      const response = await fetch(`/api/products/${selectedCode}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Unable to delete product");
      }
      setProducts((current) => current.filter((product) => product.code !== selectedCode));
      setSelectedCode(null);
      setForm({ code: "", name: "", category: "MILK", unit: "L", defaultRate: "0", isActive: true });
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to delete product");
    }
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <AdminCard>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-[var(--admin-text)]">Products</h2>
            <p className="mt-1 text-sm text-[var(--admin-muted)]">
              Manage milk and add-on product rates.
            </p>
          </div>
          <AdminButton
            onClick={() => {
              setSelectedCode(null);
              setForm({ code: "", name: "", category: "MILK", unit: "L", defaultRate: "0", isActive: true });
            }}
          >
            <Plus className="h-4 w-4" />
            New
          </AdminButton>
        </div>
        <div className="mt-5 space-y-3">
          {products.map((product) => (
            <button
              key={product.code}
              type="button"
              onClick={() => loadProduct(product)}
              className="admin-panel-muted w-full rounded-[24px] p-4 text-left"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-[var(--admin-text)]">{product.name}</p>
                    <AdminBadge tone={product.isActive === false ? "warning" : "success"}>
                      {product.category}
                    </AdminBadge>
                  </div>
                  <p className="mt-1 text-sm text-[var(--admin-muted)]">
                    {product.code} • {product.unit} • ₹{product.defaultRate}
                  </p>
                </div>
                <PencilLine className="h-4 w-4 text-[var(--admin-muted)]" />
              </div>
            </button>
          ))}
        </div>
      </AdminCard>

      <AdminCard>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--admin-primary-soft)] text-[var(--admin-primary-strong)]">
            <Package2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--admin-text)]">Product CRUD</h2>
            <p className="mt-1 text-sm text-[var(--admin-muted)]">Create or edit product rates.</p>
          </div>
        </div>
        <div className="mt-5 space-y-4">
          <AdminField label="Product code">
            <AdminInput value={form.code} onChange={(event) => setForm((current) => ({ ...current, code: event.target.value }))} />
          </AdminField>
          <AdminField label="Name">
            <AdminInput value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-3">
            <AdminField label="Category">
              <AdminSelect value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as ProductRecord["category"] }))}>
                <option value="MILK">Milk</option>
                <option value="DAIRY_ADDON">Dairy Add-on</option>
                <option value="OTHER">Other</option>
              </AdminSelect>
            </AdminField>
            <AdminField label="Unit">
              <AdminInput value={form.unit} onChange={(event) => setForm((current) => ({ ...current, unit: event.target.value }))} />
            </AdminField>
            <AdminField label="Rate">
              <AdminInput value={form.defaultRate} onChange={(event) => setForm((current) => ({ ...current, defaultRate: event.target.value }))} />
            </AdminField>
          </div>
          <AdminField label="Status">
            <AdminSelect value={form.isActive ? "ACTIVE" : "INACTIVE"} onChange={(event) => setForm((current) => ({ ...current, isActive: event.target.value === "ACTIVE" }))}>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </AdminSelect>
          </AdminField>
          {error ? <div className="rounded-[18px] bg-[var(--admin-danger-soft)] px-4 py-3 text-sm font-medium text-[#d14646]">{error}</div> : null}
          <div className="grid gap-2 sm:grid-cols-3">
            <AdminButton className="justify-center" onClick={saveProduct}>Save</AdminButton>
            <AdminButton variant="secondary" className="justify-center" onClick={() => setForm({ code: "", name: "", category: "MILK", unit: "L", defaultRate: "0", isActive: true })}>Reset</AdminButton>
            <AdminButton variant="outline" className="justify-center" onClick={deleteProduct} disabled={!selectedCode}>
              <Trash2 className="h-4 w-4" />
              Delete
            </AdminButton>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
