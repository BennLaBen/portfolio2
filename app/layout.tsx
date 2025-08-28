import './(site)/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rayan Carré',
  description: 'Portfolio – cybersécurité & logiciels'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

