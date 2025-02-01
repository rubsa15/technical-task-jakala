const API_BASE_URL = 'https://dulces-petalos.jakala.es';

const apiRoutes = {
  plants: {
    list: `${API_BASE_URL}/api/v2/product`,
    details: (id: string) => `${API_BASE_URL}/api/v2/product/${id}`,
  },
};

export default apiRoutes;
