import axios from 'axios';

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
