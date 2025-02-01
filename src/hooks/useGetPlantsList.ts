import { useEffect, useState } from 'react';
import { plantService } from '../services/plant.service';
import { Plant } from '../domain/Plant';

export const useGetPlantsList = () => {
  const [plantsList, setPlantsList] = useState<Plant[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPlantsList();
  }, []);

  const getPlantsList = async () => {
    try {
      setIsLoading(true);
      const plants = await plantService.getList();
      setPlantsList(plants);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return { plantsList, isLoading };
};
