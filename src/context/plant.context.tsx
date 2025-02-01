import { ReactNode, createContext } from 'react';
import { useGetPlantDetails } from '../hooks/useGetPlantDetail';
import { useParams } from 'react-router';
import { Plant } from '../domain/Plant';

interface ProductContextType {
  isLoading: boolean;
  plantSelected: Plant | undefined;
}

const PlantContext = createContext<ProductContextType | undefined>(undefined);

const PlantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { productId } = useParams();
  const { plantDetail, isLoading } = useGetPlantDetails(productId);

  return (
    <PlantContext.Provider
      value={{
        isLoading,
        plantSelected: plantDetail,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};

export { PlantProvider, PlantContext };
