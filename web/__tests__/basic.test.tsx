import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/index';

// Next.js's Link component relies on router context which isn't
// available in Jest by default. Mock it with a simple anchor element
// so that render() doesn't throw errors about missing context.
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

describe('Home page', () => {
  it('renders links', () => {
    render(<Home />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
