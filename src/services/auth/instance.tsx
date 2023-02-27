import axios from "axios";
import { AuthResponse } from "./AuthResponse";

export const API_URL = "http://localhost:8081/dlang/v1";

const $axiosInstance = axios.create({
    baseURL: API_URL,
})

export const $axiosAuth = axios.create({
    baseURL: API_URL,
})

$axiosAuth.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      config.headers['Content-Type'] = 'application/json';
          return config;
      }
);

$axiosAuth.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        console.log(error);
        const originalRequest = error.config;
        if(error.response.status == 401 && error.config && !originalRequest._isRetry){
            originalRequest._isRetry = true;
            try {
                const response = await axios.post<AuthResponse>(`${API_URL}/auth/refresh`, {user: {login:localStorage.getItem('login')}, token: localStorage.getItem('refresh')});
                console.log(response);
                localStorage.setItem('token', response.data.accessToken);
                return $axiosAuth.request(originalRequest);
            } catch (e) {
                console.log("not authorized");
            }
        }
        throw error;
    }
);

export default $axiosInstance;
