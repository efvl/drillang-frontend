import React from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { TestLesson } from "../models/TestLesson";
import TestLessonTableRow from "./TestLessonTableRow";

interface TestLessonTableProps {
    testLessons?:Array<TestLesson>;
    remove?:(id:number) => void;
}

const TestLessonTable = (props:TestLessonTableProps) => {

    return (
        <Container className="py-2">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col" className="text-center">Reverse</th>
                    <th scope="col" className="text-center">Count Done</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.testLessons.map((item, index) =>
                        <TestLessonTableRow key={item.id} rowNum={index + 1} testLesson={item} remove={props.remove} />
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default TestLessonTable;