import React from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const LessonStatisticPanel = ({trns}) => {

    return (
        <Container className="py-2">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Word1</th>
                        <th scope="col">Word2</th>
                        <th scope="col">All Answers</th>
                        <th scope="col">Correct Answer</th>
                        <th scope="col">Target Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {trns.map((item, index) =>
                        // <TranslateTableRow key={item.id} rowNum={index + 1} translate={item} remove={remove} />
                        <tr key={item.id}>
                            <th scope="row">{index + 1}</th> 
                            <td>{item.word1}</td>
                            <td>{item.word2}</td>
                            <td>{item.allAnswer}</td>
                            <td>{item.correctAnswer}</td>
                            <td>{item.targetAnswer}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default LessonStatisticPanel;