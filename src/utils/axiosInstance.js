import axios from 'axios';
import { apiKey, apiSecret } from '../const';
import { BASE_URL } from '../const';

// Create an Axios instance
const axiosInstance = axios.create({
    // baseURL: BASE_URL,
    baseURL: '/api',
    auth: {
        username: apiKey,
        password: apiSecret
    },
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
