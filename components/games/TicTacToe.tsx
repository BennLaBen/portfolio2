"use client";
import { useMemo, useState } from 'react';

type Player = 'X' | 'O' | null;
type Board = Player[];

function winnerOf(board: Board): Player {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

function minimax(board: Board, isMax: boolean): number {
  const win = winnerOf(board);
  if (win === 'X') return 1;
  if (win === 'O') return -1;
  if (board.every(Boolean)) return 0;
  const player: Player = isMax ? 'X' : 'O';
  const scores: number[] = [];
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = player;
      scores.push(minimax(board, !isMax));
      board[i] = null;
    }
  }
  return isMax ? Math.max(...scores) : Math.min(...scores);
}

function bestMove(board: Board): number {
  let move = 0;
  let bestScore = -Infinity;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'X';
      const score = minimax(board, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [history, setHistory] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<'easy' | 'hard'>('hard');
  const [scores, setScores] = useState<{ X: number; O: number; draw: number }>({ X: 0, O: 0, draw: 0 });
  const current = useMemo(() => winnerOf(board), [board]);

  function play(i: number) {
    if (board[i] || current) return;
    const b = board.slice();
    b[i] = 'O';
    setBoard(b);
    setHistory((h) => [...h, `O -> ${i + 1}`]);
    const idx = difficulty === 'hard' ? bestMove(b) : (b.findIndex((v) => v === null));
    if (idx >= 0) {
      b[idx] = 'X';
      setBoard(b.slice());
      setHistory((h) => [...h, `X -> ${idx + 1}`]);
    }
    const w = winnerOf(b);
    if (w === 'X') setScores((s) => ({ ...s, X: s.X + 1 }));
    else if (w === 'O') setScores((s) => ({ ...s, O: s.O + 1 }));
    else if (b.every(Boolean)) setScores((s) => ({ ...s, draw: s.draw + 1 }));
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as any)} className="rounded-xl border border-neutral-200 bg-white px-3 py-1 dark:border-neutral-700 dark:bg-neutral-900">
            <option value="easy">Facile</option>
            <option value="hard">Difficile</option>
          </select>
          {current && <span>Gagnant: {current}</span>}
          {!current && board.every(Boolean) && <span>Égalité</span>}
          <span className="ms-auto text-xs text-neutral-500">Scores — X: {scores.X} • O: {scores.O} • =: {scores.draw}</span>
        </div>
        <div className="grid w-60 grid-cols-3 gap-2">
          {board.map((v, i) => (
            <button key={i} onClick={() => play(i)} className="h-20 rounded-xl border text-2xl font-bold border-neutral-300 dark:border-neutral-700">
              {v}
            </button>
          ))}
        </div>
        <button onClick={() => { setBoard(Array(9).fill(null)); setHistory([]); }} className="mt-3 btn">Réinitialiser</button>
      </div>
      <div>
        <h3 className="mb-2 font-semibold">Historique</h3>
        <ul className="space-y-1 text-sm">
          {history.map((h, i) => (
            <li key={i} className="rounded-lg bg-neutral-100 px-2 py-1 dark:bg-neutral-800">{h}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

