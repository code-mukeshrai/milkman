import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const locales = ["en", "hi", "pa"] as const;
export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";

export const localeLabels: Record<AppLocale, { short: string; native: string }> = {
  en: { short: "EN", native: "English" },
  hi: { short: "हिं", native: "हिंदी" },
  pa: { short: "ਪੰ", native: "ਪੰਜਾਬੀ" },
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});

const navigation = createNavigation(routing);

export const Link = navigation.Link;
export const redirect = navigation.redirect;
export const usePathname = navigation.usePathname;
export const useRouter = navigation.useRouter;
export const getPathname = navigation.getPathname;

export function isValidLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}
