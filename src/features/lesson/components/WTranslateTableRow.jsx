import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightSquare } from "react-bootstrap-icons";

const WTranslateTableRow = (props) => {

    return ( 
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.translate.id}</td>
            <td>{props.translate.word1.word}</td>
            <td>{props.translate.word2.word}</td>
            <td className="text-center"><ArrowRightSquare color="limegreen" size={18}></ArrowRightSquare></td>
            {/* <td>
                <Link to={`/wlesson/translates/${props.wlesson.id}`} className="btn mx-2 btn-primary">Manage</Link>
                <Link to={`/wlesson/edit/${props.wlesson.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.wlesson.id)} className="btn btn-danger mx-2">Delete</button>
            </td> */}
        </tr>
    );

};

export default WTranslateTableRow;