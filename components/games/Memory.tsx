"use client";
import { useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '@/lib/useLocalStorage';

type Card = { id: number; value: number; flipped: boolean; matched: boolean };

function createDeck(): Card[] {
  const values = Array.from({ length: 8 }, (_, i) => i + 1);
  const deck = [...values, ...values].map((v, i) => ({ id: i, value: v, flipped: false, matched: false }));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export default function Memory() {
  const [cards, setCards] = useState<Card[]>(createDeck());
  const [opened, setOpened] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [best, setBest] = useLocalStorage<number>('memory_best', 0);

  const finished = useMemo(() => cards.every((c) => c.matched), [cards]);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (opened.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = opened;
      if (cards[a].value === cards[b].value) {
        setCards((cs) => cs.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c)));
        setOpened([]);
      } else {
        setTimeout(() => {
          setCards((cs) => cs.map((c, i) => (i === a || i === b ? { ...c, flipped: false } : c)));
          setOpened([]);
        }, 600);
      }
    }
  }, [opened, cards]);

  useEffect(() => {
    if (finished) {
      setBest((b) => (b === 0 || seconds < b ? seconds : b));
    }
  }, [finished, seconds, setBest]);

  function flip(i: number) {
    if (opened.length === 2 || cards[i].flipped || cards[i].matched) return;
    setCards((cs) => cs.map((c, idx) => (idx === i ? { ...c, flipped: true } : c)));
    setOpened((o) => [...o, i]);
  }

  function reset() {
    setCards(createDeck());
    setOpened([]);
    setMoves(0);
    setSeconds(0);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span>Temps: {seconds}s</span>
        <span>Coups: {moves}</span>
        <span>Record: {best || '-'}s</span>
        <button onClick={reset} className="ms-auto btn">Réinitialiser</button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((c, i) => (
          <button key={c.id} onClick={() => flip(i)} className="flex aspect-square items-center justify-center rounded-xl border text-xl font-bold border-neutral-300 dark:border-neutral-700">
            {c.flipped || c.matched ? c.value : '•'}
          </button>
        ))}
      </div>
    </div>
  );
}

