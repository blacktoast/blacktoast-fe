import { atom } from 'recoil';
import { Product } from '../types/product';

export const userState = atom({
  key: 'user', // unique ID (with respect to other atoms/selectors)
  default: {
    id: '',
    name: '',
    token: '',
  }, // default value (aka initial value)
});

type InfinityState = {
  currentPage: number;
  products: Product[];
  offsetY: number;
  totalCount: number;
};

export const infinityState = atom<InfinityState>({
  key: 'infinity',
  default: {
    currentPage: 0,
    products: [],
    offsetY: 0,
    totalCount: 0,
  },
});
