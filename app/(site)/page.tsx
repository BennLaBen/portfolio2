"use client";
import { Hero } from '@/components/sections/Hero';
import { Skills } from '@/components/sections/Skills';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { projects } from '@/data/projects';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations();
  const featured = projects.slice(0, 3);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-12">
      <Hero />
      <section className="card p-6">
        <p className="text-neutral-700 dark:text-neutral-300">{t('hero.tagline')}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="/cv.pdf" target="_blank" className="btn-primary">{t('hero.ctaCV')}</a>
          <Link href="/contact" className="btn">{t('hero.ctaContact')}</Link>
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-bold">{t('sections.skills')}</h2>
        <Skills />
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-bold">{t('services.title')}</h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {t.raw('services.items').map((s: string, i: number) => (
            <li key={i} className="card p-5">{s}</li>
          ))}
        </ul>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-primary">{projects.length}+</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-300">{t('stats.projects')}</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-primary">500+</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-300">{t('stats.hours')}</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-primary">10+</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-300">{t('stats.clients')}</div>
        </div>
      </section>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{t('sections.featured')}</h2>
          <Link href="/projects" className="text-primary underline">
            {t('nav.projects')}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="mb-2 text-xl font-semibold">{t('sections.gamezone')}</h3>
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-300">Jouez à Snake, Morpion et Memory.</p>
          <Link href="/games" className="btn-primary">{t('hero.ctaPlay')}</Link>
        </div>
        <div className="card p-6">
          <h3 className="mb-2 text-xl font-semibold">{t('sections.cyberlab')}</h3>
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-300">Outils sûrs: force mot de passe, SHA-256, Regex.</p>
          <Link href="/cyber-lab" className="btn-accent">{t('sections.cyberlab')}</Link>
        </div>
      </section>
      <section className="text-center">
        <Link href="/contact" className="btn-primary">
          {t('sections.contact')}
        </Link>
      </section>
    </main>
  );
}

