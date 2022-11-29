import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftSquare, XSquare } from "react-bootstrap-icons";

const TranslatesForLessonTableRow = (props) => {

    return ( 
        <tr>
            <th className="text-center"><XSquare size={18} color="red"></XSquare></th>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.twl.translateId}</td>
            <td>{props.twl.word1}</td>
            <td>{props.twl.word2}</td>
            <td>{props.twl.targetAnswer}</td>
            <td>{props.twl.allAnswer}</td>
            <td>{props.twl.correctAnswer}</td>
            {/* <td>
                <Link to={`/wlesson/translates/${props.wlesson.id}`} className="btn mx-2 btn-primary">Manage</Link>
                <Link to={`/wlesson/edit/${props.wlesson.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.wlesson.id)} className="btn btn-danger mx-2">Delete</button>
            </td> */}
        </tr>
    );

};

export default TranslatesForLessonTableRow;