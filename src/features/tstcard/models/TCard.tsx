import { WTag } from "../../tags/models/WTag";
import { TCardSourceInfo } from "./TCardSourceInfo";

export interface TCard {
    id?:number;
    question?:string;
    answer?:string;
    editorContent?:string;
    pictureId?:number;
    sources?:Array<TCardSourceInfo>;
    codePart?:string;
    dateCreated?:Date;
    tags?:Array<WTag>;
}