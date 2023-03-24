import $axiosInstance, { $axiosAuth, API_URL } from "../../../services/auth/instance";

export default class PictureFileService {

    static PICTURE_URL = API_URL + "/picture";

    static async addPictureFile(pictureFile:FormData) {
        const response = await $axiosAuth.post("/picture", pictureFile); 
        return response;
    }

    static async getPictureById(id:number) {
        const response = await $axiosAuth.get("/picture/" + id);
        return response;
    }

}