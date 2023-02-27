import { Lesson } from "../models/Lesson";
import { TranslateWordLesson } from "../models/TranslateWordLesson";
import { $axiosAuth } from "../../../services/auth/instance";

export default class TranslateWLessonService {

    static async searchTrWLessons(searchData:TranslateWordLessonSearchRequest) {
        const response = await $axiosAuth.post("/translate-wlesson/search", searchData);
        return response;
    }

    static async addTrWLesson(trWLesson:TranslateWordLesson) {
        const response = await $axiosAuth.post("/translate-wlesson", trWLesson);
        return response;
    }

    static async getTrWLessonById(id:number) {
        const response = await $axiosAuth.get("/translate-wlesson/" + id);
        return response;
    }

    static async updateTrWLesson(trWLesson) {
        const response = await $axiosAuth.put("/translate-wlesson", trWLesson);
        return response;
    }

    static async learnAgainTrLesson(trWLesson:TranslateWordLesson) {
        const response = await $axiosAuth.put("/translate-wlesson/again", trWLesson);
        return response;
    }

    static async skipTrLesson(trWLesson:TranslateWordLesson) {
        const response = await $axiosAuth.put("/translate-wlesson/skip", trWLesson);
        return response;
    }

    static async updateAllTrWLessons(trWLessons) {
        const response = await $axiosAuth.put("/translate-wlesson/bunch", trWLessons);
        return response;
    }

    static async deleteTrWLesson(id:number) {
        const response = await $axiosAuth.delete("/translate-wlesson/" + id);
        return response;
    } 

    static async getTranslatesOfLesson(id:number) {
        const response = await $axiosAuth.get("/translate-wlesson/by-lesson/" + id);
        return response;
    }

    static async setLessonLearnAgain(wlesson:Lesson) {
        console.log(wlesson);
        const response = await $axiosAuth.put("/translate-wlesson/learn-again", wlesson);
        return response;
    }
}