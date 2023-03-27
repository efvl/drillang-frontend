import { TestLesson } from "../models/TestLesson";
import { $axiosAuth } from "../../../services/auth/instance";
import { TestLessonSearchRequest } from "../models/TestLessonSearchRequest";

export default class TestLessonService {

    static async getTestLessonById(id:number) {
        const response = await $axiosAuth.get("/test-lesson/" + id);
        return response;
    }

    static async addTestLesson(testLesson:TestLesson) {
        const response = await $axiosAuth.post("/test-lesson", testLesson);
        return response;
    }

    static async updateTestLesson(testLesson:TestLesson) {
        const response = await $axiosAuth.put("/test-lesson", testLesson);
        return response;
    }

    static async deleteTestLesson(id:number) {
        const response = await $axiosAuth.delete("/test-lesson/" + id);
        return response;
    }

    static async searchTestLessons(searchData:TestLessonSearchRequest) {
        const response = await $axiosAuth.post("/test-lesson/search", searchData);
        return response;
    }

}