import axios from "axios";

export default class PictureFileService {

    static PICTURE_URL = "http://localhost:8081/dlang/v1/picture";

    static async addPictureFile(pictureFile:FormData) {
        const response = await axios.post("http://localhost:8081/dlang/v1/picture", pictureFile);
        return response;
    }

    static async getPictureById(id:number) {
        const response = await axios.get("http://localhost:8081/dlang/v1/picture/" + id);
        return response;
    }

}