"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import {
  locales,
  localeLabels,
  type AppLocale,
} from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  locale: AppLocale;
};

/**
 * Centrally-managed language switcher.
 * - Renders a compact pill (EN / हिं / ਪੰ).
 * - Navigates to the same route under a different locale prefix.
 * - Persists the chosen locale in the NEXT_LOCALE cookie so server
 *   components honour it on fresh requests.
 */
export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: AppLocale) => {
    if (next === locale || isPending) return;

    // Swap the leading locale segment in the current URL.
    const segments = (pathname ?? "/").split("/").filter(Boolean);
    if (segments.length === 0) {
      segments.push(next);
    } else {
      segments[0] = next;
    }

    const query = searchParams?.toString();
    const target = `/${segments.join("/")}${query ? `?${query}` : ""}`;

    // Persist preference for 1 year so future visits default to it, and
    // update <html lang> so screen readers + Gurmukhi/Devanagari font
    // fallbacks switch instantly. These are deliberate DOM side-effects
    // triggered by a user click — not a render-time mutation.
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    if (typeof document !== "undefined") {
      // eslint-disable-next-line react-hooks/immutability
      document.documentElement.lang = next;
    }

    startTransition(() => {
      router.replace(target);
      router.refresh();
    });
  };

  return (
    <nav className="lang-switch" aria-label="Language">
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          className={cn("lang-btn", code === locale && "active")}
          onClick={() => switchTo(code)}
          aria-pressed={code === locale}
          aria-label={localeLabels[code].native}
          disabled={isPending}
        >
          {localeLabels[code].short}
        </button>
      ))}
    </nav>
  );
}
