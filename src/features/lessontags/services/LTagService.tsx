import axios from "axios";
import { $axiosAuth } from "../../../services/auth/instance";
import { LTag } from "../models/LTag";
import { LTagSearchRequest } from "../models/LTagSearchRequest";

export default class LTagService {

    static async getLTagById(id:number) {
        const response = await $axiosAuth.get("/lesson-tag/" + id);
        return response;
    }

    static async addLTag(lTag:LTag) {
        const response = await $axiosAuth.post("/lesson-tag", lTag);
        return response;
    }


    static async editLTag(lTag:LTag) {
        const response = await $axiosAuth.put("/lesson-tag", lTag);
        return response;
    }

    static async deleteLTag(id:number) {
        const response = await $axiosAuth.delete("/lesson-tag/" + id);
        return response;
    }

    static async searchLTags(searchData:LTagSearchRequest) {
        const response = await $axiosAuth.post("/lesson-tag/search", searchData);
        return response;
    }

}
