import React from 'react';
import { Product } from '../../domain/Product';
import { Link } from 'react-router';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className='flex flex-col'>
      <Link to={`/product/${product.id}`}>
        <div className='w-full h-[350px]'>
          <img
            src={product.imgUrl}
            className='w-full h-full object-cover rounded-2xl'
          />
        </div>

        <p className='text-lg font-bold mt-2'>{product.name}</p>
        <p className='text-base text-gray-700'>{product.binomialName}</p>
        <p className='text-lg font-bold'>{product.price}€</p>
      </Link>
    </div>
  );
};

export default ProductCard;
