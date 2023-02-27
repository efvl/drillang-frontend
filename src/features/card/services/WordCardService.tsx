import { WCard } from "../models/WCard";
import { WCardSearchRequest } from "../models/WCardSearchRequest";
import { $axiosAuth } from "../../../services/auth/instance";

export default class WordCardService {

    static async searchWordCards(searchData:WCardSearchRequest) {
        const response = await $axiosAuth.post("/word-card/search", searchData);
        return response;
    }

    static async createNewWordCard(wordCard:WCard) {
        const response = await $axiosAuth.post("/word-card", wordCard);
        return response;
    }

    static async getWordCardById(id:number) {
        const response = await $axiosAuth.get("/word-card/" + id);
        return response;
    }

    static async updateWordCard(wordCard:WCard) {
        const response = await $axiosAuth.put("/word-card", wordCard);
        return response;
    }

    static async deleteWordCard(id:number) {
        const response = await $axiosAuth.delete("/word-card/" + id);
        return response;
    }

}