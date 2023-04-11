import axios from 'axios';
import * as appConfig from './config.json';

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export const api = axios.create({
  baseURL: appConfig.api_base_url,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  config.headers.authorization = localStorage.getItem(ACCESS_TOKEN_KEY)
    ? `${appConfig.jwt_prefix} ${localStorage.getItem(ACCESS_TOKEN_KEY)}`
    : '';
  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

      console.log('Access token:', accessToken); // Output access token to console
      console.log('Refresh token:', refreshToken); // Output refresh token to console

      if (refreshToken && accessToken) {
        try {
          const { data } = await axios.post<{ access: string }>(
            `${appConfig.api_base_url}/jwt/refresh/`,
            {
              refresh: refreshToken,
            },
            {
              headers: {
                Authorization: `${appConfig.jwt_prefix} ${accessToken}`,
                'Content-Type': 'application/json',
              },
            },
          );

          localStorage.setItem(ACCESS_TOKEN_KEY, data.access);

          return api.request(originalRequest);
        } catch (e) {
          console.log('Error refreshing token:', e);
          console.log('Должен быть редирект на логин');
          // Redirect user to the login page
        }
      } else {
        console.log('No access or refresh token found, redirecting to login');
        // Redirect user to the login page
      }
    }
  },
);
