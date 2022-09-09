import { User } from '../types/user';
import { removeCookieForToken } from '../utilities';
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
    return Promise.reject(error);
  }
};

export const userLogout = async (token: string) => {
  try {
    if (removeCookieForToken(token)) {
      return true;
    }
    return false;
  } catch (error) {
    return Promise.reject(error);
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
    return Promise.reject(error);
  }
};
