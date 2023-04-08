import axios from "axios";
import { makeAutoObservable } from "mobx";
import { AuthResponse } from "../services/auth/AuthResponse";
import $axiosInstance, { $axiosAuth, API_URL } from "../services/auth/instance";
import AuthService from "../services/AuthService";
import { WCardSearchRequest } from "./card/models/WCardSearchRequest";
import { IUser } from "./login/models/IUser";
import { TranslateSearchRequest } from "./translate/models/TranslateSearchRequest";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    wcardPageSearch = { sizeOfPage:10 } as WCardSearchRequest;
    translatePageSearch = {sizeOfPage:10 } as TranslateSearchRequest;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(auth: boolean){
        this.isAuth = auth;
    }

    setUser(user: IUser){
        this.user = user;
    }

    setWCardPageSearch(wcardPageSearch: WCardSearchRequest){
        this.wcardPageSearch = wcardPageSearch;
    }

    setTranslatePageSearch(translatePageSearch: TranslateSearchRequest){
        this.translatePageSearch = translatePageSearch;
    }

    async login(login: string, password: string){
        try{
            const response = await AuthService.login(login, password);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refresh', response.data.refreshToken);
            localStorage.setItem('login', response.data.user.login);
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
            const response = await AuthService.logout(this.user.login);
            console.log(response?.data);
            if(response.status == 200){
                localStorage.removeItem('token');
                localStorage.removeItem('refresh');
                localStorage.removeItem('login');
                this.setAuth(false);
                this.setUser({} as IUser);
            }
        } catch(e) {
            console.log(e.response?.data);
        }
    }

}
