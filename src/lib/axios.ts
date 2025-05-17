import axios from 'axios';
import Swal from 'sweetalert2';

const API = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8004',
    withCredentials: true,
});

API.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('acs-accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Optional: Token refresh logic if access token expires
API.interceptors.response.use(
    res => res,
    async (err) => {
        const originalRequest = err.config;
        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshRes = await axios.post('/auth/refresh', {}, { withCredentials: true });
                const newAccessToken = refreshRes.data.accessToken;
                localStorage.setItem('saidii-accessToken', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return API(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('saidii-accessToken');
                window.location.href = '/login';
                setTimeout(() => {
                    Swal.fire('Failed!', 'Login Expired, Login Again', 'error');
                }, 1000);
                console.log(refreshError)

                // return Promise.reject(refreshError);
            }
        }

        return Promise.reject(err);
    }
);

export default API;
