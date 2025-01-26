import { useEffect, useState } from 'react';
import { ProductService } from '../services/product.service';
import { Product } from '../domain/Product';

export const useGetProductsList = () => {
  const [productsList, setProductsList] = useState<Product[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getProductsList();
  }, []);

  const getProductsList = async () => {
    try {
      setIsLoading(true);
      const products = await ProductService.getList();
      setProductsList(products);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return { productsList, isLoading };
};
