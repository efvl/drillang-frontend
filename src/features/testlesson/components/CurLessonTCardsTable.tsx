import React from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { TCardTLessonInfo } from "../models/TCardTLessonInfo";
import { TestLesson } from "../models/TestLesson";
import CurLessonTCardsTableRow from "./CurLessonTCardsTableRow";

interface CurLessonTCardsTableProps {
    tcInfos?:Array<TCardTLessonInfo>;
    deleteAction?:(id:number) => void;
    again?:(tInfo:TCardTLessonInfo) => void;
    skip?:(tInfo:TCardTLessonInfo) => void; 
    tlesson?:TestLesson;
}

const CurLessonTCardsTable = (props:CurLessonTCardsTableProps) => {

    return (
        <Container className="pt-2 pe-0">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                        <th className="text-center">Del</th>
                        <th scope="col">N</th>
                        <th scope="col">Question</th>
                        <th scope="col">All Answer</th>
                        <th scope="col">Correct Answer</th>
                        <th scope="col">Count Done</th>
                        <th className="text-center">Skip</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tcInfos.map((item, index) =>
                        <CurLessonTCardsTableRow key={item.id} rowNum={index + 1} tctl={item} 
                                deleteAction={props.deleteAction} againAction={props.again} skipAction={props.skip} tlesson={props.tlesson}/>
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default CurLessonTCardsTable;