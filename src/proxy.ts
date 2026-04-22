import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "@/i18n/routing";

const proxy = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export default proxy;

export const config = {
  matcher: ["/", "/(en|hi|pa)/:path*"],
};
