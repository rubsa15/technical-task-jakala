import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductDetails from './ProductDetails';
import * as PlantHook from '../hooks/usePlant';
import { BrowserRouter } from 'react-router';
import '@testing-library/jest-dom';
import { Plant } from '../domain/Plant';

const mockPlant: Plant = {
  id: '1',
  name: 'Test Plant',
  binomialName: 'Plantae testus',
  imgUrl: 'https://via.placeholder.com/350',
  price: 29.99,
  wateringsPerWeek: 3,
  fertilizerType: 'organic',
  heightInCm: 150,
  status: 'default',
};

describe('ProductDetails component', () => {
  it('renders loading state', () => {
    vi.spyOn(PlantHook, 'usePlant').mockReturnValue({
      plantSelected: undefined,
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
    vi.spyOn(PlantHook, 'usePlant').mockReturnValue({
      plantSelected: mockPlant,
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
    vi.spyOn(PlantHook, 'usePlant').mockReturnValue({
      plantSelected: undefined,
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
    vi.spyOn(PlantHook, 'usePlant').mockReturnValue({
      plantSelected: mockPlant,
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
