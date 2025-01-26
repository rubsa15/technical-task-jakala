import { useEffect, useState } from 'react';
import { ProductService } from '../services/product.service';
import { Product } from '../domain/Product';

export const useGetProductDetails = (productId: string | undefined) => {
  const [productDetail, setProductDetail] = useState<Product | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (productId) {
      getProductDetail(productId);
    }
  }, [productId]);

  const getProductDetail = async (id: string) => {
    try {
      setIsLoading(true);
      const product = await ProductService.getDetail(id);
      setProductDetail(product);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return { productDetail, isLoading };
};
