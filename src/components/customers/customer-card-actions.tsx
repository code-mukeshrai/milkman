"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart2, Eye, FilePenLine, MoreVertical } from "lucide-react";

type CustomerCardActionsProps = {
  customerCode: string;
  locale: string;
};

export function CustomerCardActions({ customerCode, locale }: CustomerCardActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState<"SKIP" | "PAUSE" | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleDeliveryAction(type: "SKIP" | "PAUSE") {
    setLoading(type);
    try {
      await fetch("/api/deliveries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerCode, type }),
      });
      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => handleDeliveryAction("SKIP")}
        disabled={loading !== null}
        className="admin-secondary-button h-10 w-10 justify-center p-0 text-base font-semibold disabled:opacity-60"
        aria-label="Skip delivery"
        title="Skip"
      >
        {loading === "SKIP" ? "..." : "❌"}
      </button>

      <button
        type="button"
        onClick={() => handleDeliveryAction("PAUSE")}
        disabled={loading !== null}
        className="admin-outline-button h-10 w-10 justify-center p-0 text-base font-semibold disabled:opacity-60"
        aria-label="Pause delivery"
        title="Pause"
      >
        {loading === "PAUSE" ? "..." : "⏸"}
      </button>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="admin-outline-button h-10 w-10 justify-center p-0 text-sm font-semibold"
          aria-label="More options"
        >
          <MoreVertical className="h-4 w-4" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-[16px] border border-[var(--admin-border)] bg-white shadow-lg">
            <Link
              href={`/${locale}/admin/customers/${customerCode}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-panel-muted)]"
            >
              <Eye className="h-4 w-4 text-[var(--admin-muted)]" />
              View
            </Link>
            <Link
              href={`/${locale}/admin/customers/${customerCode}?tab=analytics`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-panel-muted)]"
            >
              <BarChart2 className="h-4 w-4 text-[var(--admin-muted)]" />
              Details
            </Link>
            <Link
              href={`/${locale}/admin/customers/${customerCode}/edit`}
              onClick={() => setMenuOpen(false)}
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
