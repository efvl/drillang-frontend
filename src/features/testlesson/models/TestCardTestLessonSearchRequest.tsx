import { LTag } from "../../lessontags/models/LTag";
import { WTag } from "../../tags/models/WTag";

export interface TestCardTestLessonSearchRequest {
    name?:string;
    question?:string;
    lessonId?:number;
    tags?:Array<WTag>;
    lessonTags?:Array<LTag>;
    curNumPage?:number;
    sizeOfPage?:number;
}