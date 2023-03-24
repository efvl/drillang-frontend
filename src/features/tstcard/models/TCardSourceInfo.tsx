import { SourceInfo } from "../../srcinfo/models/SourceInfo";
import { TCard } from "./TCard";

export interface TCardSourceInfo {
    id?:number;
    tCard?:TCard;
    testCardId?:number;
    sourceInfo?:SourceInfo;
    timePage?:string;
}