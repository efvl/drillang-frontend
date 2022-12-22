import axios from "axios";
import { Lesson } from "../models/Lesson";
import { TranslateWLessonInfo } from "../models/TranslateWLessonInfo";
import { TranslateWordLesson } from "../models/TranslateWordLesson";

export default class TranslateWLessonService {

    static async searchTrWLessons(searchData:TranslateWordLessonSearchRequest) {
        const response = await axios.post("http://localhost:8081/dlang/v1/translate-wlesson/search", searchData);
        // console.log(response.data);
        return response;
    }

    static async addTrWLesson(trWLesson:TranslateWordLesson) {
        const response = await axios.post("http://localhost:8081/dlang/v1/translate-wlesson", trWLesson);
        return response;
    }

    static async getTrWLessonById(id:number) {
        const response = await axios.get("http://localhost:8081/dlang/v1/translate-wlesson/" + id);
        return response;
    }

    static async updateTrWLesson(trWLesson) {
        const response = await axios.put("http://localhost:8081/dlang/v1/translate-wlesson", trWLesson);
        return response;
    }

    static async learnAgainTrLesson(trWLesson:TranslateWordLesson) {
        const response = await axios.put("http://localhost:8081/dlang/v1/translate-wlesson/again", trWLesson);
        return response;
    }

    static async skipTrLesson(trWLesson:TranslateWordLesson) {
        const response = await axios.put("http://localhost:8081/dlang/v1/translate-wlesson/skip", trWLesson);
        return response;
    }

    static async updateAllTrWLessons(trWLessons) {
        const response = await axios.put("http://localhost:8081/dlang/v1/translate-wlesson/bunch", trWLessons);
        return response;
    }

    static async deleteTrWLesson(id:number) {
        const response = await axios.delete("http://localhost:8081/dlang/v1/translate-wlesson/" + id);
        return response;
    } 

    static async getTranslatesOfLesson(id:number) {
        const response = await axios.get("http://localhost:8081/dlang/v1/translate-wlesson/by-lesson/" + id);
        return response;
    }

    static async setLessonLearnAgain(wlesson:Lesson) {
        console.log(wlesson);
        const response = await axios.put("http://localhost:8081/dlang/v1/translate-wlesson/learn-again", wlesson);
        return response;
    }
}