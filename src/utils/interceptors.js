import axios from 'axios';
import Cookies from 'js-cookie';
import { trimFields } from './trimMiddleware';

const baseURL = process.env.API_BASE_URL;

const api = axios.create({
  baseURL,
  timeout: 10000, 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const type = config.url.includes('/admin') ? 'admin' : 'client';
    const token = Cookies.get(`${type}_accessToken`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data && !(config.data instanceof FormData)) {
      config.data = trimFields(config.data);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const type = originalRequest.url.includes('/admin') ? 'admin' : 'client';
        const refreshToken = Cookies.get(`${type}_refreshToken`);
        let response = '';
        if(type == "admin"){
          response = await axios.post(`${baseURL}/admin/refresh-token`, { refreshToken });
        } else {
          response = await axios.post(`${baseURL}/client/refresh-token`, { refreshToken });
        }

        const newAccessToken = response.data.accessToken;
        Cookies.set(`${type}_accessToken`, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        const type = originalRequest.url.includes('/admin') ? 'admin' : 'client';
        console.error('Refresh token failed:', refreshError);
        Cookies.remove(`${type}_accessToken`);
        Cookies.remove(`${type}_refreshToken`);
        if(type == "admin"){
          window.location.href = `/${type}/login`;
        } else {
          window.location.href = `/`;
        }

      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
