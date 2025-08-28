import { getRequestConfig } from 'next-intl/server';

export const locales = ['fr', 'en'] as const;
export type AppLocale = typeof locales[number];
export const defaultLocale: AppLocale = 'fr';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || defaultLocale;
  const messages = (await import(`../messages/${locale}.json`)).default;
  return { locale, messages };
});

export const i18nRouting = {
  locales: locales as unknown as string[],
  defaultLocale,
  localePrefix: 'never' as const
};

