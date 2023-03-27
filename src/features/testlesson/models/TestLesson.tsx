import { LTag } from "../../lessontags/models/LTag";

export interface TestLesson {

    id?:number;
    name?:string;
    lessonTags?:Array<LTag>;
    countDone?:number;
    reverse?:boolean;

}