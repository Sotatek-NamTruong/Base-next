import { Pathnames } from "next-intl/navigation";
import { notFound } from "next/navigation";

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

const locales = ["en", "zh"];

const pathnames = {} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;

export { getMessages, locales, pathnames };