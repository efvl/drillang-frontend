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
import TranslateService from '../../translate/services/TranslateServices';
import TranslateWLessonService from '../services/TranslateWLessonService';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { CheckSquare, Square, ArrowRepeat } from "react-bootstrap-icons";
import WTranslateTable from "./WTranslateTable";
import TranslatesForLessonTable from "./TranslatesForLessonTable";

const WLessonManagePanel = (props) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [wlesson, setWLesson] = useState({});
    const [trns, setTrns] = useState([]);
    const [trLessons, setTrLessons] = useState([]);
    const [searchData, setSearchData] = useState(
        {
            "languageId": 0,
            "word": "string",
            "curNumPage": 0,
            "sizeOfPage": 500
        }
    );

    useEffect(() => {
        loadWLesson();
        fetchTranslations(searchData);
        fetchTranslatesWLesson(props.wlessonId);
    }, []);


    const loadWLesson = async () => {
        const response = await WordLessonService.getWordLessonById(props.wlessonId);
        console.log(response.data);
        setWLesson(response.data);
    }

    const fetchTranslations = async (searchData) => {
        console.log(searchData);  
        const response = await TranslateService.searchTranslates(searchData);
        console.log(response.data);
        setTrns(response.data.content);
    }

    const fetchTranslatesWLesson = async (lessonId) => {
        console.log(searchData);  
        const response = await TranslateWLessonService.getTranslatesForLessonById(lessonId);
        console.log(response.data);
        setTrLessons(response.data);
    }

    const deleteTranslation = async (id) => {
        console.log('delete translation');
    } 

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    const getReverseIcon = () => {
        return wlesson?.reverse
            ? <ArrowRepeat size={18} color="limegreen" className="border"></ArrowRepeat>
            : <Square></Square>
    }

    const greenColor = {
        color: 'limegreen',
    };

    const indigoColor = {
        color: 'indigo',
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col className="border rounded p-3">
                    <Row>
                        <Col md={5}><h4 style={greenColor}>{wlesson?.fromLanguage?.fullName}-{wlesson?.toLanguage?.fullName}</h4></Col>
                        <Col md={5}><h4 style={indigoColor}>{wlesson?.name}</h4></Col>
                        <Col md={2}>
                            <div>{getReverseIcon()} reverse</div>
                            <div>count done: {wlesson?.countDone}</div>
                            <div>count chars: {wlesson?.countChars}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}></Col>
                        <Col md={5}></Col>
                        <Col md={2}></Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md={5}>
                    <WTranslateTable trns={trns} remove={deleteTranslation}/>
                </Col>
                <Col md={7}>
                    <TranslatesForLessonTable trLessons={trLessons} remove={deleteTranslation}/>
                </Col>
            </Row>
        </Container>    
    );
};

export default WLessonManagePanel;