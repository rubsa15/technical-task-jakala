import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router';
import Home from './Home';
import { useGetProductsList } from '../hooks/useGetProductsList';
import '@testing-library/jest-dom';

vi.mock('../hooks/useGetProductsList');

const mockProducts = [
  {
    id: '1',
    name: 'Snake Plant',
    binomialName: 'Dracaena trifasciata',
    price: 29.99,
    imgUrl: 'snake-plant.jpg',
    wateringsPerWeek: 3,
    fertilizerType: 'organic',
    heightInCm: 150,
  },
  {
    id: '2',
    name: 'Monstera',
    binomialName: 'Monstera deliciosa',
    price: 39.99,
    imgUrl: 'monstera.jpg',
    wateringsPerWeek: 3,
    fertilizerType: 'organic',
    heightInCm: 150,
  },
];

// Wrapper component to provide router context
const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Home', () => {
  it('should show loading state', () => {
    vi.mocked(useGetProductsList).mockReturnValue({
      productsList: [],
      isLoading: true,
    });

    renderWithRouter(<Home />);
    expect(screen.getByText('Cargando')).toBeInTheDocument();
  });

  it('should render products list', () => {
    vi.mocked(useGetProductsList).mockReturnValue({
      productsList: mockProducts,
      isLoading: false,
    });

    renderWithRouter(<Home />);

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search plant')).toBeInTheDocument();
    expect(screen.getByText('Snake Plant')).toBeInTheDocument();
    expect(screen.getByText('Monstera')).toBeInTheDocument();
  });

  it('should filter products by name', () => {
    vi.mocked(useGetProductsList).mockReturnValue({
      productsList: mockProducts,
      isLoading: false,
    });

    renderWithRouter(<Home />);

    const searchInput = screen.getByPlaceholderText('Search plant');
    fireEvent.change(searchInput, { target: { value: 'snake' } });

    expect(screen.getByText('Snake Plant')).toBeInTheDocument();
    expect(screen.queryByText('Monstera')).not.toBeInTheDocument();
  });

  it('should filter products by binomial name', () => {
    vi.mocked(useGetProductsList).mockReturnValue({
      productsList: mockProducts,
      isLoading: false,
    });

    renderWithRouter(<Home />);

    const searchInput = screen.getByPlaceholderText('Search plant');
    fireEvent.change(searchInput, { target: { value: 'deliciosa' } });

    expect(screen.queryByText('Snake Plant')).not.toBeInTheDocument();
    expect(screen.getByText('Monstera')).toBeInTheDocument();
  });

  it('should show no products message when no results found', () => {
    vi.mocked(useGetProductsList).mockReturnValue({
      productsList: mockProducts,
      isLoading: false,
    });

    renderWithRouter(<Home />);

    const searchInput = screen.getByPlaceholderText('Search plant');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.getByText('No hay productos')).toBeInTheDocument();
  });
});
