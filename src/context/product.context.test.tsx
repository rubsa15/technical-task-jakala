import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductContext, ProductProvider } from '../context/product.context';
import * as getProductDetailsHook from '../hooks/useGetProductDetail';
import { useContext } from 'react';
import { useParams } from 'react-router';
import '@testing-library/jest-dom';

vi.mock('react-router', () => ({
  ...vi.importActual('react-router'),
  useParams: vi.fn(),
}));

const TestComponent: React.FC = () => {
  const context = useContext(ProductContext);

  if (context?.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{context?.productSelected?.name}</p>
      <p>{context?.productSelected ? 'Loaded' : 'No product'}</p>
    </div>
  );
};

describe('ProductProvider Context', () => {
  it('should provide product data after loading', async () => {
    const mockProduct = {
      id: '1',
      name: 'Test Product',
      price: 100,
      binomialName: 'Test Binomial Name',
      imgUrl: 'https://example.com/product.jpg',
      heightInCm: 50,
      wateringsPerWeek: 2,
      fertilizerType: 'Organic',
    };
    vi.spyOn(getProductDetailsHook, 'useGetProductDetails').mockReturnValue({
      isLoading: false,
      productDetail: mockProduct,
    });
    (useParams as vi.Mock).mockReturnValue({ id: '123' });

    render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>
    );

    await waitFor(() => screen.getByText('Test Product'));

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });

  it('should show loading state initially', async () => {
    vi.spyOn(getProductDetailsHook, 'useGetProductDetails').mockReturnValue({
      isLoading: true,
      productDetail: undefined,
    });

    render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>
    );

    // Verificamos que el estado de carga se muestra
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
