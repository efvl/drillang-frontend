import { Language } from "../../langs/models/Language";
import { WTag } from "../../tags/models/WTag";

export interface TranslateSearchRequest {
    ids?:Array<number>;
    lessonId?:number;
    languageId?:number;
    word?:string;
    curNumPage?:number;
    sizeOfPage?:number;
    tags?:Array<WTag>;
}