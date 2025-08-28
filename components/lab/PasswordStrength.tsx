"use client";
import { useMemo, useState } from 'react';

function scorePassword(pw: string) {
  let score = 0;
  if (!pw) return 0;
  const letters: Record<string, number> = {};
  for (const char of pw) letters[char] = (letters[char] || 0) + 1, score += 5.0 / letters[char];
  const variations = {
    digits: /\d/.test(pw),
    lower: /[a-z]/.test(pw),
    upper: /[A-Z]/.test(pw),
    symbols: /[^a-zA-Z0-9]/.test(pw),
    length12: pw.length >= 12
  } as const;
  const variationCount = ['digits', 'lower', 'upper', 'symbols'].reduce((n, k) => (variations as any)[k] ? n + 1 : n, 0);
  score += (variationCount - 1) * 10;
  score += Math.min(30, Math.max(0, (pw.length - 8) * 2));
  return Math.min(100, Math.floor(score));
}

export default function PasswordStrength() {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const score = useMemo(() => scorePassword(pw), [pw]);
  const label = score > 80 ? 'Fort' : score > 50 ? 'Moyen' : 'Faible';
  const color = score > 80 ? 'bg-green-500' : score > 50 ? 'bg-amber-500' : 'bg-red-500';
  const criteria = [
    { ok: pw.length >= 12, text: '12+ caractères' },
    { ok: /[a-z]/.test(pw) && /[A-Z]/.test(pw), text: 'Minuscules et majuscules' },
    { ok: /\d/.test(pw), text: 'Chiffres' },
    { ok: /[^a-zA-Z0-9]/.test(pw), text: 'Caractères spéciaux' }
  ];

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Mot de passe" type={show ? 'text' : 'password'} className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900" />
        <button onClick={() => setShow((s) => !s)} className="btn" aria-label="Afficher/masquer">{show ? 'Masquer' : 'Afficher'}</button>
      </div>
      <div className="h-3 w-full rounded-full bg-neutral-200 dark:bg-neutral-800">
        <div className={`h-3 rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <div className="text-sm flex items-center gap-3">
        <span>Score: {score}/100</span>
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs dark:bg-neutral-800">{label}</span>
      </div>
      <ul className="text-sm grid grid-cols-2 gap-2">
        {criteria.map((c) => (
          <li key={c.text} className={c.ok ? 'text-green-600 dark:text-green-400' : 'text-neutral-500'}>
            {c.ok ? '✓' : '•'} {c.text}
          </li>
        ))}
      </ul>
      <p className="text-xs text-neutral-500">Astuce: une passphrase (4-5 mots aléatoires) est souvent plus sûre et mémorisable.</p>
    </div>
  );
}

