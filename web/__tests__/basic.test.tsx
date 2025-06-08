import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Home page', () => {
  it('renders links', () => {
    render(<Home />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
