import axios from "axios";
import Endpoints from "./Endpoints";

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
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );

export default $axiosInstance;
