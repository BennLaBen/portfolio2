import dynamic from 'next/dynamic';

const PasswordGenerator = dynamic(() => import('@/components/lab/PasswordGenerator'), { ssr: false });

export default function GeneratorPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Générateur de mots de passe</h1>
      <div className="card p-4"><PasswordGenerator /></div>
    </main>
  );
}


