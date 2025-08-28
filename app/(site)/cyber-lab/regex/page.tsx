import dynamic from 'next/dynamic';

const RegexTester = dynamic(() => import('@/components/lab/RegexTester'), { ssr: false });

export default function RegexPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Testeur Regex</h1>
      <div className="card p-4"><RegexTester /></div>
    </main>
  );
}


