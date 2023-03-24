import { WTag } from "../../tags/models/WTag";

export interface TCardSearchRequest {
    ids?:Array<number>;
    question?:string;
    answer?:string;
    tags?:Array<WTag>;
    curNumPage?:number;
    sizeOfPage?:number;
}