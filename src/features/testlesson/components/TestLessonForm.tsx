import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import TestLessonService from "../services/TestLessonService";
import { TestLesson } from "../models/TestLesson";

interface TestLessonFormProps {
    isEdit?:boolean;
    testLessonId?:number;
}

const TestLessonForm = (props:TestLessonFormProps) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [testLessonForm, setTestLessonForm] = useState<TestLesson>({ name: '', reverse: false, countDone: 1 });

    useEffect(() => {
        if(props.isEdit){
            loadTestLesson();
        }
    }, []);

    const loadTestLesson = async () => {
        const response = await TestLessonService.getTestLessonById(props.testLessonId);
        setTestLessonForm(response.data);
    }

    const submitTestLesson = async (e) => {
        e.preventDefault();
        const response = await TestLessonService.addTestLesson(testLessonForm);
        console.log(response.data);
        navigate('/testlesson');
    }

    const cancelAction = async (e) => {
        e.preventDefault();
        navigate('/testlesson');
    }

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    const handleCountDoneChange = event => {
        const result = event.target.value.replace(/\D/g, '');
        setTestLessonForm({...testLessonForm, countDone: result});
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md={3}></Col>
                <Col md={6} className="border rounded pt-3">
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="name">
                        <Form.Label column sm="3">Name : </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" 
                                placeholder="Enter name"
                                value={testLessonForm.name}
                                onChange={e => setTestLessonForm({...testLessonForm, name: e.target.value})}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="isReverse">
                        <Form.Label column sm="3">Reverse : </Form.Label>
                        <Col sm="9" className="pt-2">
                            <Form.Check type='checkbox' 
                                    checked={testLessonForm?.reverse} 
                                    onChange={e => setTestLessonForm({...testLessonForm, reverse: e.target.checked})}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="counDone">
                        <Form.Label column sm="3">Count done : </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text"
                                placeholder="Enter count that should be done"
                                value={testLessonForm.countDone}
                                onChange={handleCountDoneChange}/>
                        </Col>
                    </Form.Group>
                    <div className="text-center p-2">
                        <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitTestLesson}> Save </Button>
                        <Link className="btn btn-outline-danger mx-2" style={{ width: 150 }} onClick={cancelAction} to={""}>Cancel</Link>
                    </div>
                </Form>
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>    
    );
};

export default TestLessonForm;