import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PlantContext, PlantProvider } from './plant.context';
import * as getPlantDetailsHook from '../hooks/useGetPlantDetail';
import { useContext } from 'react';
import { useParams } from 'react-router';
import '@testing-library/jest-dom';
import { Plant } from '../domain/Plant';

vi.mock('react-router', () => ({
  ...vi.importActual('react-router'),
  useParams: vi.fn(),
}));

const TestComponent: React.FC = () => {
  const context = useContext(PlantContext);

  if (context?.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{context?.plantSelected?.name}</p>
      <p>{context?.plantSelected ? 'Loaded' : 'No product'}</p>
    </div>
  );
};

describe('ProductProvider Context', () => {
  it('should provide product data after loading', async () => {
    const mockPlant: Plant = {
      id: '1',
      name: 'Test Product',
      price: 100,
      binomialName: 'Test Binomial Name',
      imgUrl: 'https://example.com/product.jpg',
      heightInCm: 50,
      wateringsPerWeek: 2,
      fertilizerType: 'Organic',
      status: 'default',
    };
    vi.spyOn(getPlantDetailsHook, 'useGetPlantDetails').mockReturnValue({
      isLoading: false,
      plantDetail: mockPlant,
    });
    (useParams as vi.Mock).mockReturnValue({ id: '123' });

    render(
      <PlantProvider>
        <TestComponent />
      </PlantProvider>
    );

    await waitFor(() => screen.getByText('Test Product'));

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });

  it('should show loading state initially', async () => {
    vi.spyOn(getPlantDetailsHook, 'useGetPlantDetails').mockReturnValue({
      isLoading: true,
      plantDetail: undefined,
    });

    render(
      <PlantProvider>
        <TestComponent />
      </PlantProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
