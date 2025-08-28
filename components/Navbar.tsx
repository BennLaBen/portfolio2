"use client";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { Sun, Moon } from 'lucide-react';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  function toggleLocale() {
    const next = locale === 'fr' ? 'en' : 'fr';
    document.cookie = `NEXT_LOCALE=${next}; Max-Age=31536000; Path=/`;
    window.location.reload();
  }
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/70 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold">Rayan Carré</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/projects">Projets</Link>
          <Link href="/games">Jeux</Link>
          <Link href="/cyber-lab">Cyber Lab</Link>
          <Link href="/about">À propos</Link>
          <Link href="/contact">Contact</Link>
          <button
            aria-label="Toggle theme"
            className="rounded-xl border px-2 py-1 text-xs border-neutral-300 dark:border-neutral-700"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button onClick={toggleLocale} className="rounded-xl border px-2 py-1 text-xs border-neutral-300 dark:border-neutral-700">
            {locale === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>
      </nav>
    </header>
  );
}

