import React from "react";
import { ArrowRepeat, ArrowLeftSquare, XSquare, CheckCircle, Circle, TrophyFill, Square } from "react-bootstrap-icons";
import Utils from "../../Utils";
import { TCardTLessonInfo } from "../models/TCardTLessonInfo";
import { TestLesson } from "../models/TestLesson";

interface CurLessonTCardsTableRowProps {
    tctl?:TCardTLessonInfo;
    tlesson?:TestLesson;
    rowNum?:number;
    deleteAction?:(id:number) => void;
    againAction?:(twl:TCardTLessonInfo) => void;
    skipAction?:(twl:TCardTLessonInfo) => void;
}

const CurLessonTCardsTableRow = (props:CurLessonTCardsTableRowProps) => {

    const removeTCardFromLesson = (id) => {
        props.deleteAction(id);
    }

    const learnAgain = (tInfo:TCardTLessonInfo) => {
        props.againAction(tInfo);
    }

    const skipLearning = (tInfo:TCardTLessonInfo) => {
        props.skipAction(tInfo);
    }

    const pointerHover = {
        cursor: 'pointer',
     };

    return ( 
        <tr>
            <td width="2%" className="text-center">
                <span style={pointerHover}>
                    <ArrowLeftSquare size={18} color="red" onClick={() => removeTCardFromLesson(props.tctl.id)}></ArrowLeftSquare>
                </span>
            </td>
            <td width="2%" scope="row">{props.rowNum}</td> 
            <td>{Utils.cutString(props.tctl.question, 100)}</td>
            <td>{props.tctl.allAnswer}</td>
            <td>
                {props.tlesson?.countDone <= props.tctl.correctAnswer 
                                    ? <TrophyFill color="gold" size={18} /> 
                                    : <Square color="gray" size={18} />
                }
                <span className="p-2">{props.tctl.correctAnswer}</span>
                <span style={pointerHover}>
                    <ArrowRepeat size={18} color="green" onClick={() => learnAgain(props.tctl)} className="border rounded border-secondary"></ArrowRepeat>
                </span>
            </td>
            <td>{props.tctl.countDone}</td>
            { props.tctl.skip ?
                <th className="text-center">
                    <CheckCircle size={18} color="red"></CheckCircle>
                </th>
                :
                <th className="text-center">
                    <span style={pointerHover}>
                        <Circle size={18} color="gray" onClick={() => skipLearning(props.tctl)}></Circle>
                    </span>
                </th>
            }
        </tr>
    );

};

export default CurLessonTCardsTableRow;