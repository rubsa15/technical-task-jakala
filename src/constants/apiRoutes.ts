const API_BASE_URL = 'https://dulces-petalos.jakala.es';

const apiRoutes = {
  products: {
    list: `${API_BASE_URL}/api/v1/product`,
    details: (id: string) => `${API_BASE_URL}/api/v1/product/${id}`,
  },
};

export default apiRoutes;
