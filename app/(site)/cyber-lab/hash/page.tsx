import dynamic from 'next/dynamic';

const HashTool = dynamic(() => import('@/components/lab/HashTool'), { ssr: false });

export default function HashPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Hachage SHA-256</h1>
      <div className="card p-4"><HashTool /></div>
    </main>
  );
}


