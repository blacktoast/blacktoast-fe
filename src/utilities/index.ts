import { ONE_HOURS_MILLISECONDS } from './constants';

export const parseQueryString = (search: string): Record<string, string> =>
  (search || '')
    .replace(/^\?/g, '')
    .split('&')
    .reduce((acc, query) => {
      const [key, value] = query.split('=');

      if (key) {
        acc[key] = decodeURIComponent(value);
      }

      return acc;
    }, {} as Record<string, string>);

export const setCookieForToken = (token: string) => {
  const expireTime = new Date(Date.now() + ONE_HOURS_MILLISECONDS);
  document.cookie = `token=${token}; path=/; expires=${expireTime.toUTCString()}`;
};

export const removeCookieForToken = (token: string) => {
  const expireTime = new Date(Date.now());
  document.cookie = `token=${token}; path=/; expires=${expireTime.toUTCString()}`;

  if (!document.cookie) return true;
  return false;
};

export const getTokenByCookie = () => {
  const { cookie } = document;
  return cookie.split('=')[1];
};

export const isLogin = () => {
  const token = getTokenByCookie();
  if (token) return true;
  return false;
};
