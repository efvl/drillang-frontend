import React from "react";
import { Link } from "react-router-dom";
import { TCard } from "../models/TCard";
import Utils from "../../Utils";

interface TCardTableRowProps {
    tcard: TCard;
    rowNum: number;
    remove: (id: number) => void;
}

const TCardTableRow = (props:TCardTableRowProps) => {

    return (
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.tcard.id}</td>
            <td>{Utils.cutString(props.tcard?.question, 50)}</td>
            <td>{Utils.cutString(props.tcard?.answer, 50)}</td>
            <td>{Utils.cutString(props.tcard?.codePart, 20)}</td>
            <td>
                <Link to={`/tcard/edit/${props.tcard.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.tcard.id)} className="btn btn-danger mx-2">Delete</button>
            </td>
        </tr>
    );

};

export default TCardTableRow;