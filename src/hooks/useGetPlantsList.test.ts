import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useGetPlantsList } from './useGetPlantsList';
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

describe('useGetPlantList', () => {
  it('should set isLoading to true when plants are being fetched', async () => {
    vi.spyOn(plantService, 'getList').mockResolvedValueOnce([mockPlant]);

    const { result } = renderHook(() => useGetPlantsList());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('should set plantsList when the plants are fetched successfully', async () => {
    vi.spyOn(plantService, 'getList').mockResolvedValueOnce([mockPlant]);

    const { result } = renderHook(() => useGetPlantsList());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(plantService.getList).toHaveBeenCalled();
    expect(result.current.plantsList).toEqual([mockPlant]);
  });

  it('should handle error and not update plantsList', async () => {
    vi.spyOn(plantService, 'getList').mockRejectedValueOnce([mockPlant]);

    const { result } = renderHook(() => useGetPlantsList());

    expect(plantService.getList).toHaveBeenCalled();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.plantsList).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });
});
