import apiRoutes from '../constants/apiRoutes';
import { Product, ProductDTO } from '../domain/Product';

const mapProduct = (product: ProductDTO): Product => {
  return {
    id: product.id,
    name: product.name,
    binomialName: product.binomialName,
    imgUrl: product.imgUrl,
    price: product.price,
    heightInCm: product.heightInCm,
    wateringsPerWeek: product.wateringsPerWeek,
    fertilizerType: product.fertilizerType,
  };
};

const mapProductsList = (productsList: ProductDTO[]): Product[] => {
  return productsList.map((product) => mapProduct(product));
};

const getList = async () => {
  try {
    const response = await fetch(apiRoutes.products.list);
    const productsList = await response.json();
    return mapProductsList(productsList);
  } catch (error) {
    console.log(error);
  }
};

const getDetail = async (productId: string) => {
  try {
    const response = await fetch(apiRoutes.products.details(productId));
    const productDetail = await response.json();
    return mapProduct(productDetail);
  } catch (error) {
    console.log(error);
  }
};

export const ProductService = {
  getList,
  getDetail,
};
