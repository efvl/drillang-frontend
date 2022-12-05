import axios from "axios";

export default class TranslateWLessonService {

    static async searchTrWLessons(searchData) {
        const response = await axios.post("http://localhost:8081/dlang/v1/translate-wlesson/search", searchData);
        // console.log(response.data);
        return response;
    }

    static async addTrWLesson(trWLesson) {
        const response = await axios.post("http://localhost:8081/dlang/v1/translate-wlesson", trWLesson);
        return response;
    }

    static async getTrWLessonById(id) {
        const response = await axios.get("http://localhost:8081/dlang/v1/translate-wlesson/" + id);
        return response;
    }

    static async updateTrWLesson(trWLesson) {
        const response = await axios.put("http://localhost:8081/dlang/v1/translate-wlesson", trWLesson);
        return response;
    }

    static async learnAgainTrLesson(trWLesson) {
        const response = await axios.put("http://localhost:8081/dlang/v1/translate-wlesson/again", trWLesson);
        return response;
    }

    static async updateAllTrWLessons(trWLessons) {
        const response = await axios.put("http://localhost:8081/dlang/v1/translate-wlesson/bunch", trWLessons);
        return response;
    }

    static async deleteTrWLesson(id) {
        const response = await axios.delete("http://localhost:8081/dlang/v1/translate-wlesson/" + id);
        return response;
    } 

    static async getTranslatesOfLesson(id) {
        const response = await axios.get("http://localhost:8081/dlang/v1/translate-wlesson/by-lesson/" + id);
        return response;
    }
}