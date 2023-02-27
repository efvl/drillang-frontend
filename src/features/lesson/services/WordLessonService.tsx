import { Lesson } from "../models/Lesson";
import { LessonSearchRequest } from "../models/LessonSearchRequest";
import { $axiosAuth } from "../../../services/auth/instance";

export default class WordLessonService {

    static async searchWordLessons(searchData:LessonSearchRequest) {
        const response = await $axiosAuth.post("/word-lesson/search", searchData);
        return response;
    }

    static async getLessonsFromLang(fromLangId:number) {
        const response = await $axiosAuth.get("/word-lesson/from-lang/" + fromLangId);
        return response;
    }

    static async addWordLesson(wordLesson:Lesson) {
        const response = await $axiosAuth.post("/word-lesson", wordLesson);
        return response;
    }

    static async getWordLessonById(id:number) {
        const response = await $axiosAuth.get("/word-lesson/" + id);
        return response;
    }

    static async updateWordLesson(wordLesson:Lesson) {
        const response = await $axiosAuth.put("/word-lesson", wordLesson);
        return response;
    }

    static async deleteWordLesson(id:number) {
        const response = await $axiosAuth.delete("/word-lesson/" + id);
        return response;
    }

}