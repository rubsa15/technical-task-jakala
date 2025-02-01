import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router';
import Home from './Home';
import { useGetPlantsList } from '../hooks/useGetPlantsList';
import '@testing-library/jest-dom';
import { Plant } from '../domain/Plant';

vi.mock('../hooks/useGetPlantsList');

const mockPlants: Plant[] = [
  {
    id: '1',
    name: 'Snake Plant',
    binomialName: 'Dracaena trifasciata',
    price: 29.99,
    imgUrl: 'snake-plant.jpg',
    wateringsPerWeek: 3,
    fertilizerType: 'organic',
    heightInCm: 150,
    status: 'default',
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
    status: 'default',
  },
];

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Home', () => {
  it('should show loading state', () => {
    vi.mocked(useGetPlantsList).mockReturnValue({
      plantsList: [],
      isLoading: true,
    });

    renderWithRouter(<Home />);
    expect(screen.getByText('Cargando')).toBeInTheDocument();
  });

  it('should render plants list', () => {
    vi.mocked(useGetPlantsList).mockReturnValue({
      plantsList: mockPlants,
      isLoading: false,
    });

    renderWithRouter(<Home />);

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search plant')).toBeInTheDocument();
    expect(screen.getByText('Snake Plant')).toBeInTheDocument();
    expect(screen.getByText('Monstera')).toBeInTheDocument();
  });

  it('should filter plants by name', () => {
    vi.mocked(useGetPlantsList).mockReturnValue({
      plantsList: mockPlants,
      isLoading: false,
    });

    renderWithRouter(<Home />);

    const searchInput = screen.getByPlaceholderText('Search plant');
    fireEvent.change(searchInput, { target: { value: 'snake' } });

    expect(screen.getByText('Snake Plant')).toBeInTheDocument();
    expect(screen.queryByText('Monstera')).not.toBeInTheDocument();
  });

  it('should filter plants by binomial name', () => {
    vi.mocked(useGetPlantsList).mockReturnValue({
      plantsList: mockPlants,
      isLoading: false,
    });

    renderWithRouter(<Home />);

    const searchInput = screen.getByPlaceholderText('Search plant');
    fireEvent.change(searchInput, { target: { value: 'deliciosa' } });

    expect(screen.queryByText('Snake Plant')).not.toBeInTheDocument();
    expect(screen.getByText('Monstera')).toBeInTheDocument();
  });

  it('should show no plants message when no results found', () => {
    vi.mocked(useGetPlantsList).mockReturnValue({
      plantsList: mockPlants,
      isLoading: false,
    });

    renderWithRouter(<Home />);

    const searchInput = screen.getByPlaceholderText('Search plant');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.getByText('No hay plantas')).toBeInTheDocument();
  });
});
