import { LTag } from "../../lessontags/models/LTag";

export interface TestLessonSearchRequest {
    
    name?:string;
    lessonTags?:Array<LTag>;
    curNumPage?:number;
    sizeOfPage?:number;

}
