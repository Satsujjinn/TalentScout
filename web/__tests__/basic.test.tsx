import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/index';

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

describe('Home page', () => {
  it('renders header and links', () => {
    render(<Home />);
    expect(screen.getByText('TalentScout')).toBeInTheDocument();
    expect(screen.getAllByText('Login').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Sign Up').length).toBeGreaterThan(0);
  });
});
