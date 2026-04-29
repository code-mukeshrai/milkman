"use client";

import { useState } from "react";
import { Minus, Plus, UserRound } from "lucide-react";
import { AdminBadge } from "@/components/layout/admin-ui";
import { cn, formatCurrencyINR } from "@/lib/utils";
import { CustomerCardActions } from "./customer-card-actions";

type CustomerListItemProps = {
  customer: {
    id: string;
    customerCode: string;
    name: string;
    quantity: number;
    quantityLabel: string;
    due: number;
    areaName: string;
    status: "ACTIVE" | "PAUSED" | "INACTIVE";
    deliveryStatus: "DELIVERED" | "SKIPPED" | "PAUSED" | null;
  };
  locale: string;
  tDue: string;
  onView?: () => void;
  isMenuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
};

export function CustomerListItem({ 
  customer, 
  locale, 
  tDue, 
  onView,
  isMenuOpen,
  setMenuOpen
}: CustomerListItemProps) {
  const [quantity, setQuantity] = useState(customer.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  async function updateQuantity(newQuantity: number) {
    if (newQuantity < 0) return;
    console.log(`[QuantityUpdate] Changing ${customer.customerCode} from ${quantity} to ${newQuantity}`);

    // Optimistic update
    const previousQuantity = quantity;
    setQuantity(newQuantity);
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/customers/${customer.customerCode}/quantity`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantityLiters: newQuantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update quantity");
      }
      
      console.log(`[QuantityUpdate] Successfully updated ${customer.customerCode} to ${newQuantity}`);
    } catch (error) {
      console.error(`[QuantityUpdate] Error updating ${customer.customerCode}:`, error);
      alert("Failed to update quantity. Rolling back.");
      // Rollback on error
      setQuantity(previousQuantity);
    } finally {
      setIsUpdating(false);
    }
  }

  const isDelivered = customer.deliveryStatus === "DELIVERED";

  return (
    <article 
      className={cn(
        "admin-panel rounded-[18px] px-3 py-3 sm:px-4 transition relative overflow-hidden group",
        isDelivered ? "bg-[#f0fdf4] border-emerald-100" : "hover:bg-white active:scale-[0.99]"
      )}
    >
      {/* Clickable Overlay */}
      <button
        onClick={onView}
        className="absolute inset-0 z-0 h-full w-full opacity-0"
        aria-label="View details"
      />

      <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 pointer-events-none">
        <div className="flex items-center justify-between gap-3 sm:justify-start sm:min-w-0">
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--admin-primary-soft)] text-[var(--admin-primary-strong)] sm:flex">
              <UserRound className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="truncate font-semibold text-[var(--admin-text)] sm:text-[15px]">{customer.name}</h3>
                <AdminBadge tone={customer.status === "ACTIVE" ? "success" : "blue"} className="text-[8px] uppercase h-3.5 px-1 leading-none">
                  {customer.status}
                </AdminBadge>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-500 font-medium truncate">
                {customer.areaName} • {quantity.toFixed(1)} L
              </p>
            </div>
          </div>

          {/* Due Amount - Mobile Only */}
          <div className="text-right sm:hidden">
            <p
              className={cn(
                "text-sm font-bold",
                customer.due > 500 ? "text-[#d14646]" : "text-[var(--admin-text)]"
              )}
            >
              {formatCurrencyINR(customer.due)}
            </p>
            <p className="text-[10px] font-semibold uppercase text-[var(--admin-muted)]">{tDue}</p>
          </div>
        </div>

        {/* Right Side: Actions (Buttons, Due, Icons) */}
        <div className="flex items-center justify-between gap-2 pointer-events-auto sm:shrink-0 sm:justify-end">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1 rounded-xl border border-[var(--admin-border)] bg-white p-0.5 sm:p-1">
            <button
              onClick={(e) => { e.stopPropagation(); updateQuantity(Math.max(0, quantity - 0.5)); }}
              disabled={isUpdating || quantity <= 0}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--admin-muted)] transition hover:bg-[var(--admin-panel-muted)] active:scale-95 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1 px-1.5">
              <span className="min-w-[1.8rem] text-center text-sm font-bold text-[var(--admin-primary-strong)]">
                {quantity.toFixed(1)}
              </span>
              <span className="text-[10px] font-bold text-[var(--admin-muted)] uppercase">L</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); updateQuantity(quantity + 0.5); }}
              disabled={isUpdating}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--admin-muted)] transition hover:bg-[var(--admin-panel-muted)] active:scale-95 disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden text-right sm:block">
              <p
                className={cn(
                  "text-sm font-bold",
                  customer.due > 500 ? "text-[#d14646]" : "text-[var(--admin-text)]"
                )}
              >
                {formatCurrencyINR(customer.due)}
              </p>
              <p className="text-[11px] font-semibold uppercase text-[var(--admin-muted)]">{tDue}</p>
            </div>

            <div>
              <CustomerCardActions 
                id={customer.id}
                customerCode={customer.customerCode} 
                locale={locale} 
                onView={onView}
                isMenuOpen={isMenuOpen}
                setMenuOpen={setMenuOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
