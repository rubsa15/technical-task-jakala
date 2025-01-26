import { describe, expect, it, vi } from 'vitest';
import { ProductService } from './product.service';
import apiRoutes from '../constants/apiRoutes';
import { ProductDTO } from '../domain/Product';

const mockProductDTO: ProductDTO = {
  id: '1',
  name: 'Rose',
  binomialName: 'Rosa',
  imgUrl: 'https://example.com/rose.jpg',
  price: 15,
  heightInCm: 30,
  wateringsPerWeek: 2,
  fertilizerType: 'organic',
};

const mockProductsList: ProductDTO[] = [mockProductDTO];

describe('ProductService', () => {
  describe('getList', () => {
    it('should fetch and map the product list correctly', async () => {
      vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mockProductsList),
        } as Response);
      });

      const products = await ProductService.getList();

      expect(window.fetch).toHaveBeenCalledWith(apiRoutes.products.list);
      expect(products).toEqual([
        {
          id: '1',
          name: 'Rose',
          binomialName: 'Rosa',
          imgUrl: 'https://example.com/rose.jpg',
          price: 15,
          heightInCm: 30,
          wateringsPerWeek: 2,
          fertilizerType: 'organic',
        },
      ]);
    });

    it('should log an error if the fetch fails', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
        return Promise.reject({
          json: () => Promise.reject('error'),
        } as Response);
      });

      await ProductService.getList();

      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe('getDetail', () => {
    it('should fetch and map the product detail correctly', async () => {
      vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve({
          json: () => Promise.resolve(mockProductDTO),
        } as Response);
      });

      const product = await ProductService.getDetail('1');

      expect(window.fetch).toHaveBeenCalledWith(
        apiRoutes.products.details('1')
      );
      expect(product).toEqual({
        id: '1',
        name: 'Rose',
        binomialName: 'Rosa',
        imgUrl: 'https://example.com/rose.jpg',
        price: 15,
        heightInCm: 30,
        wateringsPerWeek: 2,
        fertilizerType: 'organic',
      });
    });

    it('should log an error if the fetch fails', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
        return Promise.reject({
          json: () => Promise.reject('error'),
        } as Response);
      });

      await ProductService.getDetail('1');

      expect(consoleSpy).toHaveBeenCalled();
    });
  });
});
