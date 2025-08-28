import dynamic from 'next/dynamic';

const TicTacToe = dynamic(() => import('@/components/games/TicTacToe'), { ssr: false });

export default function TttPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Morpion</h1>
      <div className="card p-4"><TicTacToe /></div>
    </main>
  );
}

