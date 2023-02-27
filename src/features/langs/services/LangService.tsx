import { $axiosAuth } from "../../../services/auth/instance";
import {LangSearchRequest} from '../models/LangSearchRequest'
import {Language} from '../models/Language';

export default class LangService {

    static async searchLanguages(searchData:LangSearchRequest) {
        const response = await $axiosAuth.post("/lang/search", searchData);
        return response;
    }

    static async addLanguage(language:Language) {
        const response = await $axiosAuth.post("/lang", language);
        return response;
    }

    static async getLanguageById(id:number) {
        const response = await $axiosAuth.get("/lang/" + id);
        return response;
    }

    static async editLanguage(language:Language) {
        const response = await $axiosAuth.put("/lang", language);
        return response;
    }

    static async deleteLanguage(id:number) {
        const response = await $axiosAuth.delete("/lang/" + id);
        return response;
    }

}
