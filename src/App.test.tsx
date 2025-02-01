import { render, screen } from '@testing-library/react';
import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider,
} from 'react-router';
import App from './App';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import * as getPlantsListHook from './hooks/useGetPlantsList';
import * as PlantHook from './hooks/usePlant';
import { Plant } from './domain/Plant';

const mockPlantsList: Plant[] = [
  {
    id: '1',
    name: 'Test Plant1',
    binomialName: 'Plantae testus1',
    imgUrl: 'https://via.placeholder.com/350',
    price: 29.99,
    wateringsPerWeek: 3,
    fertilizerType: 'organic',
    heightInCm: 150,
    status: 'default',
  },
  {
    id: '2',
    name: 'Test Plant2',
    binomialName: 'Plantae testus2',
    imgUrl: 'https://via.placeholder.com/350',
    price: 29.99,
    wateringsPerWeek: 3,
    fertilizerType: 'organic',
    heightInCm: 150,
    status: 'default',
  },
];

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

describe('App Router', () => {
  it('renders home page by default', () => {
    vi.spyOn(getPlantsListHook, 'useGetPlantsList').mockReturnValueOnce({
      plantsList: mockPlantsList,
      isLoading: false,
    });
    vi.spyOn(PlantHook, 'usePlant').mockReturnValue({
      plantSelected: mockPlant,
      isLoading: false,
    });
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders plant details page with valid product ID', () => {
    const router = createMemoryRouter([{ path: '*', element: <App /> }], {
      initialEntries: ['/product/123'],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('product-details')).toBeInTheDocument();
  });
});
