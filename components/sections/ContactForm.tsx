"use client";
import { z } from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(2, 'Nom trop court'),
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Message trop court'),
  website: z.string().optional() // honeypot
});

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    const values = Object.fromEntries(formData) as Record<string, string>;
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const msg = parsed.error.issues.map((i) => i.message).join(' • ');
      toast.error(msg);
      return;
    }
    if (values.website) return; // honeypot
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data)
      });
      if (!res.ok) throw new Error('Failed');
      toast.success('Message envoyé avec succès !');
      (document.getElementById('contact-form') as HTMLFormElement)?.reset();
    } catch {
      toast.error("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="contact-form" action={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm">Nom</label>
        <input name="name" required className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900" />
      </div>
      <div>
        <label className="block text-sm">Email</label>
        <input name="email" type="email" required className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900" />
      </div>
      <div>
        <label className="block text-sm">Message</label>
        <textarea name="message" required rows={5} className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900" />
      </div>
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <button disabled={loading} className="btn-primary">{loading ? 'Envoi…' : 'Envoyer'}</button>
    </form>
  );
}

