"use client";
import Link from 'next/link';
import { useLocalStorage } from '@/lib/useLocalStorage';

export default function GamesIndexPage() {
  const [bestSnake] = useLocalStorage<number>('snake_best', 0);
  const [bestMemory] = useLocalStorage<number>('memory_best', 0);
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Jeux</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Link className="card p-6" href="/games/snake">
          <div className="flex items-center justify-between">
            <span>Snake</span>
            <span className="text-xs text-neutral-500">Record: {bestSnake}</span>
          </div>
        </Link>
        <Link className="card p-6" href="/games/tictactoe">
          <div className="flex items-center justify-between">
            <span>Morpion</span>
            <span className="text-xs text-neutral-500">IA minimax</span>
          </div>
        </Link>
        <Link className="card p-6" href="/games/memory">
          <div className="flex items-center justify-between">
            <span>Memory</span>
            <span className="text-xs text-neutral-500">Meilleur temps: {bestMemory || '-'}s</span>
          </div>
        </Link>
      </div>
    </main>
  );
}

