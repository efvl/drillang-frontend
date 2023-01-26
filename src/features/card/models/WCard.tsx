import { Language } from "../../langs/models/Language";
import { Tag } from "../../tags/models/Tag";

export interface WCard {
    id?:number;
    word?:string;
    transcript?:string;
    example?:string;
    audioId?:number;
    pictureId?:number;
    dateCreated?:Date;
    language?:Language;
    tags?:Array<Tag>;
}

