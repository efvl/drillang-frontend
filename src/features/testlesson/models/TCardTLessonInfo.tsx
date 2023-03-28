
export interface TCardTLessonInfo {
    id?:number;
    testCardId?:number;
    question?:string;
    answer?:string;
    pictureId?:number;
    codePart?:string;

    lessonId?:number;
    targetAnswer?:number;
    allAnswer?:number;
    correctAnswer?:number;
    countDone?:number;
    skip?:boolean;
}