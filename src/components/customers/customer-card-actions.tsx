"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart2, CircleCheck, Eye, FilePenLine, MoreVertical } from "lucide-react";

type CustomerCardActionsProps = {
  id: string;
  customerCode: string;
  locale: string;
  onView?: () => void;
  isMenuOpen?: boolean;
  setMenuOpen?: (isOpen: boolean) => void;
};

export function CustomerCardActions({ 
  id, 
  customerCode, 
  locale, 
  onView,
  isMenuOpen = false,
  setMenuOpen
}: CustomerCardActionsProps) {
  const [loading, setLoading] = useState<"SKIP" | "PAUSE" | "DELIVERED" | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen?.(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, setMenuOpen]);

  async function handleDeliveryAction(type: "SKIP" | "PAUSE" | "DELIVERED") {
    const status = type === "SKIP" ? "SKIPPED" : type === "PAUSE" ? "PAUSED" : "DELIVERED";
    console.log(`[DeliveryAction] Clickted ${status} for ${customerCode} (ID: ${id})`);
    setLoading(type);
    
    try {
      const response = await fetch(`/api/deliveries/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      console.log(`[DeliveryAction] Success: ${customerCode} updated to ${status}`);
      router.refresh();
    } catch (error) {
      console.error(`[DeliveryAction] Error:`, error);
      alert("Failed to update delivery. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); handleDeliveryAction("DELIVERED"); }}
        disabled={loading !== null}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--admin-primary-strong)] text-white shadow-sm transition-all hover:scale-110 hover:bg-emerald-600 active:scale-95 disabled:opacity-50"
        aria-label="Mark delivered"
        title="Delivered"
      >
        {loading === "DELIVERED" ? "..." : <CircleCheck className="h-5 w-5" />}
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); handleDeliveryAction("SKIP"); }}
        disabled={loading !== null}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--admin-border)] bg-white text-base font-semibold shadow-sm transition-all hover:bg-red-50 hover:text-red-500 active:scale-95 disabled:opacity-50"
        aria-label="Skip delivery"
        title="Skip"
      >
        {loading === "SKIP" ? "..." : "❌"}
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); handleDeliveryAction("PAUSE"); }}
        disabled={loading !== null}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--admin-border)] bg-white text-base font-semibold shadow-sm transition-all hover:bg-slate-50 hover:text-slate-600 active:scale-95 disabled:opacity-50"
        aria-label="Pause delivery"
        title="Pause"
      >
        {loading === "PAUSE" ? "..." : "⏸"}
      </button>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={(e) => { 
            e.stopPropagation();
            console.log(`[Menu] Opening menu for ${customerCode}`);
            setMenuOpen?.(!isMenuOpen); 
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--admin-border)] bg-white text-[var(--admin-text)] shadow-sm transition-all hover:bg-[var(--admin-panel-muted)] active:scale-95"
          aria-label="More options"
        >
          <MoreVertical className="h-4 w-4" />
        </button>

        {isMenuOpen && (
          <div 
            className="absolute right-0 top-full z-[50] mt-2 w-44 overflow-hidden rounded-[16px] border border-[var(--admin-border)] bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setMenuOpen?.(false);
                onView?.();
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-panel-muted)]"
            >
              <Eye className="h-4 w-4 text-[var(--admin-muted)]" />
              View
            </button>
            <button
              onClick={() => {
                setMenuOpen?.(false);
                onView?.();
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-panel-muted)]"
            >
              <BarChart2 className="h-4 w-4 text-[var(--admin-muted)]" />
              Details
            </button>
            <Link
              href={`/${locale}/admin/customers/${customerCode}/edit`}
              onClick={() => setMenuOpen?.(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-panel-muted)]"
            >
              <FilePenLine className="h-4 w-4 text-[var(--admin-muted)]" />
              Edit
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
