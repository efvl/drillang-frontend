import React from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { Square, XSquare, TrophyFill } from "react-bootstrap-icons";
import { TestLesson } from "../models/TestLesson";
import { TCardTLessonInfo } from "../models/TCardTLessonInfo";
import Utils from "../../Utils";

interface TestLessonStatisticPanelProps {
    tcInfos?:Array<TCardTLessonInfo>;
    lesson: TestLesson;
}

const TestLessonStatisticPanel = (props:TestLessonStatisticPanelProps) => {

    return (
        <Container className="py-2">
            <Table striped bordered hover className="shadow">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Question</th>
                        <th scope="col">All Answers</th>
                        <th scope="col">Correct Answer</th>
                        <th scope="col">Count Done</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tcInfos.map((item, index) =>
                        <tr key={item.id}>
                            <td scope="row">{index + 1}</td> 
                            <td>{Utils.cutString(item.question, 150)}</td>
                            <td>{item.allAnswer}</td>
                            <td>
                                {props.lesson?.countDone <= item.correctAnswer 
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

export default TestLessonStatisticPanel;