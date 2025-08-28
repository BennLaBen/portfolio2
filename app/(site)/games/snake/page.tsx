import dynamic from 'next/dynamic';

const Snake = dynamic(() => import('@/components/games/Snake'), { ssr: false });

export default function SnakePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Snake</h1>
      <div className="card p-4"><Snake /></div>
    </main>
  );
}

