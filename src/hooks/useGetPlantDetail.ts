import { useEffect, useState } from 'react';
import { plantService } from '../services/plant.service';
import { Plant } from '../domain/Plant';

export const useGetPlantDetails = (productId: string | undefined) => {
  const [plantDetail, setPlantDetail] = useState<Plant | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (productId) {
      getPlantDetail(productId);
    }
  }, [productId]);

  const getPlantDetail = async (id: string) => {
    try {
      setIsLoading(true);
      const plant = await plantService.getDetail(id);
      setPlantDetail(plant);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return { plantDetail, isLoading };
};
