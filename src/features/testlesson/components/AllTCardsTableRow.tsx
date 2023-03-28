import React from "react";
import { ArrowRightSquare } from "react-bootstrap-icons";
import { TCard } from "../../tstcard/models/TCard";
import Utils from "../../Utils";

interface AllTCardsTableRowProps {
    tcard:TCard;
    rowNum:number;
    addAction:(id:number) => void;
}

const AllTCardsTableRow = (props:AllTCardsTableRowProps) => {

    const addCardToLesson = (cardId:number) => {
        props.addAction(cardId);
    }

    return ( 
        <tr>
            <td width="2%" scope="row">{props.rowNum}</td> 
            <td width="2%">{props.tcard.id}</td>
            <td>{Utils.cutString(props.tcard?.question, 100)}</td>
            <td width="2%" className="text-center">
                <ArrowRightSquare color="limegreen" size={18} onClick={() => addCardToLesson(props.tcard.id)}></ArrowRightSquare>
            </td>
        </tr>
    );

};

export default AllTCardsTableRow;