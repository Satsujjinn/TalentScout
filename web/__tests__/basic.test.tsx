import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';

jest.mock('next/link', () => {
  return ({ href, children }: any) => React.createElement('a', { href }, children);
});

describe('Home page', () => {
  it('renders links', () => {
    render(<Home />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
