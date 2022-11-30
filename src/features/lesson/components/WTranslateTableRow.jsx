import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightSquare } from "react-bootstrap-icons";

const WTranslateTableRow = (props) => {

    const addTranslation = (wordId) => {
        props.addAction(wordId);
    }

    return ( 
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.translate.id}</td>
            <td>{props.translate.word1.word}</td>
            <td>{props.translate.word2.word}</td>
            <td className="text-center">
                <ArrowRightSquare color="limegreen" size={18} onClick={() => addTranslation(props.translate.id)}></ArrowRightSquare>
            </td>
        </tr>
    );

};

export default WTranslateTableRow;