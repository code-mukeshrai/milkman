"use client";

import { useEffect, useState } from "react";
import { 
  Building2, 
  CalendarDays, 
  CircleCheck, 
  CirclePause, 
  CircleX, 
  CreditCard, 
  MapPin, 
  Phone, 
  WalletCards 
} from "lucide-react";
import { AdminBadge, AdminDivider, AdminModal } from "@/components/layout/admin-ui";
import { cn, formatCurrencyINR } from "@/lib/utils";

type DeliveryLog = {
  dateLabel: string;
  status: "DELIVERED" | "SKIPPED" | "PAUSED";
  finalQuantity: number;
  extraQuantity: number;
};

type CustomerDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  customer: {
    customerCode: string;
    name: string;
    phone: string;
    address: string;
    areaName: string;
    areaCode: string;
    quantityLabel: string;
    rate: number;
    due: number;
    notes?: string;
  } | null;
  locale: string;
  mode?: "view" | "details";
};

export function CustomerDetailModal({ 
  isOpen, 
  onClose, 
  customer, 
  locale,
  mode = "details"
}: CustomerDetailModalProps) {
  const [logs, setLogs] = useState<DeliveryLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && customer) {
      setIsLoading(true);
      fetch(`/api/customers/${customer.customerCode}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.customer?.recentDeliveries) {
            setLogs(data.customer.recentDeliveries);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, customer]);

  if (!customer) return null;

  return (
    <AdminModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={mode === "view" ? "Customer Preview" : "Customer Profile"}
    >
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="flex flex-col gap-1 mb-2">
          <h2 className="text-xl font-black text-[var(--admin-text)] tracking-tight">{customer.name}</h2>
          <p className="text-xs font-bold text-[var(--admin-muted)] uppercase tracking-widest">{customer.customerCode}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="admin-panel-muted rounded-[24px] p-4">
            <div className="flex items-center gap-2 text-[var(--admin-muted)]">
              <Phone className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Contact</span>
            </div>
            <p className="mt-2 text-base font-bold text-[var(--admin-text)]">{customer.phone}</p>
          </div>
          
          {mode === "details" && (
            <div className="admin-panel-muted rounded-[24px] p-4">
              <div className="flex items-center gap-2 text-[var(--admin-muted)]">
                <Building2 className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Area</span>
              </div>
              <p className="mt-2 text-base font-bold text-[var(--admin-text)]">
                {customer.areaName} ({customer.areaCode})
              </p>
            </div>
          )}
        </div>

        {mode === "details" && (
          <div className="admin-panel-muted rounded-[24px] p-4">
            <div className="flex items-center gap-2 text-[var(--admin-muted)]">
              <MapPin className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Address</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--admin-text)]">{customer.address}</p>
          </div>
        )}

        <AdminDivider className="my-2" />

        {/* Financials & Plan */}
        <div className={cn("grid gap-4", mode === "view" ? "sm:grid-cols-2" : "sm:grid-cols-3")}>
          <div className="rounded-[24px] bg-[var(--admin-primary-soft)] p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--admin-muted)]">Milk Plan</p>
            <p className="mt-1 text-xl font-bold text-[var(--admin-text)]">{customer.quantityLabel}</p>
          </div>
          {mode === "details" && (
            <div className="rounded-[24px] bg-white border border-[var(--admin-border)] p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--admin-muted)]">Rate</p>
              <p className="mt-1 text-xl font-bold text-[var(--admin-text)]">{formatCurrencyINR(customer.rate)}</p>
            </div>
          )}
          <div className="rounded-[24px] bg-white border border-[var(--admin-border)] p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--admin-muted)]">Due Amount</p>
            <p className="mt-1 text-xl font-bold text-[#d14646]">{formatCurrencyINR(customer.due)}</p>
          </div>
        </div>

        {mode === "details" && customer.notes && (
          <div className="admin-panel-muted rounded-[24px] p-4">
            <div className="flex items-center gap-2 text-[var(--admin-muted)]">
              <WalletCards className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Notes</span>
            </div>
            <p className="mt-2 text-sm italic text-[var(--admin-text)]">{customer.notes}</p>
          </div>
        )}

        {mode === "details" && (
          <>
            <AdminDivider className="my-2" />

            {/* Delivery Logs */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2 text-base font-bold text-[var(--admin-text)]">
                  <CalendarDays className="h-4 w-4 text-[var(--admin-primary)]" />
                  Recent Delivery Logs
                </h3>
              </div>
              
              <div className="space-y-2">
                {isLoading ? (
                  <div className="py-8 text-center text-sm text-[var(--admin-muted)] animate-pulse">
                    Loading history...
                  </div>
                ) : logs.length > 0 ? (
                  logs.map((log, index) => (
                    <div key={index} className="flex items-center justify-between rounded-[20px] bg-white border border-[var(--admin-border)] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full",
                          log.status === "DELIVERED" ? "bg-emerald-50 text-emerald-600" :
                          log.status === "PAUSED" ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                        )}>
                          {log.status === "DELIVERED" ? <CircleCheck className="h-5 w-5" /> :
                           log.status === "PAUSED" ? <CirclePause className="h-5 w-5" /> : <CircleX className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[var(--admin-text)]">{log.dateLabel}</p>
                          <p className="text-xs text-[var(--admin-muted)]">
                            {log.status === "DELIVERED" ? `${log.finalQuantity} L delivered` : log.status}
                          </p>
                        </div>
                      </div>
                      <AdminBadge tone={
                        log.status === "DELIVERED" ? "success" : 
                        log.status === "PAUSED" ? "warning" : "danger"
                      } className="text-[10px] uppercase">
                        {log.status}
                      </AdminBadge>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-sm text-[var(--admin-muted)] border-2 border-dashed border-[var(--admin-border)] rounded-[24px]">
                    No recent activity found.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminModal>
  );
}
