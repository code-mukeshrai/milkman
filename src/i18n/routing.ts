export const locales = ["en", "hi", "pa"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";

export const localeLabels: Record<AppLocale, { short: string; native: string }> = {
  en: { short: "EN", native: "English" },
  hi: { short: "हिं", native: "हिंदी" },
  pa: { short: "ਪੰ", native: "ਪੰਜਾਬੀ" },
};

export function isValidLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}
