import { describe, it, expect, vi } from 'vitest';
import { http } from './http';

const apiMock = 'https://api.example.com/data';

describe('http.get', () => {
  it('should make a GET request and return JSON data', async () => {
    const mockData = { message: 'success' };
    vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockData),
      } as Response);
    });

    const result = await http.get(apiMock);

    expect(window.fetch).toHaveBeenCalledWith(apiMock, { method: 'GET' });
    expect(result).toEqual(mockData);
  });
});
