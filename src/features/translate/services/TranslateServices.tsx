import { $axiosAuth } from "../../../services/auth/instance";
import { Translate } from "../models/Translate";
import { TranslateSearchRequest } from "../models/TranslateSearchRequest";

export default class TranslateService {

    static async searchTranslates(searchData:TranslateSearchRequest) {
        const response = await $axiosAuth.post("/translate/search", searchData);
        return response;
    }

    static async searchTranslatesForLesson(searchData:TranslateSearchRequest) {
        const response = await $axiosAuth.post("/translate/search/for-lesson", searchData);
        return response;
    }

    static async addTranslate(translate:Translate) {
        const response = await $axiosAuth.post("/translate", translate);
        return response;
    }

    static async getTranslateById(id:number) {
        const response = await $axiosAuth.get("/translate/" + id);
        return response;
    }

    static async updateTranslate(translate:Translate) {
        const response = await $axiosAuth.put("/translate", translate);
        return response;
    }

    static async deleteTranslate(id:number) {
        const response = await $axiosAuth.delete("/translate/" + id);
        return response;
    }

}