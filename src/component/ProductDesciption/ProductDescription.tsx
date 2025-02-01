import React from 'react';
import { Plant } from '../../domain/Plant';
import Badge from '../Badge/Badge';

interface Props {
  product: Plant;
}

const ProductDescription: React.FC<Props> = ({ product }) => {
  return (
    <div>
      <Badge state={product.status} />
      <div className='flex justify-between'>
        <p className='text-2xl font-bold mt-2'>{product.name}</p>
        <p className='text-2xl font-bold'>{product.price}€</p>
      </div>
      <p className='text-base text-gray-700'>{product.binomialName}</p>
      <div className='border rounded-2xl p-4 mt-4'>
        <p className='text-lg'>Plant Characteristics</p>
        <p className='text-base mt-4'>
          Waterings per week ·{' '}
          <span className='font-bold'>{product.wateringsPerWeek}</span>
        </p>
        <p className='text-base'>
          Fertilizer type ·{' '}
          <span className='font-bold capitalize'>{product.fertilizerType}</span>
        </p>
        <p className='text-base'>
          Heigh · <span className='font-bold'>{product.heightInCm}cm </span>
        </p>
      </div>
    </div>
  );
};

export default ProductDescription;
