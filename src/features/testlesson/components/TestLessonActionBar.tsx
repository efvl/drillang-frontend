import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LangDropdown from "../../card/components/LangDropdown";
import LangService from "../../langs/services/LangService";
import { Col } from "react-bootstrap";

const TestLessonActionBar = () => {

    return (
        <Container>
            <Row className="p-2">
                <Col md={2}>
                    <Link className="btn btn-outline-success" to="/testlesson/add" >Add Test Lesson</Link>
                </Col>
                <Col md={2}>
                </Col>
                <Col md={2}>
                </Col>
            </Row>
        </Container>
    );
};

export default TestLessonActionBar;