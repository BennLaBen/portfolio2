import TicTacToe from '@/components/games/TicTacToe';
import { render } from '@testing-library/react';

// Smoke test (l'IA minimax est intégrée; on vérifie juste le montage)
describe('TicTacToe AI', () => {
  it('monte le composant sans erreur', () => {
    render(<TicTacToe />);
  });
});

