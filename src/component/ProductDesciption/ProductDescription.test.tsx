import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductDescription from './ProductDescription';
import { Product } from '../../domain/Plant';
import '@testing-library/jest-dom';

describe('ProductDescription component', () => {
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

  it('renders the product name, price and binomial name', () => {
    render(<ProductDescription product={mockProduct} />);

    expect(screen.getByText('Test Plant')).toBeInTheDocument();
    expect(screen.getByText('29.99€')).toBeInTheDocument();
    expect(screen.getByText('Plantae testus')).toBeInTheDocument();
  });

  it('renders the plant characteristics', () => {
    render(<ProductDescription product={mockProduct} />);

    expect(screen.getByText('Plant Characteristics')).toBeInTheDocument();
    expect(screen.getByText(/Waterings per week/i)).toHaveTextContent(
      mockProduct.wateringsPerWeek.toString()
    );
    expect(screen.getByText(/Fertilizer type/i)).toHaveTextContent(
      mockProduct.fertilizerType
    );
    expect(screen.getByText(/Heigh/i)).toHaveTextContent(
      `${mockProduct.heightInCm}cm`
    );
  });
});
