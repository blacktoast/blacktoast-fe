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
    const data = await apiClient.post<responseLogin>('/login', JSON.stringify({ id, password }));

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMe = async (token: string) => {
  try {
    if (token.length > 0) {
      const data = await apiClient.post<responseLogin>(
        '/login',
        JSON.stringify({ id: 'tmp', password: 'tmp' })
      );

      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};
