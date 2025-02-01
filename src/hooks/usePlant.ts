import { useContext } from 'react';
import { PlantContext } from '../context/plant.context';

export const usePlant = () => {
  const context = useContext(PlantContext);
  if (context === undefined) {
    throw new Error('usePlantContext must be used within a PlantProvider');
  }
  return context;
};
