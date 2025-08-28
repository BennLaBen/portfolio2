"use client";
import { useMemo, useState } from 'react';

function calculateEntropy(length: number, charsetSize: number) {
  if (length <= 0 || charsetSize <= 1) return 0;
  const bits = Math.log2(charsetSize) * length;
  return Math.round(bits);
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [pw, setPw] = useState('');

  const charset = useMemo(() => {
    let s = '';
    if (useLower) s += 'abcdefghijklmnopqrstuvwxyz';
    if (useUpper) s += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useDigits) s += '0123456789';
    if (useSymbols) s += '!@#$%^&*()-_=+[]{};:,.<>' + "'\"/?|`~";
    return s;
  }, [useLower, useUpper, useDigits, useSymbols]);

  const entropy = useMemo(() => calculateEntropy(length, charset.length), [length, charset]);
  const strength = entropy >= 90 ? 'Fort' : entropy >= 60 ? 'Moyen' : 'Faible';

  function generate() {
    if (!charset || charset.length === 0) { setPw(''); return; }
    const n = Math.max(8, Math.min(64, Number.isFinite(length) ? length : 16));
    try {
      const array = new Uint32Array(n);
      crypto.getRandomValues(array);
      let out = '';
      for (let i = 0; i < n; i++) out += charset[array[i] % charset.length];
      setPw(out);
    } catch {
      setPw('');
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <label className="flex items-center gap-2"><input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} /> minuscules</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} /> majuscules</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={useDigits} onChange={(e) => setUseDigits(e.target.checked)} /> chiffres</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} /> symboles</label>
      </div>
      <div className="flex items-center gap-3">
        <input type="range" min={8} max={64} value={length} onChange={(e) => setLength(parseInt(e.target.value))} />
        <span className="text-sm">Longueur: {length}</span>
      </div>
      <div className="text-sm text-neutral-600 dark:text-neutral-300">Entropie estimée: {entropy} bits — {strength}</div>
      <div className="flex gap-2">
        <input value={pw} onChange={(e) => setPw(e.target.value)} className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900" placeholder="Mot de passe généré" />
        <button className="btn" onClick={generate}>Générer</button>
        <button className="btn" onClick={() => navigator.clipboard.writeText(pw)}>Copier</button>
      </div>
      <p className="text-xs text-neutral-500">Astuce: utilisez un gestionnaire de mots de passe pour stocker en sécurité.</p>
    </div>
  );
}


