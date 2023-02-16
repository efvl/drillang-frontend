import axios, { Axios, AxiosResponse } from "axios";
import $axiosInstance from "../../../services/auth/instance";
import { IUser } from "../models/IUser";

export default class UserService {

    static async getWordCardById(id:number) {
        const response = await axios.get("http://localhost:8081/dlang/v1/word-card/" + id);
        return response;
    }

    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $axiosInstance.get<IUser[]>('/users');
    }

}