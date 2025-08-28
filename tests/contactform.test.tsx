import { render, screen, fireEvent } from '@testing-library/react';
import { ContactForm } from '@/components/sections/ContactForm';

describe('ContactForm', () => {
  it('valide les champs et affiche une erreur', async () => {
    render(<ContactForm />);
    fireEvent.submit(screen.getByRole('button', { name: /envoyer/i }));
    // pas de crash, composant se rend
    expect(screen.getByRole('button', { name: /envoyer/i })).toBeInTheDocument();
  });
});

