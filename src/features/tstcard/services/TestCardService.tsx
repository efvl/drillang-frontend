import { $axiosAuth } from "../../../services/auth/instance";
import { TestCardTestLessonSearchRequest } from "../../testlesson/models/TestCardTestLessonSearchRequest";
import { TCard } from "../models/TCard";
import { TCardSearchRequest } from "../models/TCardSearchRequest";

export default class TestCardService {

    static async searchTestCards(searchData:TCardSearchRequest) {
        const response = await $axiosAuth.post("/test-card/search", searchData);
        return response;
    }

    static async searchTestCardsForLesson(searchData:TestCardTestLessonSearchRequest) {
        const response = await $axiosAuth.post("/test-card/search/for-lesson", searchData);
        return response;
    }

    static async createNewTestCard(testCard:TCard) {
        const response = await $axiosAuth.post("/test-card", testCard);
        return response;
    }

    static async getTestCardById(id:number) {
        const response = await $axiosAuth.get("/test-card/" + id);
        return response;
    }

    static async updateTestCard(testCard:TCard) {
        const response = await $axiosAuth.put("/test-card", testCard);
        return response;
    }

    static async deleteTestCard(id:number) {
        const response = await $axiosAuth.delete("/test-card/" + id);
        return response;
    }

}