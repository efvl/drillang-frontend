import React from "react";
import { Link } from "react-router-dom";
import { CheckSquare, Square } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import { Lesson } from "../models/Lesson";

interface WLessonTableRowProps {
    wlesson:Lesson;
    rowNum:number;
    remove:(id:number) => void;
}

const WLessonTableRow = (props:WLessonTableRowProps) => {

    const location = useLocation();

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
            <td>{props.wlesson.id}</td>
            <td>{props.wlesson.name}</td>
            <td>{props.wlesson.translatesCount}</td>
            <td className="text-center">{getFromToLanguageLabel()}</td>
            <td className="text-center">{getReverseIcon()}</td>
            <td width="1%" className="text-center">{props.wlesson.countDone}</td>
            <td width="1%" className="text-center">{props.wlesson.countChars}</td>
            <td>
                <Link to={`/process/wlesson/${props.wlesson.id}`} className="btn mx-2 btn-primary">Start</Link>
                <Link to={`/wlesson/translates/${props.wlesson.id}`} className="btn mx-2 btn-primary">Manage</Link>
                <Link to={`/wlesson/edit/${props.wlesson.id}`} state={{ prevPath: location.pathname }}
                             className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.wlesson.id)} className="btn btn-danger mx-2">Delete</button>
            </td>
        </tr>
    );

};

export default WLessonTableRow;