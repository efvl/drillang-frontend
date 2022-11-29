import React from "react";
import { Link } from "react-router-dom";
import { CheckSquare, Square } from "react-bootstrap-icons";

const WLessonTableRow = (props) => {

    const getFromToLanguageLabel = () => {
        let from = props.wlesson?.fromLanguage?.shortName;
        let to = props.wlesson?.toLanguage?.shortName;
        return from + ' - ' + to;
    }

    const getReverseIcon = () => {
        return props.wlesson?.reverse 
            ? <CheckSquare color="limegreen"></CheckSquare> 
            : <Square></Square>
    }

    return ( 
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.wlesson.id}</td>
            <td>{props.wlesson.name}</td>
            <td className="text-center">{getFromToLanguageLabel()}</td>
            <td className="text-center">{getReverseIcon()}</td>
            <td className="text-center">{props.wlesson.countDone}</td>
            <td className="text-center">{props.wlesson.countChars}</td>
            <td>
                <Link to={`/wlesson/translates/${props.wlesson.id}`} className="btn mx-2 btn-primary">Manage</Link>
                <Link to={`/wlesson/edit/${props.wlesson.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.wlesson.id)} className="btn btn-danger mx-2">Delete</button>
            </td>
        </tr>
    );

};

export default WLessonTableRow;