import { ReactNode, createContext } from 'react';
import { useGetProductDetails } from '../hooks/useGetProductDetail';
import { useParams } from 'react-router';
import { Product } from '../domain/Product';

interface FloorsContextType {
  isLoading: boolean;
  productSelected: Product | undefined;
}

const ProductContext = createContext<FloorsContextType | undefined>(undefined);

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { productId } = useParams();
  const { productDetail, isLoading } = useGetProductDetails(productId);

  return (
    <ProductContext.Provider
      value={{
        isLoading,
        productSelected: productDetail,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
