import { LTag } from "../../lessontags/models/LTag";

export interface TestCardTestLessonSearchRequest {
    name?:string;
    lessonTags?:Array<LTag>;
    curNumPage?:number;
    sizeOfPage?:number;
}