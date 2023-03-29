import { WTag } from "../../tags/models/WTag";

export interface TCardTLessonInfo {
    id?:number;
    testCardId?:number;
    question?:string;
    answer?:string;
    pictureId?:number;
    codePart?:string;
    tags?:Array<WTag>;

    lessonId?:number;
    targetAnswer?:number;
    allAnswer?:number;
    correctAnswer?:number;
    countDone?:number;
    skip?:boolean;
}