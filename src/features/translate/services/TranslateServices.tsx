import axios from "axios";
import { Translate } from "../models/Translate";
import { TranslateSearchRequest } from "../models/TranslateSearchRequest";

export default class TranslateService {

    static async searchTranslates(searchData:TranslateSearchRequest) {
        const response = await axios.post("http://localhost:8081/dlang/v1/translate/search", searchData);
        // console.log(response.data);
        return response;
    }

    static async searchTranslatesForLesson(searchData:TranslateSearchRequest) {
        const response = await axios.post("http://localhost:8081/dlang/v1/translate/search/for-lesson", searchData);
        return response;
    }

    static async addTranslate(translate:Translate) {
        const response = await axios.post("http://localhost:8081/dlang/v1/translate", translate);
        return response;
    }

    static async getTranslateById(id:number) {
        const response = await axios.get("http://localhost:8081/dlang/v1/translate/" + id);
        return response;
    }

    static async updateTranslate(translate:Translate) {
        const response = await axios.put("http://localhost:8081/dlang/v1/translate", translate);
        return response;
    }

    static async deleteTranslate(id:number) {
        const response = await axios.delete("http://localhost:8081/dlang/v1/translate/" + id);
        return response;
    }

}