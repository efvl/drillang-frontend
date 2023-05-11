import React from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { Square, XSquare, TrophyFill } from "react-bootstrap-icons";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Utils from "../../Utils";

const LessonStatisticPanel = ({trns, lesson}) => {
    console.log(lesson);

    const popover = (str) => {
        const arr = str.split(/\r?\n/);
        return arr.length > 0 && arr[0].length > 0
                ? arr.map((line, index) => <div>{index + 1}. {line}</div>)
                : <div>no examples</div>
    } 

    const popoverStyle = {
        maxWidth: 600,
        width: 'auto',
    }

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
                        <tr key={item.id}>
                            <td>{item.wlOrder}</td> 
                            <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={
                                    <Popover id="popover-basic" style={popoverStyle}>
                                        <Popover.Body>
                                            {popover(item.example1)} 
                                        </Popover.Body>
                                    </Popover>
                                }>
                                <td>{Utils.cutString(item.word1, 100)}</td>
                            </OverlayTrigger>
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