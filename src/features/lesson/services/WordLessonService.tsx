import axios from "axios";
import { Lesson } from "../models/Lesson";

export default class WordLessonService {

    static async searchWordLessons(searchData) {
        const response = await axios.post("http://localhost:8081/dlang/v1/word-lesson/search", searchData);
        // console.log(response.data);
        return response;
    }

    static async getLessonsFromLang(fromLangId:number) {
        const response = await axios.get("http://localhost:8081/dlang/v1/word-lesson/from-lang/" + fromLangId);
        return response;
    }

    static async addWordLesson(wordLesson:Lesson) {
        const response = await axios.post("http://localhost:8081/dlang/v1/word-lesson", wordLesson);
        return response;
    }

    static async getWordLessonById(id:number) {
        const response = await axios.get("http://localhost:8081/dlang/v1/word-lesson/" + id);
        return response;
    }

    static async updateWordLesson(wordLesson:Lesson) {
        const response = await axios.put("http://localhost:8081/dlang/v1/word-lesson", wordLesson);
        return response;
    }

    static async deleteWordLesson(id:number) {
        const response = await axios.delete("http://localhost:8081/dlang/v1/word-lesson/" + id);
        return response;
    }

}