import { Language } from "../../langs/models/Language";

export interface TranslateSearchRequest {
    lessonId?:number;
    languageId?:number;
    word?:string;
    curNumPage?:number;
    sizeOfPage?:number;
}