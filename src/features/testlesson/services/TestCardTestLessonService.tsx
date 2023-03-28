import { $axiosAuth } from "../../../services/auth/instance";
import { TestCardTestLesson } from "../models/TestCardTestLesson";
import { TestCardTestLessonSearchRequest } from "../models/TestCardTestLessonSearchRequest";
import { TestLesson } from "../models/TestLesson";

export default class TestCardTestLessonService {

    static async searchTCardTLessons(searchData:TestCardTestLessonSearchRequest) {
        const response = await $axiosAuth.post("/tcard-tlesson/search", searchData);
        return response;
    }

    static async addTCardTLesson(tctLesson:TestCardTestLesson) {
        const response = await $axiosAuth.post("/tcard-tlesson", tctLesson);
        return response;
    }

    static async getTCardTLessonById(id:number) {
        const response = await $axiosAuth.get("/tcard-tlesson/" + id);
        return response;
    }

    static async updateTCardTLesson(tctLesson) {
        const response = await $axiosAuth.put("/tcard-tlesson", tctLesson);
        return response;
    }

    static async learnAgainTCardTLesson(tctLesson:TestCardTestLesson) {
        const response = await $axiosAuth.put("/tcard-tlesson/again", tctLesson);
        return response;
    }

    static async skipTCardTLesson(tctLesson:TestCardTestLesson) {
        const response = await $axiosAuth.put("/tcard-tlesson/skip", tctLesson);
        return response;
    }

    static async updateAllTCardTLessons(tctLessons) {
        const response = await $axiosAuth.put("/tcard-tlesson/bunch", tctLessons);
        return response;
    }

    static async deleteTCardFromTLesson(id:number) {
        const response = await $axiosAuth.delete("/tcard-tlesson/" + id);
        return response;
    } 

    static async getTCardsOfTLesson(id:number) {
        const response = await $axiosAuth.get("/tcard-tlesson/by-lesson/" + id);
        return response;
    }

    static async setTCardTLessonLearnAgain(tLesson:TestLesson) {
        console.log(tLesson);
        const response = await $axiosAuth.put("/tcard-tlesson/learn-again", tLesson);
        return response;
    }
}