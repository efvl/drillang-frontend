import React from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { Square, XSquare, TrophyFill } from "react-bootstrap-icons";

const LessonStatisticPanel = ({trns, lesson}) => {
    console.log(lesson);

    return (
        <Container className="py-2">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                        <th scope="col">N</th>
                        <th scope="col">Word1</th>
                        <th scope="col">Word2</th>
                        <th scope="col">All Answers</th>
                        <th scope="col">Correct Answer</th>
                        <th scope="col">Count Done</th>
                    </tr>
                </thead>
                <tbody>
                    {trns.map((item, index) =>
                        // <TranslateTableRow key={item.id} rowNum={index + 1} translate={item} remove={remove} />
                        <tr key={item.id}>
                            <td>{item.wlOrder}</td> 
                            <td>{item.word1}</td>
                            <td>{item.word2}</td>
                            <td>{item.allAnswer}</td>
                            <td>
                                {lesson?.countDone <= item.correctAnswer 
                                    ? <TrophyFill color="gold" size={18}/> 
                                    : <XSquare color="firebrick" size={18}/>
                                }
                                <span className="p-2">{item.correctAnswer}</span> 
                            </td>
                            <td>{item.countDone}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>    
    );

};

export default LessonStatisticPanel;