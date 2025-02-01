import apiRoutes from '../../constants/apiRoutes';
import { Plant } from '../../domain/Plant';
import { PlantDTO } from '../http/dto/PlantDTO';
import { http } from '../http/http';

const mapProduct = (product: PlantDTO): Plant => {
  return {
    id: product.id,
    name: product.name,
    binomialName: product.binomial_name,
    imgUrl: product.image_url,
    price: product.price,
    heightInCm: product.height_cm,
    wateringsPerWeek: product.week_waterings,
    fertilizerType: product.fertilizer_type,
    status: product.status,
  };
};

const mapProductsList = (productsList: PlantDTO[]): Plant[] => {
  return productsList.map((product) => mapProduct(product));
};

const getList = async () => {
  try {
    const productsList = await http.get<PlantDTO[]>(apiRoutes.plants.list);
    return mapProductsList(productsList);
  } catch (error) {
    console.log(error);
  }
};

const getDetail = async (productId: string) => {
  try {
    const productDetail = await http.get<PlantDTO>(
      apiRoutes.plants.details(productId)
    );
    return mapProduct(productDetail);
  } catch (error) {
    console.log(error);
  }
};

export const plantRepository = {
  getList,
  getDetail,
};
