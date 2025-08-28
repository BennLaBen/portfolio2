import dynamic from 'next/dynamic';

const PasswordStrength = dynamic(() => import('@/components/lab/PasswordStrength'), { ssr: false });

export default function PasswordStrengthPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Force du mot de passe</h1>
      <div className="card p-4"><PasswordStrength /></div>
    </main>
  );
}


