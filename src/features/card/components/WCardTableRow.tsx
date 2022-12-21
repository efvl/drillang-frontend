import React from "react";
import { Link } from "react-router-dom";
import { WCard } from "../models/WCard";

interface WCardTableRowProps {
    wcard: WCard,
    rowNum: number,
    remove: (id: number) => void,
}

const WCardTableRow = (props:WCardTableRowProps) => {

    const cutString = (str:string, len:number) => {
        if(str.length > len){
            return str.substring(0, len) + ' ...';
        }
        return str;
    }

    return (
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.wcard.id}</td>
            <td>{props.wcard.language?.shortName}</td>
            <td>{cutString(props.wcard.word, 40)}</td>
            <td>{cutString(props.wcard.transcript, 10)}</td>
            <td>{cutString(props.wcard.example, 40)}</td>
            <td>
                <Link to={`/wcard/edit/${props.wcard.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.wcard.id)} className="btn btn-danger mx-2">Delete</button>
                <Link to="/translate/add"  state={{ word1: props.wcard }} className="btn btn-outline-primary mx-2">Add Translation</Link>
            </td>
        </tr>
    );

};

export default WCardTableRow;