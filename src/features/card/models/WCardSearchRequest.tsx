import { Language } from "../../langs/models/Language";

export interface WCardSearchRequest {
    ids?:Array<number>;
    language?:Language;
    languageId?:number;
    word?:string;
    curNumPage?:number;
    sizeOfPage?:number;
}
