import { Language } from "../../langs/models/Language";

export interface WCard {
    id?:number;
    word?:string;
    transcript?:string;
    example?:string;
    audioId?:number;
    pictureId?:number;
    dateCreated?:Date;
    language?:Language;
}

