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
    lesson?:Lesson;
}

const TranslatesForLessonTable = (props:TranslateForLessonTableProps) => {

    return (
        <Container className="pt-2 pe-0">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                        <th className="text-center">Del</th>
                        <th scope="col">N</th>
                        <th scope="col">Word1</th>
                        <th scope="col">Word2</th>
                        <th scope="col">All Answer</th>
                        <th scope="col">Correct Answer</th>
                        <th scope="col">Count Done</th>
                        <th className="text-center">Skip</th>
                    </tr>
                </thead>
                <tbody>
                    {props.trLessons.map((item, index) =>
                        <TranslatesForLessonTableRow key={item.id} rowNum={index + 1} twl={item} 
                                deleteAction={props.deleteAction} againAction={props.again} skipAction={props.skip} lesson={props.lesson}/>
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default TranslatesForLessonTable;