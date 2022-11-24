import React from "react";
import { Link } from "react-router-dom";

const WCardTableRow = (props) => {

    return (
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.wcard.id}</td>
            <td>{props.wcard.language?.shortName}</td>
            <td>{props.wcard.word}</td>
            <td>{props.wcard.transcript}</td>
            <td>{props.wcard.example}</td>
            <td>
                <button className="btn btn-primary mx-2">View</button>
                <Link to={`/wcard/edit/${props.wcard.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.wcard.id)} className="btn btn-danger mx-2">Delete</button>
                <Link to="/translate/add"  state={{ word1: props.wcard }} className="btn btn-outline-primary mx-2">Add Translation</Link>
            </td>
        </tr>
    );

};

export default WCardTableRow;