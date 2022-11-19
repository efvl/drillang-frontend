import axios from "axios";

export default class WordCardService {

    static async searchWordCards(searchData) {
        const response = await axios.post("http://localhost:8081/dlang/v1/word-card/search", searchData);
        // console.log(response.data);
        return response;
    }

    static async addWordCard(wordCard) {
        const response = await axios.post("http://localhost:8081/dlang/v1/word-card", wordCard);
        return response;
    }

    static async createNewWordCard(wordCard) {
        const response = await axios.post("http://localhost:8081/dlang/v1/word-card", wordCard);
        return response;
    }

    static async addWordCardWithFiles(wordCardFiles) {
        const response = await axios.post("http://localhost:8081/dlang/v1/word-card/files", wordCardFiles);
        return response;
    }

    static async getWordCardById(id) {
        const response = await axios.get("http://localhost:8081/dlang/v1/word-card/" + id);
        return response;
    }

    static async editWordCard(wordCard) {
        const response = await axios.put("http://localhost:8081/dlang/v1/word-card", wordCard);
        return response;
    }

    static async updateWordCard(wordCard) {
        const response = await axios.put("http://localhost:8081/dlang/v1/word-card", wordCard);
        return response;
    }

    static async deleteWordCard(id) {
        const response = await axios.delete("http://localhost:8081/dlang/v1/word-card/" + id);
        return response;
    }

}