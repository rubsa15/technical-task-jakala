import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Header from './Header';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('../Breadcrumb/Breadcrumb', () => ({
  default: () => <nav data-testid='breadcrumb'>Mock Breadcrumb</nav>,
}));

describe('Header component', () => {
  it('renders the logo with correct src and alt text', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoElement = screen.getByAltText('Logo');
    expect(logoElement).toBeInTheDocument();
  });

  it('wraps the logo in a Link to the home page', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link', { name: /logo/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
