import { Language } from "../../langs/models/Language";

export interface Lesson {
    id?:number;
    name?:string;
    countChars?:number;
    countDone?:number;
    reverse?:boolean;
    fromLanguage?:Language;
    toLanguage?:Language;
    translatesCount?:number;
}