import React, { useState, useEffect } from "react";
import LangService from "../../langs/services/LangService";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LangDropdown from "../../card/components/LangDropdown";
import { useNavigate, useLocation } from 'react-router-dom';
import WordLessonService from "../services/WordLessonService";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const AddWLessonPanel = (props) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [wlessonForm, setWLessonForm] = useState({});

    const submitWordLesson = async (e) => {
        e.preventDefault();
        const response = await WordLessonService.addWordLesson(wlessonForm);
        console.log(response.data)
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={3}></Col>
                <Col md={6}>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="name">
                        <Form.Label column sm="2">Name : </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" 
                                placeholder="Enter name"
                                value={wlessonForm.name}
                                onChange={e => setWLessonForm({...wlessonForm, name: e.target.value})}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="isReverse">
                        <Form.Label column sm="2">Reverse : </Form.Label>
                        <Col sm="10" className="pt-2">
                            <Form.Check type='checkbox' 
                                    value={wlessonForm?.reverse} 
                                    onChange={e => setWLessonForm({...wlessonForm, reverse: e.target.value})}/>
                        </Col>
                    </Form.Group>
                    <div className="text-center p-2">
                        <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitWordLesson}> Save </Button>
                        <Link className="btn btn-outline-danger mx-2" style={{width: 150}} to="/wlesson">Cancel</Link>
                    </div>
                </Form>
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>    
    );
};

export default AddWLessonPanel;