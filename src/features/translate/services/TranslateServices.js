import axios from "axios";

export default class TranslateService {

    static async searchTranslates(searchData) {
        const response = await axios.post("http://localhost:8081/dlang/v1/translate/search", searchData);
        // console.log(response.data);
        return response;
    }

    static async addTranslate(translate) {
        const response = await axios.post("http://localhost:8081/dlang/v1/translate", translate);
        return response;
    }

    static async getTranslateById(id) {
        const response = await axios.get("http://localhost:8081/dlang/v1/translate/" + id);
        return response;
    }

    static async updateTranslate(translate) {
        const response = await axios.put("http://localhost:8081/dlang/v1/translate", translate);
        return response;
    }

    static async deleteTranslate(id) {
        const response = await axios.delete("http://localhost:8081/dlang/v1/translate/" + id);
        return response;
    }

}