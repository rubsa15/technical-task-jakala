import React, { useMemo, useState } from 'react';
import { useGetPlantsList } from '../hooks/useGetPlantsList';
import ProductCard from '../component/ProductCard/ProductCard';
import { Input } from '../component/common/Input';

const Home: React.FC = () => {
  const { plantsList, isLoading } = useGetPlantsList();
  const [filter, setFilter] = useState<string>('');

  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const filteredPlants = useMemo(() => {
    if (filter) {
      return plantsList?.filter(
        (plant) =>
          plant.name.toLowerCase().includes(filter.toLowerCase()) ||
          plant.binomialName.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return plantsList;
  }, [filter, plantsList]);

  if (isLoading) {
    return <>Cargando</>;
  }

  return (
    <>
      <div
        className='flex justify-start sm:justify-end'
        data-testid='home-page'
      >
        <Input placeholder='Search plant' onChange={onChangeFilter} />
      </div>
      {filteredPlants && filteredPlants.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
          {filteredPlants.map((plant) => (
            <ProductCard product={plant} key={plant.id} />
          ))}
        </div>
      ) : (
        <p>No hay plantas</p>
      )}
    </>
  );
};

export default Home;
