"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { profile } from '@/data/profile';

export function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="card overflow-hidden p-8">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-primary/30">
            <Image src="/images/profil.jpeg" alt={profile.name} fill className="object-cover" unoptimized />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text dark:text-white">{profile.name}</h1>
            <p className="mt-1 text-neutral-600 dark:text-neutral-300">{t('title')}</p>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">{t('tagline')}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">Next.js</span>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">Cybersécurité</span>
              <span className="rounded-full bg-neutral-200 px-3 py-1 dark:bg-neutral-800">Python</span>
              <span className="rounded-full bg-neutral-200 px-3 py-1 dark:bg-neutral-800">IA</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/projects" className="btn-primary">{t('ctaProjects')}</Link>
          <a href="/cv.pdf" className="btn">{t('ctaCV')}</a>
          <Link href="/contact" className="btn">{t('ctaContact')}</Link>
          <Link href="/games" className="btn-accent">{t('ctaPlay')}</Link>
        </div>
      </div>
      <div className="mt-6 h-1 w-full rounded-full bg-gradient-to-r from-primary via-accent to-primary" />
    </section>
  );
}

