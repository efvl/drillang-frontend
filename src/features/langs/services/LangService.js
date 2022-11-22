import axios from "axios";

export default class LangService {

    static async searchLanguages(searchData) {
        let search = searchData? searchData : {
                "ids": [ 0 ],
                "shortName": "string",
                "fullName": "string"
              };
        const response = await axios.post("http://localhost:8081/dlang/v1/lang/search", search);
        // console.log(response.data);
        return response;
    }

    static async addLanguage(language) {
        const response = await axios.post("http://localhost:8081/dlang/v1/lang", language);
        return response;
    }

    static async getLanguageById(id) {
        const response = await axios.get("http://localhost:8081/dlang/v1/lang/" + id);
        return response;
    }

    static async editLanguage(language) {
        const response = await axios.put("http://localhost:8081/dlang/v1/lang", language);
        return response;
    }

    static async deleteLanguage(id) {
        const response = await axios.delete("http://localhost:8081/dlang/v1/lang/" + id);
        return response;
    }

}
