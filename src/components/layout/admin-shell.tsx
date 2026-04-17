"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Building2,
  Bell,
  CalendarDays,
  ChartColumn,
  ChevronRight,
  CreditCard,
  Droplets,
  Home,
  Menu,
  NotebookText,
  Package2,
  Plus,
  ShoppingCart,
  Store,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  children: React.ReactNode;
  locale: string;
  title: string;
  subtitle: string;
};

const navItems = [
  { href: "dashboard", label: "Dashboard", icon: Home },
  { href: "customers", label: "Customers", icon: Users },
  { href: "areas", label: "Areas", icon: Building2 },
  { href: "products", label: "Products", icon: Package2 },
  { href: "vendors", label: "Vendors", icon: Store },
  { href: "purchases", label: "Purchases", icon: ShoppingCart },
  { href: "calendar", label: "Calendar", icon: CalendarDays },
  { href: "deliveries", label: "Deliveries", icon: Droplets },
  { href: "billing", label: "Billing", icon: CreditCard },
  { href: "reports", label: "Reports", icon: ChartColumn },
];

export function AdminShell({ children, locale, title, subtitle }: AdminShellProps) {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const renderNavItem = ({
    href,
    label,
    icon: Icon,
  }: (typeof navItems)[number]) => {
    const target = `/${locale}/admin/${href}`;
    const isActive = pathname === target || pathname.startsWith(`${target}/`);

    return (
      <Link
        key={href}
        href={target}
        onClick={() => setIsDrawerOpen(false)}
        className={cn("admin-nav-item", isActive && "admin-nav-item-active")}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-sm font-medium">{label}</span>
        <ChevronRight className="h-4 w-4 shrink-0 opacity-60" />
      </Link>
    );
  };

  return (
    <div className="admin-theme">
      <div className="mx-auto flex min-h-screen max-w-[1440px] gap-4 px-3 py-3 sm:px-4 lg:px-5">
        <aside className="admin-panel sticky top-3 hidden h-[calc(100vh-1.5rem)] w-[296px] shrink-0 rounded-[32px] p-5 lg:flex lg:flex-col">
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--admin-primary-soft)] text-[var(--admin-primary-strong)]">
              <Droplets className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-[var(--admin-muted)]">
                Milkman
              </p>
              <p className="mt-1 text-xl font-semibold text-[var(--admin-text)]">Admin Panel</p>
            </div>
          </div>

          <div className="admin-panel-muted mt-6 rounded-[24px] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--admin-muted)]">
              Workspace
            </p>
            <p className="mt-2 text-base font-semibold">Morning Delivery Run</p>
            <p className="mt-1 text-sm leading-6 text-[var(--admin-muted)]">
              Compact control room for customers, routes, billing, and daily delivery marks.
            </p>
          </div>

          <nav className="mt-6 space-y-2">{navItems.map(renderNavItem)}</nav>

          <div className="admin-divider my-6" />

          <div className="admin-panel-muted rounded-[24px] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--admin-primary-soft)] text-[var(--admin-primary-strong)]">
                <NotebookText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--admin-muted)]">
                  Help
                </p>
                <p className="text-sm font-semibold">Need billing guidance?</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--admin-muted)]">
              Keep the morning route smooth with quick access to delivery and dues summaries.
            </p>
          </div>
        </aside>

        <div
          className={cn(
            "fixed inset-0 z-40 bg-[#12213c]/28 transition duration-200 lg:hidden",
            isDrawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          )}
          onClick={() => setIsDrawerOpen(false)}
        />

        <aside
          className={cn(
            "fixed left-0 top-0 z-50 h-full w-[308px] max-w-[86vw] p-3 transition-transform duration-200 lg:hidden",
            isDrawerOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="admin-panel flex h-full flex-col rounded-[32px] p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--admin-primary-soft)] text-[var(--admin-primary-strong)]">
                  <Droplets className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--admin-muted)]">
                    Milkman
                  </p>
                  <p className="text-lg font-semibold">Admin Menu</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="admin-icon-button h-11 w-11"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="admin-panel-muted mt-5 rounded-[24px] p-4">
              <p className="text-sm font-medium text-[var(--admin-muted)]">Active route</p>
              <p className="mt-1 text-base font-semibold">128 customers this cycle</p>
            </div>

            <nav className="mt-5 space-y-2">{navItems.map(renderNavItem)}</nav>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-3 z-30 mb-4">
            <div className="admin-panel rounded-[30px] px-4 py-3 sm:px-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(true)}
                    className="admin-icon-button h-11 w-11 lg:hidden"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--admin-muted)]">
                      Milkman workspace
                    </p>
                    <p className="truncate text-lg font-semibold text-[var(--admin-text)] sm:text-xl">
                      {title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/${locale}/admin/deliveries`}
                    className="admin-primary-button px-4 py-2.5 text-sm font-semibold"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Quick Mark</span>
                    <span className="sm:hidden">Mark</span>
                  </Link>
                  <button type="button" className="admin-icon-button h-11 w-11">
                    <Bell className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          <main className="space-y-4 pb-4">
            <section className="admin-panel rounded-[32px] px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--admin-muted)]">
                    Seller control room
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--admin-text)] sm:text-3xl">
                    {title}
                  </h1>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--admin-muted)] sm:text-[15px]">
                    {subtitle}
                  </p>
                </div>
                <div className="admin-panel-muted rounded-[22px] px-4 py-3 text-sm text-[var(--admin-muted)]">
                  <span className="font-semibold text-[var(--admin-text)]">Live mode</span>
                  <span className="mx-2 text-[var(--admin-border)]">•</span>
                  <span>Super admin preview</span>
                </div>
              </div>
            </section>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
