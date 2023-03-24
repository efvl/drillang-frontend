import { SourceInfo } from "../../srcinfo/models/SourceInfo";
import Utils from "../../Utils";
import { TCardSourceInfo } from "../models/TCardSourceInfo";
import { ArrowRepeat, ArrowLeftSquare, XSquare, CheckCircle, Circle, TrophyFill, Square } from "react-bootstrap-icons";
import { Form } from "react-bootstrap";
import { useState } from "react";

interface SourcesForTCardRowProps {
    tcsInfo: TCardSourceInfo,
    rowNum: number,
    update?:(tcs:TCardSourceInfo) => void,
    delete?:(id:number) => void
}

const TCardSourceInfoTableRow = (props:SourcesForTCardRowProps) => {

    const removeSourceFromCard = (id) => {
        props.delete(id);
    }

    const saveUpdates = (tsc:TCardSourceInfo) => {
        props.update(tsc);
    }

    const pointerHover = {
        cursor: 'pointer',
     };

    return (
        <tr>
            <th className="text-center">
                <span style={pointerHover}>
                    <ArrowLeftSquare size={18} color="red" onClick={() => removeSourceFromCard(props.tcsInfo.sourceInfo.id)}></ArrowLeftSquare>
                </span>
            </th>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.tcsInfo.id}</td>
            <td>{props.tcsInfo.sourceInfo?.sourceType}</td>
            <td>{Utils.cutString(props.tcsInfo.sourceInfo?.name, 30)}</td>
            <td>{Utils.cutString(props.tcsInfo.sourceInfo?.pathLink, 30)}</td>
            <td>{Utils.cutString(props.tcsInfo.sourceInfo?.authors, 30)}</td>
            <td>            
                <Form.Group className="mb-3" controlId="timePage">
                <Form.Control type="text" 
                    placeholder="Enter timePage"
                    value={props.tcsInfo.timePage}
                    onChange={e => props.update({...props.tcsInfo, timePage: e.target.value})}/>
                </Form.Group>
            </td>
            <th className="text-center">
                <span style={pointerHover}>
                <CheckCircle size={18} color="green" onClick={() => saveUpdates(props.tcsInfo)}></CheckCircle>
                </span>
            </th>
        </tr>
    );

};

export default TCardSourceInfoTableRow;