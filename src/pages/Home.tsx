import React, { useMemo, useState } from 'react';
import { useGetProductsList } from '../hooks/useGetProductsList';
import ProductCard from '../component/ProductCard/ProductCard';
import { Input } from '../component/common/Input';

const Home: React.FC = () => {
  const { productsList, isLoading } = useGetProductsList();
  const [filter, setFilter] = useState<string>('');

  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  const filteredProducts = useMemo(() => {
    if (filter) {
      return productsList?.filter(
        (product) =>
          product.name.toLowerCase().includes(filter.toLowerCase()) ||
          product.binomialName.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return productsList;
  }, [filter, productsList]);

  if (isLoading) {
    return <>Cargando</>;
  }

  return (
    <>
      <div className='flex justify-end'>
        <Input placeholder='Search plant' onChange={onChangeFilter} />
      </div>
      {filteredProducts && filteredProducts.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <p>No hay productos</p>
      )}
    </>
  );
};

export default Home;
