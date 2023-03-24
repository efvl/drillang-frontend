import { WTag } from "../../tags/models/WTag";

export interface SourceInfoSearchRequest {
    name?:string;
    authors?:string;
    tags?:Array<WTag>;
    curNumPage?:number;
    sizeOfPage?:number;
}