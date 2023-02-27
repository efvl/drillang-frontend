import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "./auth/AuthResponse";
import $axiosInstance, { $axiosAuth } from "./auth/instance";


export default class AuthService {
    
    static async login(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $axiosInstance.post<AuthResponse>('/auth/login', {login, password});
    }

    static async registrate(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $axiosInstance.post<AuthResponse>('/auth/registration', {login, password});
    }

    static async logout(login: string): Promise<any> {
        return $axiosAuth.post('/auth/logout', { login });
    }
}