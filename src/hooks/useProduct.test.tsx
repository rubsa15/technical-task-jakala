import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { ProductProvider } from '../context/product.context';
import { useProduct } from './useProduct';

describe('product hook', () => {
  it('should throw error when context is undefined', () => {
    expect(() => {
      renderHook(() => useProduct());
    }).toThrow('useProductContext must be used within a ProductProvider');
  });

  it('should return context when used within FloorsProvider', () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <ProductProvider>{children}</ProductProvider>
    );

    const { result } = renderHook(() => useProduct(), { wrapper });

    expect(result.current.productSelected).toEqual(undefined);
    expect(result.current.isLoading).toEqual(false);
  });
});
