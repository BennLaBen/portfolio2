"use client";
import { useEffect, useRef, useState } from 'react';

export default function HashTool() {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const fileRef = useRef<HTMLInputElement | null>(null);

  async function computeHashFromText(text: string) {
    const enc = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest('SHA-256', enc);
    const arr = Array.from(new Uint8Array(buf));
    return arr.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  useEffect(() => {
    computeHashFromText(input).then(setHash);
  }, [input]);

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const buf = await f.arrayBuffer();
    const digest = await crypto.subtle.digest('SHA-256', buf);
    const arr = Array.from(new Uint8Array(digest));
    setHash(arr.map((b) => b.toString(16).padStart(2, '0')).join(''));
  }

  return (
    <div className="space-y-3">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900" rows={4} placeholder="Texte à hacher" />
      <div className="flex items-center gap-2">
        <input ref={fileRef} type="file" onChange={onPickFile} />
        <button className="btn" onClick={() => navigator.clipboard.writeText(hash)}>Copier</button>
      </div>
      <div className="rounded-xl bg-neutral-100 p-3 text-sm break-all dark:bg-neutral-800">{hash}</div>
    </div>
  );
}

