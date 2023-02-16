import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "./auth/AuthResponse";
import $axiosInstance from "./auth/instance";


export default class AuthService {
    
    static async login(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $axiosInstance.post<AuthResponse>('/auth/login', {login, password});
    }

    static async registrate(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $axiosInstance.post<AuthResponse>('/auth/registration', {login, password});
    }

    static async logout(): Promise<void> {
        return $axiosInstance.post('/logout');
    }
}