"use client";
import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from '@/lib/useLocalStorage';

type Point = { x: number; y: number };

export default function Snake() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 });
  const [snake, setSnake] = useState<Point[]>([{ x: 8, y: 8 }]);
  const [food, setFood] = useState<Point>({ x: 12, y: 8 });
  const [wrap, setWrap] = useState(true);
  const [score, setScore] = useState(0);
  const [best, setBest] = useLocalStorage<number>('snake_best', 0);

  const size = 20;
  const grid = 16;

  function placeFood() {
    setFood({ x: Math.floor(Math.random() * grid), y: Math.floor(Math.random() * grid) });
  }

  function tick() {
    setSnake((prev) => {
      const head = { x: prev[0].x + direction.x, y: prev[0].y + direction.y };
      if (wrap) {
        head.x = (head.x + grid) % grid;
        head.y = (head.y + grid) % grid;
      }
      const newSnake = [head, ...prev];
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 1);
        placeFood();
      } else {
        newSnake.pop();
      }
      if (!wrap && (head.x < 0 || head.y < 0 || head.x >= grid || head.y >= grid)) {
        restart();
        return prev;
      }
      if (newSnake.slice(1).some((p) => p.x === head.x && p.y === head.y)) {
        restart();
        return prev;
      }
      return newSnake;
    });
  }

  function restart() {
    setBest((b) => (score > b ? score : b));
    setScore(0);
    setSnake([{ x: 8, y: 8 }]);
    setDirection({ x: 1, y: 0 });
  }

  useEffect(() => {
    const handle = setInterval(tick, 120);
    return () => clearInterval(handle);
  });

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (key === 'arrowup' || key === 'w' || key === 'z') setDirection({ x: 0, y: -1 });
      if (key === 'arrowdown' || key === 's') setDirection({ x: 0, y: 1 });
      if (key === 'arrowleft' || key === 'a' || key === 'q') setDirection({ x: -1, y: 0 });
      if (key === 'arrowright' || key === 'd') setDirection({ x: 1, y: 0 });
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // grid
    ctx.fillStyle = '#11182710';
    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) {
        ctx.fillRect(i * size, j * size, size - 1, size - 1);
      }
    }
    // food
    ctx.fillStyle = '#F59E0B';
    ctx.fillRect(food.x * size, food.y * size, size, size);
    // snake
    ctx.fillStyle = '#2F55D4';
    snake.forEach((p) => ctx.fillRect(p.x * size, p.y * size, size, size));
  }, [snake, food]);

  // touch swipe
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let startX = 0, startY = 0;
    function start(e: TouchEvent) { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }
    function move(e: TouchEvent) {
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy)) setDirection({ x: dx > 0 ? 1 : -1, y: 0 });
      else setDirection({ x: 0, y: dy > 0 ? 1 : -1 });
    }
    canvas.addEventListener('touchstart', start);
    canvas.addEventListener('touchmove', move);
    return () => {
      canvas.removeEventListener('touchstart', start);
      canvas.removeEventListener('touchmove', move);
    };
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span>Score: {score}</span>
        <span>Meilleur: {best}</span>
        <label className="ms-auto flex items-center gap-2">
          <input type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} /> Wrap
        </label>
        <button onClick={restart} className="btn">Nouvelle partie</button>
      </div>
      <canvas ref={canvasRef} width={size * grid} height={size * grid} className="w-full max-w-sm rounded-xl border border-neutral-200 dark:border-neutral-700" />
    </div>
  );
}

