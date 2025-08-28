import Link from 'next/link';

export default function CyberLabPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Cyber Lab (sécurisé)</h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-300">Démonstrations pédagogiques et sûres. Aucun scan réseau réel.</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link className="card p-6" href="/cyber-lab/password">
          <h3 className="mb-2 font-semibold">Force du mot de passe</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">Score, critères, conseils.</p>
        </Link>
        <Link className="card p-6" href="/cyber-lab/hash">
          <h3 className="mb-2 font-semibold">Hachage SHA-256</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">Texte/fichier → SHA-256.</p>
        </Link>
        <Link className="card p-6 md:col-span-2" href="/cyber-lab/generator">
          <h3 className="mb-2 font-semibold">Générateur de mots de passe</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">Options, entropie, copie.</p>
        </Link>
        <Link className="card p-6" href="/cyber-lab/base64">
          <h3 className="mb-2 font-semibold">Encodeur/Décodeur Base64</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">Conversion deux sens.</p>
        </Link>
      </div>
    </main>
  );
}

