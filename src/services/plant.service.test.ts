import { describe, expect, it, vi } from 'vitest';
import { plantService } from './plant.service';
import { plantRepository } from '../infraestructure/repositories/plant.repository';
import { Plant } from '../domain/Plant';

const mockProduct: Plant = {
  id: '1',
  name: 'Test Plant',
  binomialName: 'Plantae testus',
  imgUrl: 'https://via.placeholder.com/350',
  price: 29.99,
  wateringsPerWeek: 3,
  fertilizerType: 'organic',
  heightInCm: 150,
  status: 'default',
};

const mockProductList: Plant[] = [mockProduct];

describe('ProductService', () => {
  describe('getList', () => {
    it('should call to plant repository', async () => {
      vi.spyOn(plantRepository, 'getList').mockResolvedValue(mockProductList);

      const products = await plantService.getList();

      expect(plantRepository.getList).toHaveBeenCalled();
      expect(products).toEqual(mockProductList);
    });
  });

  describe('getDetail', () => {
    it('should fetch and map the product detail correctly', async () => {
      vi.spyOn(plantRepository, 'getDetail').mockResolvedValue(mockProduct);

      const product = await plantService.getDetail('1');

      expect(plantRepository.getDetail).toHaveBeenCalledWith('1');

      expect(product).toEqual(mockProduct);
    });
  });
});
