import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";

export const locales = ["en", "de", "hi", "fr", "ru", "mn", "bn"] as const;
export const localePrefix = "always"; // Default

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  "/": {
    en: "/",
    de: "/",
    hi: "/",
    fr: "/",
    ru: "/",
    mn: "/",
    bn: "/",
  },
  "/blogs": {
    en: "/blogs",
    de: "/blogs",
    hi: "/blogs",
    fr: "/blogs",
    ru: "/blogs",
    mn: "/blogs",
    bn: "/blogs",
  },

  // If locales use different paths, you can
  // specify each external path per locale.
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
