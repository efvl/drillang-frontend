import React from "react";
import WLessonTableRow from './WLessonTableRow';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { Lesson } from "../models/Lesson";

interface WLessonTableProps {
    wlessons?:Array<Lesson>;
    remove?:(id:number) => void;
}

const WLessonTable = (props:WLessonTableProps) => {

    return (
        <Container className="py-2">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col" className="text-center">From To Lang</th>
                    <th scope="col" className="text-center">Reverse</th>
                    <th scope="col" className="text-center">Count Done</th>
                    <th scope="col" className="text-center">Count Chars</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.wlessons.map((item, index) =>
                        <WLessonTableRow key={item.id} rowNum={index + 1} wlesson={item} remove={props.remove} />
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default WLessonTable;