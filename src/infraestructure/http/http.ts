const get = async <T>(url: string) => {
  const response = await fetch(url, {
    method: 'GET',
  });
  return (await response.json()) as T;
};

export const http = {
  get,
};
