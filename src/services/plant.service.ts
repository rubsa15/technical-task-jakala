import { plantRepository } from '../infraestructure/repositories/plant.repository';

const getList = () => {
  return plantRepository.getList();
};

const getDetail = (productId: string) => {
  return plantRepository.getDetail(productId);
};

export const plantService = {
  getList,
  getDetail,
};
