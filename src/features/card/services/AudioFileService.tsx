import { $axiosAuth, API_URL } from "../../../services/auth/instance";

export default class AudioFileService {

    static AUDIO_URL = API_URL + "/audio";

    static async addAudioFile(audioFile:FormData) {
        const response = await $axiosAuth.post("/audio", audioFile);
        return response;
    }

    static async getAudioById(id:number) {
        const response = await $axiosAuth.get("/audio/" + id);
        return response;
    }

}