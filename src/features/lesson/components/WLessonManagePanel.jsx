import React, { useState, useEffect } from "react";
import LangService from "../../langs/services/LangService";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { InputGroup } from "react-bootstrap";
import LangDropdown from "../../card/components/LangDropdown";
import { useNavigate, useLocation } from 'react-router-dom';
import WordLessonService from "../services/WordLessonService";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const WLessonManagePanel = (props) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [wlesson, setWLesson] = useState({});

    useEffect(() => {
        loadWLesson();
    }, []);


    const loadWLesson = async () => {
        const response = await WordLessonService.getWordLessonById(props.wlessonId);
        setWLesson(response.data);
    }

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col className="border rounded pt-3">
                    <Row className="text-center">
                        <h3>Lesson : {wlesson?.name}</h3>
                    </Row>
                    <Row></Row>
                </Col>
            </Row>
        </Container>    
    );
};

export default WLessonManagePanel;