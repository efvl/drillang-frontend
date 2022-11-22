import React from "react";
import { Link } from "react-router-dom";

const TranslateTableRow = (props) => {

    return (
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.translate.id}</td>
            <td>{props.translate.word1.language.shortName}</td>
            <td>{props.translate.word1.word}</td>
            <td>{props.translate.word2.language.shortName}</td>
            <td>{props.translate.word2.word}</td>
            <td>
                <button className="btn btn-primary mx-2">View</button>
                <Link to={`/translate/edit/${props.translate.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.translate.id)} className="btn btn-danger mx-2">Delete</button>
            </td>
        </tr>
    );

};

export default TranslateTableRow;