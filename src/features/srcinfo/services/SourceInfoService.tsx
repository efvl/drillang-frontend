import { $axiosAuth } from "../../../services/auth/instance";
import { SourceInfo } from "../models/SourceInfo";
import { SourceInfoSearchRequest } from "../models/SourceInfoSearchRequest";

export default class SourceInfoService {

    static async searchSourceInfos(searchData:SourceInfoSearchRequest) {
        const response = await $axiosAuth.post("/source-info/search", searchData);
        return response;
    }

    static async addSourceInfo(srcInfo:SourceInfo) {
        const response = await $axiosAuth.post("/source-info", srcInfo);
        return response;
    }

    static async getSourceInfoById(id:number) {
        const response = await $axiosAuth.get("/source-info/" + id);
        return response;
    }

    static async updateSourceInfo(srcInfo:SourceInfo) {
        const response = await $axiosAuth.put("/source-info", srcInfo);
        return response;
    }

    static async deleteSourceInfo(id:number) {
        const response = await $axiosAuth.delete("/source-info/" + id);
        return response;
    }

}