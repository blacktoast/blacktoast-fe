import { Product } from '../types/product';
import { apiClient } from './api';

type Products = {
  products: Product[];
  totalCount: number;
};

export const getProducts = async ({ page = 1, size = 10 }) => {
  try {
    const data = await apiClient.get<Products>(`/products?page=${page}&size=${size}`);
    return data.data;
  } catch (error) {
    console.log('err', error);
    return Promise.reject(error);
  }
};
