import axios from 'axios';

/**
 * Configured axios instance for API requests
 * Sets up base URL, credentials, and authorization headers
 * Automatically adds authentication token from localStorage
 */
const axiosApi = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

axiosApi.interceptors.request.use(config => {
    const token = JSON.parse(localStorage.getItem('auth')).token || '';
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosApi;
