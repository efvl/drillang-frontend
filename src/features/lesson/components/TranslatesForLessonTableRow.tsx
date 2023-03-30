import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ArrowRepeat, ArrowLeftSquare, XSquare, CheckCircle, Circle, TrophyFill, Square } from "react-bootstrap-icons";
import { TranslateWLessonInfo } from "../models/TranslateWLessonInfo";
import { Lesson } from "../models/Lesson";

interface TranslateForLessonTableRowProps {
    twl?:TranslateWLessonInfo;
    lesson?:Lesson;
    rowNum?:number;
    deleteAction?:(id:number) => void;
    againAction?:(twl:TranslateWLessonInfo) => void;
    skipAction?:(twl:TranslateWLessonInfo) => void;
}


const TranslatesForLessonTableRow = (props:TranslateForLessonTableRowProps) => {

    const removeTranslationFromLesson = (id) => {
        props.deleteAction(id);
    }

    const learnAgain = (twl:TranslateWLessonInfo) => {
        props.againAction(twl);
    }

    const skipLearning = (twl:TranslateWLessonInfo) => {
        props.skipAction(twl);
    }

    const pointerHover = {
        cursor: 'pointer',
     };

    return ( 
        <tr>
            <th className="text-center">
                <span style={pointerHover}>
                    <ArrowLeftSquare size={18} color="red" onClick={() => removeTranslationFromLesson(props.twl.id)}></ArrowLeftSquare>
                </span>
            </th>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.twl.word1}</td>
            <td>{props.twl.word2}</td>
            <td>{props.twl.allAnswer}</td>
            <td>
                {props.lesson?.countDone <= props.twl.correctAnswer 
                                    ? <TrophyFill color="gold" size={18} /> 
                                    : <Square color="gray" size={18} />
                }
                <span className="p-2">{props.twl.correctAnswer}</span>
                <span style={pointerHover}>
                    <ArrowRepeat size={18} color="green" onClick={() => learnAgain(props.twl)} className="border rounded border-secondary"></ArrowRepeat>
                </span>
            </td>
            <td>{props.twl.countDone}</td>
            { props.twl.skip ?
                <th className="text-center">
                    <CheckCircle size={18} color="red" onClick={() => skipLearning(props.twl)}></CheckCircle>
                </th>
                :
                <th className="text-center">
                    <span style={pointerHover}>
                        <Circle size={18} color="gray" onClick={() => skipLearning(props.twl)}></Circle>
                    </span>
                </th>
            }
        </tr>
    );

};

export default TranslatesForLessonTableRow;