import axios from 'axios';
import cookies from '../utils/cookies';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export const apiAuth = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  apiAuth.interceptors.request.use(async (config) => {
    try {
      const token = await cookies.getCookie("@steq/token") || "no token";
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
    return config;
});