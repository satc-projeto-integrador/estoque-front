import { notification } from 'antd';
import axios from 'axios';

const apiBackend = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiBackend.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

apiBackend.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const message = error.response?.data?.message || 'Erro ao processar requisição';
        notification.error({ message });
        return Promise.reject(error);
    },
);

export default apiBackend;
