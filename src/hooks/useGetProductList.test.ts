import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useGetProductsList } from './useGetProductsList';
import { ProductService } from '../services/product.service';

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

describe('useGetProductsList', () => {
  it('should set isLoading to true when products are being fetched', async () => {
    vi.spyOn(ProductService, 'getList').mockResolvedValueOnce([mockProduct]);

    const { result } = renderHook(() => useGetProductsList());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('should set productsList when the products are fetched successfully', async () => {
    vi.spyOn(ProductService, 'getList').mockResolvedValueOnce([mockProduct]);

    const { result } = renderHook(() => useGetProductsList());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(ProductService.getList).toHaveBeenCalled();
    expect(result.current.productsList).toEqual([mockProduct]);
  });

  it('should handle error and not update productsList', async () => {
    vi.spyOn(ProductService, 'getList').mockRejectedValueOnce([mockProduct]);

    const { result } = renderHook(() => useGetProductsList());

    expect(ProductService.getList).toHaveBeenCalled();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.productsList).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });
});
