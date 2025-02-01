import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useGetPlantDetails } from './useGetPlantDetail';
import { plantService } from '../services/plant.service';
import { Plant } from '../domain/Plant';

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

describe('useGetPlantDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set isLoading to true when the plant detail is being fetched', async () => {
    vi.spyOn(plantService, 'getDetail').mockResolvedValueOnce(mockPlant);

    const { result } = renderHook(() => useGetPlantDetails('1'));

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should set plantDetail when the plant is fetched successfully', async () => {
    vi.spyOn(plantService, 'getDetail').mockResolvedValueOnce(mockPlant);

    const { result } = renderHook(() => useGetPlantDetails('1'));

    expect(plantService.getDetail).toHaveBeenCalled();

    await waitFor(() => {
      expect(result.current.plantDetail).toEqual(mockPlant);
    });
  });

  it('should handle error and not update plantDetail', async () => {
    vi.spyOn(plantService, 'getDetail').mockRejectedValueOnce(mockPlant);

    const { result } = renderHook(() => useGetPlantDetails('1'));

    expect(plantService.getDetail).toHaveBeenCalled();

    await waitFor(() => {
      expect(result.current.plantDetail).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should not call getPlantDetail if productId is undefined', () => {
    vi.spyOn(plantService, 'getDetail').mockResolvedValueOnce(mockPlant);

    const { result } = renderHook(() => useGetPlantDetails(undefined));

    expect(result.current.plantDetail).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(plantService.getDetail).not.toHaveBeenCalled();
  });
});
