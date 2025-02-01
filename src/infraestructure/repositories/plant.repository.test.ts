import { describe, expect, it, vi } from 'vitest';
import { http } from '../http/http';
import { PlantDTO } from '../http/dto/PlantDTO';
import { plantRepository } from './plant.repository';
import apiRoutes from '../../constants/apiRoutes';

const mockPlantDTO: PlantDTO = {
  id: '1',
  name: 'Rose',
  binomial_name: 'Rosa',
  image_url: 'https://example.com/rose.jpg',
  price: 15,
  height_cm: 30,
  week_waterings: 2,
  fertilizer_type: 'organic',
  status: 'default',
};

const mockPlantsListDTO: PlantDTO[] = [mockPlantDTO];

describe('PlantRepository', () => {
  describe('getList', () => {
    it('should call to http and map the product list correctly', async () => {
      vi.spyOn(http, 'get').mockResolvedValue(mockPlantsListDTO);

      const plants = await plantRepository.getList();

      expect(http.get).toHaveBeenCalledWith(apiRoutes.plants.list);
      expect(plants).toEqual([
        {
          id: '1',
          name: 'Rose',
          binomialName: 'Rosa',
          imgUrl: 'https://example.com/rose.jpg',
          price: 15,
          heightInCm: 30,
          wateringsPerWeek: 2,
          fertilizerType: 'organic',
          status: 'default',
        },
      ]);
    });

    it('should log an error if the call http fails', async () => {
      vi.spyOn(console, 'log').mockImplementation(() => {});
      vi.spyOn(http, 'get').mockRejectedValue('error');

      await plantRepository.getList();

      expect(console.log).toHaveBeenCalled();
    });
  });

  describe('getDetail', () => {
    it('should fetch and map the product detail correctly', async () => {
      vi.spyOn(http, 'get').mockResolvedValue(mockPlantDTO);

      const plant = await plantRepository.getDetail('1');

      expect(http.get).toHaveBeenCalledWith(apiRoutes.plants.details('1'));
      expect(plant).toEqual({
        id: '1',
        name: 'Rose',
        binomialName: 'Rosa',
        imgUrl: 'https://example.com/rose.jpg',
        price: 15,
        heightInCm: 30,
        wateringsPerWeek: 2,
        fertilizerType: 'organic',
        status: 'default',
      });
    });

    it('should log an error if the fetch fails', async () => {
      vi.spyOn(console, 'log').mockImplementation(() => {});
      vi.spyOn(http, 'get').mockRejectedValue('error');

      await plantRepository.getDetail('1');

      expect(console.log).toHaveBeenCalled();
    });
  });
});
