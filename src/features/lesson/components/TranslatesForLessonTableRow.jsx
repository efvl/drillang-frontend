import React from "react";
import { Link } from "react-router-dom";
import { ArrowRepeat, XSquare, TrophyFill, Square } from "react-bootstrap-icons";

const TranslatesForLessonTableRow = (props) => {

    const removeTranslationFromLesson = (id) => {
        props.deleteAction(id);
    }

    const learnAgain = (twl) => {
        props.againAction(twl);
    }

    const skipLearning = (twl) => {
        props.skipAction(twl);
    }

    return ( 
        <tr>
            <th className="text-center">
                <XSquare size={18} color="red" onClick={() => removeTranslationFromLesson(props.twl.id)}></XSquare>
            </th>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.twl.translateId}</td>
            <td>{props.twl.word1}</td>
            <td>{props.twl.word2}</td>
            <td>{props.twl.allAnswer}</td>
            <td>
                {props.lesson?.countDone <= props.twl.correctAnswer 
                                    ? <TrophyFill color="gold" size={18} /> 
                                    : <Square color="gray" size={18} />
                }
                <span className="p-2">{props.twl.correctAnswer}</span>
            </td>
            <td>{props.twl.countDone}</td>
            <th className="text-center">
                <ArrowRepeat size={18} color="green" onClick={() => learnAgain(props.twl)}></ArrowRepeat>
            </th>
            { props.twl.skip ?
                <th className="text-center">
                    <XSquare size={18} color="red"></XSquare>
                </th>
                :
                <th className="text-center">
                    <Square size={18} color="gray" onClick={() => skipLearning(props.twl)}></Square>
                </th>
            }
        </tr>
    );

};

export default TranslatesForLessonTableRow;