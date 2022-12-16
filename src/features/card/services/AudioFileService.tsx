import axios from "axios";

export default class AudioFileService {

    static AUDIO_URL = "http://localhost:8081/dlang/v1/audio";

    static async addAudioFile(audioFile:FormData) {
        const response = await axios.post("http://localhost:8081/dlang/v1/audio", audioFile);
        return response;
    }

    static async getAudioById(id:number) {
        const response = await axios.get("http://localhost:8081/dlang/v1/audio/" + id);
        return response;
    }

}