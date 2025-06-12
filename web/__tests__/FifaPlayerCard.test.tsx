import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

import FifaPlayerCard, { Athlete } from '../../shared/src/components/FifaPlayerCard';

const athlete: Athlete = { _id: '1', name: 'Test Player' };

describe.skip('FifaPlayerCard', () => {
  it('shows Match button by default', () => {
    render(<FifaPlayerCard athlete={athlete} onMatch={() => {}} />);
    expect(screen.getByRole('button', { name: /match/i })).toBeInTheDocument();
  });

  it('hides Match button when showMatchButton is false', () => {
    render(
      <FifaPlayerCard
        athlete={athlete}
        onMatch={() => {}}
        showMatchButton={false}
      />
    );
    expect(screen.queryByRole('button', { name: /match/i })).toBeNull();
  });
});
