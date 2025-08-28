import { ContactForm } from '@/components/sections/ContactForm';

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Contact</h1>
      <div className="card p-6">
        <ContactForm />
      </div>
    </main>
  );
}

