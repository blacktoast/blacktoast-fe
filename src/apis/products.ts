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
    return Promise.reject(error);
  }
};

type getProductType = {
  id: number;
};

export const getProduct = async ({ id }: getProductType) => {
  try {
    const data = await apiClient.get<Products>(`/products/${id}`);
    return data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
