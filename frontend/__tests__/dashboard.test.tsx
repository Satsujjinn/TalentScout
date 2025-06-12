import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecruiterDashboard from '../app/recruiters/dashboard/page';

jest.mock('next/link', () => ({ children, href }: any) => <a href={href}>{children}</a>);

jest.mock('../lib/auth', () => ({
  useAuth: () => ({ user: { id: 'r1', isSubscribed: true } })
}));

jest.mock('../lib/api', () => ({
  default: {
    get: jest.fn(() => Promise.resolve({ data: [
      { _id: '1', name: 'Athlete 1' },
      { _id: '2', name: 'Athlete 2' }
    ] })),
    post: jest.fn()
  }
}));

jest.mock('../lib/socket', () => ({
  getSocket: () => ({ on: jest.fn() })
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  useSearchParams: () => new URLSearchParams()
}));

describe('RecruiterDashboard', () => {
  it('renders AthleteGrid with cards', async () => {
    render(<RecruiterDashboard />);
    const buttons = await screen.findAllByRole('button', { name: 'Match' });
    expect(buttons.length).toBeGreaterThan(1);
  });
});
