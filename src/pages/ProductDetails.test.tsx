import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductDetails from './ProductDetails';
import * as ProductHook from '../hooks/useProduct';
import { BrowserRouter } from 'react-router';
import '@testing-library/jest-dom';

const mockProduct = {
  id: '1',
  name: 'Test Plant',
  binomialName: 'Plantae testus',
  imgUrl: 'https://via.placeholder.com/350',
  price: 29.99,
  wateringsPerWeek: 3,
  fertilizerType: 'organic',
  heightInCm: 150,
};

describe('ProductDetails component', () => {
  it('renders loading state', () => {
    vi.spyOn(ProductHook, 'useProduct').mockReturnValue({
      productSelected: undefined,
      isLoading: true,
    });

    render(
      <BrowserRouter>
        <ProductDetails />
      </BrowserRouter>
    );

    expect(screen.getByText('Cargando')).toBeInTheDocument();
  });

  it('renders product details when product is selected', async () => {
    vi.spyOn(ProductHook, 'useProduct').mockReturnValue({
      productSelected: mockProduct,
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <ProductDetails />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Plant')).toBeInTheDocument();
    expect(screen.getByText('29.99€')).toBeInTheDocument();
  });

  it('renders no product details when no product is selected', () => {
    vi.spyOn(ProductHook, 'useProduct').mockReturnValue({
      productSelected: undefined,
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <ProductDetails />
      </BrowserRouter>
    );

    expect(
      screen.getByText('No hay detalles del producto')
    ).toBeInTheDocument();
  });

  it('renders the back link', () => {
    vi.spyOn(ProductHook, 'useProduct').mockReturnValue({
      productSelected: mockProduct,
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <ProductDetails />
      </BrowserRouter>
    );

    const link = screen.getByText('< Back');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
