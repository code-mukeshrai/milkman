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
    address: string;
    areaName: string;
    status: "ACTIVE" | "PAUSED" | "INACTIVE";
    lastPaymentDate?: Date | string | null;
  };
  locale: string;
  tDue: string;
  onView?: (mode: "view" | "details") => void;
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
  const formatDateShort = (date: Date | string | null | undefined) => {
    if (!date) return "N/A";
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
    }).format(new Date(date));
  };

  return (
    <article 
      className={cn(
        "admin-panel rounded-[22px] px-4 py-4 transition relative group",
        isMenuOpen ? "z-[60]" : "z-10",
        "hover:bg-white active:scale-[0.995]"
      )}
    >
      {/* Clickable Overlay for Details (Default to 'view') */}
      <div
        onClick={() => onView?.("view")}
        className="absolute inset-0 z-0 h-full w-full cursor-pointer"
        aria-label="View details"
      />

      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pointer-events-none">
        {/* 1. Customer Info */}
        <div className="flex items-center gap-3 sm:min-w-[250px]">
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--admin-primary-soft)] text-[var(--admin-primary-strong)] sm:flex">
            <UserRound className="h-5.5 w-5.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-bold text-[var(--admin-text)] text-[15px]">{customer.name}</h3>
              <AdminBadge tone={customer.status === "ACTIVE" ? "success" : "blue"} className="text-[9px] uppercase h-4 px-1.5 leading-none font-bold">
                {customer.status}
              </AdminBadge>
            </div>
            <p className="text-[12px] text-gray-500 font-medium truncate mt-0.5">
              {customer.areaName} • <span className="text-[var(--admin-primary-strong)] font-bold">{customer.quantity.toFixed(1)}L</span>
            </p>
          </div>
        </div>

        {/* 2. Middle Space (Empty) */}
        <div className="flex-1 hidden sm:block" />

        {/* 3. Due & Actions Section (Right) */}
        <div className="flex items-center justify-between sm:justify-end gap-6 pointer-events-auto sm:min-w-[200px]">
          <div className="text-right">
            <p
              className={cn(
                "text-[15px] font-black tracking-tight",
                customer.due > 500 ? "text-[#e11d48]" : "text-[var(--admin-text)]"
              )}
            >
              {formatCurrencyINR(customer.due)}
            </p>
            <p className="text-[10px] font-bold uppercase text-gray-400 mt-0.5">
              Due <span className="mx-1 text-gray-300">•</span> 
              <span className="text-gray-500 lowercase first-letter:uppercase">paid: {formatDateShort(customer.lastPaymentDate)}</span>
            </p>
          </div>

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
    </article>
  );
}
