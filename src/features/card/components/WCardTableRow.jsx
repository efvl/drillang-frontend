import React from "react";
import { Link } from "react-router-dom";

const WCardTableRow = (props) => {

    const cutString = (str) => {
        if(str.length > 50){
            return str.substring(0, 50) + ' ...';
        }
        return str;
    }

    return (
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.wcard.id}</td>
            <td>{props.wcard.language?.shortName}</td>
            <td>{props.wcard.word}</td>
            <td>{props.wcard.transcript}</td>
            <td>{ cutString(props.wcard.example) }</td>
            <td>
                <Link to={`/wcard/edit/${props.wcard.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.wcard.id)} className="btn btn-danger mx-2">Delete</button>
                <Link to="/translate/add"  state={{ word1: props.wcard }} className="btn btn-outline-primary mx-2">Add Translation</Link>
            </td>
        </tr>
    );

};

export default WCardTableRow;