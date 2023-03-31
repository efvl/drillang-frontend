import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { ArrowRepeat, ArrowLeftSquare, XSquare, CheckCircle, Circle, TrophyFill, Square } from "react-bootstrap-icons";
import { TranslateWLessonInfo } from "../models/TranslateWLessonInfo";
import { Lesson } from "../models/Lesson";
import Utils from "../../Utils";

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

     const popover = (
        <Popover id="popover-basic">
        <Popover.Body>
            <div>{props.twl.word1}</div> 
            <div>{props.twl.word2}</div>
        </Popover.Body>
      </Popover>
      );

    return ( 
        <tr>
            <th className="text-center">
                <span style={pointerHover}>
                    <ArrowLeftSquare size={18} color="red" onClick={() => removeTranslationFromLesson(props.twl.id)}></ArrowLeftSquare>
                </span>
            </th>
            <th scope="row">{props.rowNum}</th> 
            <OverlayTrigger trigger="hover" placement="top-start" overlay={popover}>
                <td>{Utils.cutString(props.twl?.word1, 100)}</td>
            </OverlayTrigger>
            <td>{Utils.cutString(props.twl?.word2, 100)}</td>
            <td width="1%" align="center">{props.twl.allAnswer}</td>
            <td width="12%">
                {props.lesson?.countDone <= props.twl.correctAnswer 
                                    ? <TrophyFill color="gold" size={18} /> 
                                    : <Square color="gray" size={18} />
                }
                <span className="p-2">{props.twl.correctAnswer}</span>
                <span style={pointerHover}>
                    <ArrowRepeat size={18} color="green" onClick={() => learnAgain(props.twl)} className="border rounded border-secondary"></ArrowRepeat>
                </span>
            </td>
            <td width="1%" align="center">{props.twl.countDone}</td>
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