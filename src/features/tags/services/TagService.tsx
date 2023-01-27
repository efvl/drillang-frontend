import axios from "axios";
import { WTag } from "../models/WTag";
import { TagSearchRequest } from "../models/TagSearchRequest";


export default class TagService {

    static async getTagById(id:number) {
        const response = await axios.get("http://localhost:8081/dlang/v1/tag/" + id);
        return response;
    }

    static async addTag(tag:WTag) {
        const response = await axios.post("http://localhost:8081/dlang/v1/tag", tag);
        return response;
    }


    static async editTag(tag:WTag) {
        const response = await axios.put("http://localhost:8081/dlang/v1/tag", tag);
        return response;
    }

    static async deleteTag(id:number) {
        const response = await axios.delete("http://localhost:8081/dlang/v1/tag/" + id);
        return response;
    }

    static async searchTags(searchData:TagSearchRequest) {
        const response = await axios.post("http://localhost:8081/dlang/v1/tag/search", searchData);
        return response;
    }

}