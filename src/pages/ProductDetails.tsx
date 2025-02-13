import React from 'react';
import { Link } from 'react-router';
import ProductDescription from '../component/ProductDesciption/ProductDescription';
import { usePlant } from '../hooks/usePlant';

const ProductDetails: React.FC = () => {
  const { plantSelected, isLoading } = usePlant();
  if (isLoading) {
    return <p>Cargando</p>;
  }
  return (
    <div data-testid='product-details'>
      <div className='flex justify-end'>
        <Link to={'/'} className='underline'>
          {'< Back'}
        </Link>
      </div>

      {plantSelected ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8'>
          <div className='w-full h-[350px]'>
            <img
              src={plantSelected.imgUrl}
              className='w-full h-full object-cover rounded-2xl'
            />
          </div>
          <div>
            <ProductDescription product={plantSelected} />
          </div>
        </div>
      ) : (
        <p>No hay detalles del producto</p>
      )}
    </div>
  );
};

export default ProductDetails;
