"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  History,
  Home,
  IndianRupee,
  Plus,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type CustomerShellProps = {
  children: React.ReactNode;
  locale: string;
};

type NavKey = "dashboard" | "calendar" | "billing" | "history" | "profile";

type NavItem = {
  key: NavKey;
  href: string;
  labelKey:
    | "nav.home"
    | "nav.calendar"
    | "nav.billing"
    | "nav.history"
    | "nav.profile";
  icon: typeof Home;
  fab?: boolean;
};

const navItems: NavItem[] = [
  { key: "dashboard", href: "dashboard", labelKey: "nav.home", icon: Home },
  { key: "calendar", href: "calendar", labelKey: "nav.calendar", icon: CalendarDays },
  { key: "billing", href: "billing", labelKey: "nav.billing", icon: IndianRupee, fab: true },
  { key: "history", href: "history", labelKey: "nav.history", icon: History },
  { key: "profile", href: "profile", labelKey: "nav.profile", icon: User },
];

export function CustomerShell({ children, locale }: CustomerShellProps) {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <>
      <main className="app-shell-main">{children}</main>
      <nav className="bottom-nav" aria-label="Primary">
        {navItems.map(({ key, href, labelKey, icon: Icon, fab }) => {
          const target = `/${locale}/customer/${href}`;
          const isActive = pathname === target;
          if (fab) {
            return (
              <Link
                key={key}
                href={target}
                className="nav-item"
                aria-label={t(labelKey as never)}
              >
                <span className="nav-fab">
                  <Plus className="h-5 w-5" />
                </span>
              </Link>
            );
          }
          return (
            <Link
              key={key}
              href={target}
              className={cn("nav-item", isActive && "active")}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{t(labelKey as never)}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
