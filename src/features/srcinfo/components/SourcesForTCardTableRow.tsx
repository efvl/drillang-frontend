import React from "react";
import { Link } from "react-router-dom";
import { SourceInfo } from "../models/SourceInfo";
import Utils from "../../Utils";

interface SourcesForTCardRowProps {
    srcInfo: SourceInfo,
    rowNum: number,
    addToCard: (sInfo:SourceInfo) => void,
}

const SourcesForTCardTableRow = (props:SourcesForTCardRowProps) => {

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
                <button onClick={() => props.addToCard(props.srcInfo)} className="btn btn-danger mx-2">Add to Card</button>
            </td>
        </tr>
    );

};

export default SourcesForTCardTableRow;