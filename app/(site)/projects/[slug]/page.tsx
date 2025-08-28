import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-bold">Projet introuvable</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">Le projet demandé n'existe pas.</p>
        <Link href="/projects" className="mt-4 inline-block text-primary underline">Retour aux projets</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <div className="card overflow-hidden">
        <div className="relative aspect-video w-full bg-neutral-100 dark:bg-neutral-800">
          <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
        </div>
        <div className="p-4 space-y-3">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <p className="text-neutral-600 dark:text-neutral-300">{project.summary}</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="rounded bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-800">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <section className="card p-4 space-y-2">
        <h2 className="text-xl font-semibold">Contexte & objectifs</h2>
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          Projet mené par Rayan Carré (Ynov Aix-en-Provence). Objectifs: concevoir un POC crédible,
          démontrer des bonnes pratiques (sécurité/logiciel), documenter les choix techniques et l'impact.
        </p>
      </section>

      <section className="card p-4 space-y-2">
        <h2 className="text-xl font-semibold">Rôle & responsabilités</h2>
        <ul className="list-disc ps-5 text-sm text-neutral-700 dark:text-neutral-300">
          <li>Conception technique, implémentation et tests.</li>
          <li>Sécurité applicative de base (validation, gestion erreurs, sensibilisation).</li>
          <li>Itération rapide et présentation des résultats.</li>
        </ul>
      </section>

      <section className="card p-4 space-y-2">
        <h2 className="text-xl font-semibold">Résultats</h2>
        <p className="text-sm text-neutral-700 dark:text-neutral-300">Prototype fonctionnel, base de code propre et extensible, pistes d'amélioration.</p>
      </section>

      <div className="flex gap-3">
        <Link href="/projects" className="btn">Retour</Link>
        {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="btn-primary">GitHub</a>}
        {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="btn-accent">Live</a>}
      </div>
    </main>
  );
}


