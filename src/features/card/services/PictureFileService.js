import axios from "axios";

export default class PictureFileService {

    static PICTURE_URL = "http://localhost:8081/dlang/v1/picture";

    static async searchWordCards(searchData) {
        const response = await axios.post("http://localhost:8081/dlang/v1/word-card/search", searchData);
        // console.log(response.data);
        return response;
    }

    static async addPictureFile(pictureFile) {
        const response = await axios.post("http://localhost:8081/dlang/v1/picture", pictureFile);
        return response;
    }

    static async getPictureById(id) {
        const response = await axios.get("http://localhost:8081/dlang/v1/picture/" + id);
        return response;
    }

    static async editWordCard(wordCard) {
        const response = await axios.put("http://localhost:8081/dlang/v1/word-card", wordCard);
        return response;
    }

    static async deleteWordCard(id) {
        const response = await axios.delete("http://localhost:8081/dlang/v1/word-card/" + id);
        return response;
    }

}