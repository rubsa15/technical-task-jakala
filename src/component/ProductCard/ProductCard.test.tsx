import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import ProductCard from './ProductCard';
import { Product } from '../../domain/Product';
import '@testing-library/jest-dom';

const mockProduct: Product = {
  id: '1',
  name: 'Test Plant',
  binomialName: 'Plantae testus',
  imgUrl: 'https://via.placeholder.com/350',
  price: 29.99,
  wateringsPerWeek: 3,
  fertilizerType: 'organic',
  heightInCm: 150,
};

describe('ProductCard component', () => {
  it('renders the product name, binomial name, price, and image', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Plant')).toBeInTheDocument();
    expect(screen.getByText('Plantae testus')).toBeInTheDocument();
    expect(screen.getByText('29.99€')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://via.placeholder.com/350'
    );
  });

  it('renders a Link to the correct product page', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/1');
  });
});
