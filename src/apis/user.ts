import { User } from '../types/user';
import { apiClient } from './api';

type loginUser = {
  id: string;
  password: string;
};

type responseLogin = {
  accessToken: string;
  user: User;
};
export const userLogin = async ({ id, password }: loginUser) => {
  try {
    const data = await apiClient.post<responseLogin>(
      '/login',
      JSON.stringify({ id: 'test', password: 'test' })
    );

    return data.data;
  } catch (error) {
    console.log(error);
  }
};
