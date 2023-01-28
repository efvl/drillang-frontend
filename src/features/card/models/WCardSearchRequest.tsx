import { Language } from "../../langs/models/Language";
import { WTag } from "../../tags/models/WTag";

export interface WCardSearchRequest {
    ids?:Array<number>;
    language?:Language;
    languageId?:number;
    word?:string;
    tags?:Array<WTag>;
    curNumPage?:number;
    sizeOfPage?:number;
}
