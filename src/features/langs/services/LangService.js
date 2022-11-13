import axios from "axios";

export default class LangService {

    static async searchLanguages(searchData) {
        const response = await axios.post("http://localhost:8081/dlang/v1/lang/search", searchData);
        // console.log(response.data);
        return response;
    }

}
