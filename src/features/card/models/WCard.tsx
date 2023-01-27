import { Language } from "../../langs/models/Language";
import { WTag } from "../../tags/models/WTag";

export interface WCard {
    id?:number;
    word?:string;
    transcript?:string;
    example?:string;
    audioId?:number;
    pictureId?:number;
    dateCreated?:Date;
    language?:Language;
    tags?:Array<WTag>;
}

