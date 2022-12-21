import React from "react";
import { Link } from "react-router-dom";
import { Translate } from "../models/Translate";

interface TranslateTableRowProp {
    translate: Translate;
    rowNum: number;
    remove: (id:number) => void;
}

const TranslateTableRow = (props:TranslateTableRowProp) => {

    const cutString = (str:string, len:number) => {
        if(str.length > len){
            return str.substring(0, len) + ' ...';
        }
        return str;
    }

    return (
        <tr>
            <th scope="row">{props.rowNum}</th> 
            <td>{props.translate.id}</td>
            <td>{props.translate.word1.language.shortName}</td>
            <td>{cutString(props.translate.word1.word, 40)}</td>
            <td>{props.translate.word2.language.shortName}</td>
            <td>{cutString(props.translate.word2.word, 40)}</td>
            <td>
                <Link to={`/translate/edit/${props.translate.id}`} className="btn btn-outline-primary mx-2">Update</Link>
                <button onClick={() => props.remove(props.translate.id)} className="btn btn-danger mx-2">Delete</button>
            </td>
        </tr>
    );

};

export default TranslateTableRow;