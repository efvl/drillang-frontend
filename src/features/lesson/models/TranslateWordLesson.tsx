import { Translate } from "../../translate/models/Translate";
import { Lesson } from "./Lesson";

export interface TranslateWordLesson {
    id?:number;
    translate?:Translate;
    wordLesson?:Lesson;
    targetAnswer?:number;
    allAnswer?:number;
    correctAnswer?:number;
    countDone?:number;
}