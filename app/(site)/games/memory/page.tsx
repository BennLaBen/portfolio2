import dynamic from 'next/dynamic';

const Memory = dynamic(() => import('@/components/games/Memory'), { ssr: false });

export default function MemoryPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Memory</h1>
      <div className="card p-4"><Memory /></div>
    </main>
  );
}

