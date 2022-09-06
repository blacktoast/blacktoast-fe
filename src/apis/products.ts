import { apiClient } from './api';

export const getProducts = async ({ page = 1, size = 10 }) => {
  try {
    const data = await apiClient.get(`/products?page=${page}&size=${size}`);
    return data.data;
  } catch (error) {
    console.log('err', error);
    return Promise.reject(error);
  }
};
