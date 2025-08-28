import dynamic from 'next/dynamic';

const Base64Tool = dynamic(() => import('@/components/lab/Base64Tool'), { ssr: false });

export default function Base64Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Encodeur/Décodeur Base64</h1>
      <div className="card p-4"><Base64Tool /></div>
    </main>
  );
}


