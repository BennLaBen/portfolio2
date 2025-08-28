import '../(site)/globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { ClientProviders } from '@/components/ClientProviders';
import { AboutNote } from '@/components/AboutNote';

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#111827' }, { color: '#ffffff' }]
};

export const metadata: Metadata = {
  title: {
    default: 'Rayan Carré – Cybersécurité & Logiciels',
    template: '%s • Rayan Carré'
  },
  description: 'Portfolio – cybersécurité, IA, data, et jeux interactifs.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
  metadataBase: new URL('https://rayan-carre.dev')
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    // Fallback FR si indisponible pour éviter 404
    return (await import(`../../messages/fr.json`)).default;
  }
}

export default async function SiteLayout({ children, params }: { children: ReactNode; params: { locale?: string } }) {
  const locale = params?.locale ?? 'fr';
  const messages = await getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProviders>
            <Navbar />
            {children}
            <AboutNote />
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

