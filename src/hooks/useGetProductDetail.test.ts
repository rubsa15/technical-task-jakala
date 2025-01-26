import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useGetProductDetails } from './useGetProductDetail';
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

describe('useGetProductDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set isLoading to true when the product detail is being fetched', async () => {
    vi.spyOn(ProductService, 'getDetail').mockResolvedValueOnce(mockProduct);

    const { result } = renderHook(() => useGetProductDetails('1'));

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should set productDetail when the product is fetched successfully', async () => {
    vi.spyOn(ProductService, 'getDetail').mockResolvedValueOnce(mockProduct);

    const { result } = renderHook(() => useGetProductDetails('1'));

    expect(ProductService.getDetail).toHaveBeenCalled();

    await waitFor(() => {
      expect(result.current.productDetail).toEqual(mockProduct);
    });
  });

  it('should handle error and not update productDetail', async () => {
    vi.spyOn(ProductService, 'getDetail').mockRejectedValueOnce(mockProduct);

    const { result } = renderHook(() => useGetProductDetails('1'));

    expect(ProductService.getDetail).toHaveBeenCalled();

    await waitFor(() => {
      expect(result.current.productDetail).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should not call getProductDetail if productId is undefined', () => {
    vi.spyOn(ProductService, 'getDetail').mockResolvedValueOnce(mockProduct);

    const { result } = renderHook(() => useGetProductDetails(undefined));

    expect(result.current.productDetail).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(ProductService.getDetail).not.toHaveBeenCalled();
  });
});
