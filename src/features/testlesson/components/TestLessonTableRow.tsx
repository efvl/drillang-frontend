import React from "react";
import { Link } from "react-router-dom";
import { CheckSquare, Square } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import { TestLesson } from "../models/TestLesson";

interface TestLessonTableRowProps {
    testLesson:TestLesson;
    rowNum:number;
    remove:(id:number) => void;
}

const TestLessonTableRow = (props:TestLessonTableRowProps) => {

    const location = useLocation();

    const getReverseIcon = () => {
        return props.testLesson?.reverse 
            ? <CheckSquare color="limegreen"></CheckSquare> 
            : <Square></Square>
    }

    return ( 
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.testLesson.id}</td>
            <td>{props.testLesson.name}</td>
            <td className="text-center">{getReverseIcon()}</td>
            <td className="text-center">{props.testLesson.countDone}</td>
            <td>
                <Link to={`/process/testlesson/${props.testLesson.id}`} className="btn mx-2 btn-primary">Start</Link>
                <Link to={`/testlesson/edit/${props.testLesson.id}`} state={{ prevPath: location.pathname }}
                             className="btn btn-outline-primary mx-2">Update</Link>
                <Link to={`/testlesson/cards/${props.testLesson.id}`} className="btn mx-2 btn-primary">Manage</Link>
                <button onClick={() => props.remove(props.testLesson.id)} className="btn btn-danger mx-2">Delete</button>
            </td>
        </tr>
    );

};

export default TestLessonTableRow;