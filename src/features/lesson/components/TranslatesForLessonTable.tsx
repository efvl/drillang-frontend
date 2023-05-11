import React from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { Lesson } from "../models/Lesson";
import { TranslateWLessonInfo } from "../models/TranslateWLessonInfo";
import TranslatesForLessonTableRow from './TranslatesForLessonTableRow';

interface TranslateForLessonTableProps {
    trLessons?:Array<TranslateWLessonInfo>;
    deleteAction?:(id:number) => void;
    again?:(twl:TranslateWLessonInfo) => void;
    skip?:(twl:TranslateWLessonInfo) => void; 
    updOrder?:(twl:TranslateWLessonInfo) => void;
    lesson?:Lesson;
}

const TranslatesForLessonTable = (props:TranslateForLessonTableProps) => {

    return (
        <Container className="pt-2 pe-0">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr style={{ textAlign: "center", verticalAlign: "middle" }}>
                        <th rowSpan={2} className="text-center">Del</th>
                        <th rowSpan={2} scope="col">N</th>
                        <th rowSpan={2} scope="col">Word1</th>
                        <th rowSpan={2} scope="col">Word2</th>
                        <th colSpan={2} scope="col">Answers</th>
                        <th rowSpan={2} scope="col">Done</th>
                        <th rowSpan={2} className="text-center">Skip</th>
                    </tr>
                    <tr style={{ textAlign: "center" }}>
                        <th scope="col">All</th>
                        <th scope="col">Correct</th>
                    </tr>
                </thead>
                <tbody>
                    {props.trLessons.map((item, index) =>
                        <TranslatesForLessonTableRow key={item.id} rowNum={index + 1} twl={item} 
                                deleteAction={props.deleteAction} againAction={props.again} skipAction={props.skip} updOrder={props.updOrder} lesson={props.lesson}/>
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default TranslatesForLessonTable;