"use client";
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  const tags = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.stack))), []);
  const filtered = useMemo(
    () =>
      projects.filter((p) =>
        (tag ? p.stack.includes(tag) : true) &&
        (query ? (p.title + p.summary).toLowerCase().includes(query.toLowerCase()) : true)
      ),
    [query, tag]
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search')}
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 dark:border-neutral-700 dark:bg-neutral-900"
        />
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="rounded-xl border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
        >
          <option value="">{t('filter')}</option>
          {tags.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <button onClick={() => { setQuery(''); setTag(''); }} className="btn">{t('clear')}</button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div key={p.slug} onClick={() => setOpen(p.slug)} className="cursor-pointer">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 p-4" onClick={() => setOpen(null)}>
          <div className="mx-auto max-w-xl rounded-2xl bg-white p-4 shadow-xl dark:bg-neutral-900" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const p = projects.find((x) => x.slug === open)!;
              return (
                <div className="space-y-3">
                  <div className="relative aspect-video w-full">
                    <Image src={p.image} alt={p.title} fill className="object-cover rounded-xl" />
                  </div>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">{p.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((tag) => (
                      <span key={tag} className="rounded-lg bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-800">{tag}</span>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <button className="btn" onClick={() => setOpen(null)}>Fermer</button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </main>
  );
}

