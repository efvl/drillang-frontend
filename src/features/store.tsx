import axios from "axios";
import { makeAutoObservable } from "mobx";
import { AuthResponse } from "../services/auth/AuthResponse";
import $axiosInstance, { $axiosAuth, API_URL } from "../services/auth/instance";
import AuthService from "../services/AuthService";
import { IUser } from "./login/models/IUser";

export default class Store {
    user = {} as IUser;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(auth: boolean){
        this.isAuth = auth;
    }

    setUser(user: IUser){
        this.user = user;
    }

    async login(login: string, password: string){
        try{
            const response = await AuthService.login(login, password);
            console.log(response.data);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e) {
            console.log(e.response?.data);
        }
    }

    async registrate(login: string, password: string){
        try{
            const response = await AuthService.registrate(login, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e) {
            console.log(e.response?.data);
        }
    }

    async logout(){
        try{
            // const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch(e) {
            console.log(e.response?.data);
        }
    }

    async checkAuth(){
        try{
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`);
            console.log(response.data);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e) {
            console.log(e.response?.data);
        }
    }
}