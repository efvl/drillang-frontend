import { TCard } from "../../tstcard/models/TCard";
import { TestLesson } from "./TestLesson";

export interface TestCardTestLesson {
    id?:number;
    testCard?:TCard;
    testLesson?:TestLesson;
    targetAnswer?:number;
    allAnswer?:number;
    correctAnswer?:number;
    countDone?:number;
    skip?:boolean;
}