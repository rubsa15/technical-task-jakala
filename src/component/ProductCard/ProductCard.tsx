import React from 'react';
import { Plant } from '../../domain/Plant';
import { Link } from 'react-router';
import Badge from '../Badge/Badge';

interface Props {
  product: Plant;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <article className='flex flex-col'>
      <Link to={`/product/${product.id}`}>
        <div className='w-full h-[350px] relative'>
          <div className='absolute top-2 right-2'>
            <Badge state={product.status} />
          </div>
          <img
            src={product.imgUrl}
            className='w-full h-full object-cover rounded-2xl'
          />
        </div>

        <p className='text-lg font-bold mt-2'>{product.name}</p>
        <p className='text-base text-gray-700'>{product.binomialName}</p>
        <p className='text-lg font-bold'>{product.price}€</p>
      </Link>
    </article>
  );
};

export default ProductCard;
