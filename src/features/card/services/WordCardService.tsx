import axios from "axios";
import { WCard } from "../models/WCard";
import { WCardSearchRequest } from "../models/WCardSearchRequest";

export default class WordCardService {

    static async searchWordCards(searchData:WCardSearchRequest) {
        const response = await axios.post("http://localhost:8081/dlang/v1/word-card/search", searchData);
        // console.log(response.data);
        return response;
    }

    static async createNewWordCard(wordCard:WCard) {
        const response = await axios.post("http://localhost:8081/dlang/v1/word-card", wordCard);
        return response;
    }

    static async getWordCardById(id:number) {
        const response = await axios.get("http://localhost:8081/dlang/v1/word-card/" + id);
        return response;
    }

    static async updateWordCard(wordCard:WCard) {
        const response = await axios.put("http://localhost:8081/dlang/v1/word-card", wordCard);
        return response;
    }

    static async deleteWordCard(id:number) {
        const response = await axios.delete("http://localhost:8081/dlang/v1/word-card/" + id);
        return response;
    }

}