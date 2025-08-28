import { profile } from '@/data/profile';
import { Timeline } from '@/components/sections/Timeline';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">À propos</h1>
      <section className="card p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-primary/30">
            <Image src="/images/profil.jpeg" alt={profile.name} fill className="object-cover" unoptimized />
          </div>
          <p><strong>{profile.name}</strong> — {profile.title} ({profile.location})</p>
        </div>
        <p>Centres d’intérêt: boxe, trading/investissement, entrepreneuriat.</p>
        <p className="text-neutral-600 dark:text-neutral-300">{profile.summary}</p>
      </section>
      <section>
        <h2 className="mb-3 text-2xl font-semibold">Parcours</h2>
        <Timeline />
      </section>
      <section className="card p-6 space-y-3">
        <h2 className="text-2xl font-semibold">Profil rapide</h2>
        <p><strong>Étudiant à Ynov Campus Aix-en-Provence</strong> — orienté cybersécurité, IA et data. J’aime concevoir des outils utiles (web, jeux, lab sécurité) et transformer des idées en produits concrets.</p>
        <ul className="list-disc ps-5 text-sm text-neutral-700 dark:text-neutral-300">
          <li>Cybersécurité: pratiques OWASP, automatisation d’audits, sensibilisation.</li>
          <li>Logiciels: Next.js/TypeScript, Python pour data et scripts sécurité.</li>
          <li>IA & data: usages concrets pour la détection/automatisation.</li>
        </ul>
      </section>
    </main>
  );
}

