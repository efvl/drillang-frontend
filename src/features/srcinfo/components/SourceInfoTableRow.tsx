import React from "react";
import { Link } from "react-router-dom";
import { SourceInfo } from "../models/SourceInfo";
import Utils from "../../Utils";

interface SourceInfoProps {
    srcInfo: SourceInfo,
    rowNum: number,
    remove: (id: number) => void,
}

const SourceInfoTableRow = (props:SourceInfoProps) => {

    return (
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.srcInfo.id}</td>
            <td>{props.srcInfo.sourceType}</td>
            <td>{Utils.cutString(props.srcInfo.name, 100)}</td>
            <td>{Utils.cutString(props.srcInfo.pathLink, 100)}</td>
            <td>{Utils.cutString(props.srcInfo.authors, 100)}</td>
            <td>{Utils.cutString(props.srcInfo.other, 100)}</td>
            <td>
                <Link to={`/srcinfo/edit/${props.srcInfo.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                {props.remove 
                    ? <button onClick={() => props.remove(props.srcInfo.id)} className="btn btn-danger mx-2">Delete</button>
                    : <></>
                }
            </td>
        </tr>
    );

};

export default SourceInfoTableRow;