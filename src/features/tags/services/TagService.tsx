import axios from "axios";
import { WTag } from "../models/WTag";
import { TagSearchRequest } from "../models/TagSearchRequest";
import { $axiosAuth } from "../../../services/auth/instance";

export default class TagService {

    static async getTagById(id:number) {
        const response = await $axiosAuth.get("/tag/" + id);
        return response;
    }

    static async addTag(tag:WTag) {
        const response = await $axiosAuth.post("/tag", tag);
        return response;
    }


    static async editTag(tag:WTag) {
        const response = await $axiosAuth.put("/tag", tag);
        return response;
    }

    static async deleteTag(id:number) {
        const response = await $axiosAuth.delete("/tag/" + id);
        return response;
    }

    static async searchTags(searchData:TagSearchRequest) {
        const response = await $axiosAuth.post("/tag/search", searchData);
        return response;
    }

}
