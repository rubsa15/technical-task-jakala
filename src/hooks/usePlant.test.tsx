import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { PlantProvider } from '../context/plant.context';
import { usePlant } from './usePlant';

describe('plant hook', () => {
  it('should throw error when context is undefined', () => {
    expect(() => {
      renderHook(() => usePlant());
    }).toThrow('usePlantContext must be used within a PlantProvider');
  });

  it('should return context when used within PlantProvider', () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <PlantProvider>{children}</PlantProvider>
    );

    const { result } = renderHook(() => usePlant(), { wrapper });

    expect(result.current.plantSelected).toEqual(undefined);
    expect(result.current.isLoading).toEqual(false);
  });
});
