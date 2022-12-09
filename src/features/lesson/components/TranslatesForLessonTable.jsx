import React from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import TranslatesForLessonTableRow from './TranslatesForLessonTableRow';

const TranslatesForLessonTable = ({trLessons, deleteAction, again}) => {

    return (
        <Container className="py-2">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                        <th className="text-center">Del</th>
                        <th scope="col">#</th>
                        <th scope="col">id</th>
                        <th scope="col">Word1</th>
                        <th scope="col">Word2</th>
                        <th scope="col">All Answer</th>
                        <th scope="col">Correct Answer</th>
                        <th scope="col">Count Done</th>
                        <th className="text-center">Again</th>
                    </tr>
                </thead>
                <tbody>
                    {trLessons.map((item, index) =>
                        <TranslatesForLessonTableRow key={item.id} rowNum={index + 1} twl={item} deleteAction={deleteAction} againAction={again}/>
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default TranslatesForLessonTable;