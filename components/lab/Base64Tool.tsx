"use client";
import { useState } from 'react';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  function encode() {
    try { setOutput(btoa(unescape(encodeURIComponent(input)))); } catch { setOutput('Erreur d\'encodage'); }
  }
  function decode() {
    try { setOutput(decodeURIComponent(escape(atob(input)))); } catch { setOutput('Chaîne Base64 invalide'); }
  }

  return (
    <div className="space-y-3">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={3} className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900" placeholder="Texte ou Base64" />
      <div className="flex gap-2">
        <button className="btn" onClick={encode}>Encoder → Base64</button>
        <button className="btn" onClick={decode}>Décoder ← Base64</button>
        <button className="btn" onClick={() => navigator.clipboard.writeText(output)}>Copier</button>
      </div>
      <div className="rounded-xl bg-neutral-100 p-3 text-sm break-all dark:bg-neutral-800">{output}</div>
    </div>
  );
}


