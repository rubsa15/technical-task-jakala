import { render, screen } from '@testing-library/react';
import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider,
} from 'react-router';
import App from './App';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import * as getProductsListHook from './hooks/useGetProductsList';
import * as ProductHook from './hooks/useProduct';

const mockProductList = [
  {
    id: '1',
    name: 'Test Plant1',
    binomialName: 'Plantae testus1',
    imgUrl: 'https://via.placeholder.com/350',
    price: 29.99,
    wateringsPerWeek: 3,
    fertilizerType: 'organic',
    heightInCm: 150,
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
  },
];

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

describe('App Router', () => {
  it('renders home page by default', () => {
    vi.spyOn(getProductsListHook, 'useGetProductsList').mockReturnValueOnce({
      productsList: mockProductList,
      isLoading: false,
    });
    vi.spyOn(ProductHook, 'useProduct').mockReturnValue({
      productSelected: mockProduct,
      isLoading: false,
    });
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders product details page with valid product ID', () => {
    const router = createMemoryRouter([{ path: '*', element: <App /> }], {
      initialEntries: ['/product/123'],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('product-details')).toBeInTheDocument();
  });
});
