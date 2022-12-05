import React from "react";
import { Link } from "react-router-dom";
import { ArrowRepeat, XSquare } from "react-bootstrap-icons";

const TranslatesForLessonTableRow = (props) => {

    const removeTranslationFromLesson = (id) => {
        props.deleteAction(id);
    }

    const learnAgain = (twl) => {
        props.againAction(twl);
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
            <td>{props.twl.targetAnswer}</td>
            <td>{props.twl.allAnswer}</td>
            <td>{props.twl.correctAnswer}</td>
            <th className="text-center">
                <ArrowRepeat size={18} color="green" onClick={() => learnAgain(props.twl)}></ArrowRepeat>
            </th>
        </tr>
    );

};

export default TranslatesForLessonTableRow;