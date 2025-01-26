import React from 'react';
import { Link } from 'react-router';
import ProductDescription from '../component/ProductDesciption/ProductDescription';
import { useProduct } from '../hooks/useProduct';

const ProductDetails: React.FC = () => {
  const { productSelected, isLoading } = useProduct();
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

      {productSelected ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8'>
          <div className='w-full h-[350px]'>
            <img
              src={productSelected.imgUrl}
              className='w-full h-full object-cover rounded-2xl'
            />
          </div>
          <div>
            <ProductDescription product={productSelected} />
          </div>
        </div>
      ) : (
        <p>No hay detalles del producto</p>
      )}
    </div>
  );
};

export default ProductDetails;
