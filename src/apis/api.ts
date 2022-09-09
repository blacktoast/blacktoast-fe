import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '',
  timeout: 100000,
});

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },

  (error) => {
    return Promise.reject(error.response.data.error);
  }
);
