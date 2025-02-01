import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AppLayout from './AppLayout';
import { BrowserRouter } from 'react-router';
import '@testing-library/jest-dom';

vi.mock('../Header/Header', () => ({
  default: () => <div>Mocked Header</div>,
}));

describe('AppLayout component', () => {
  it('renders the component', () => {
    render(
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    );

    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
  });
});
