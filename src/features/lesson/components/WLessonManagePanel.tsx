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
import { Lesson } from "../models/Lesson";
import { Translate } from "../../translate/models/Translate";
import { TranslateSearchRequest } from "../../translate/models/TranslateSearchRequest";
import { TranslateWLessonInfo } from "../models/TranslateWLessonInfo";
import { TranslateWordLesson } from "../models/TranslateWordLesson";

const WLessonManagePanel = (props) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [wlesson, setWLesson] = useState<Lesson>({});
    const [trns, setTrns] = useState<Translate[]>([]);
    const [trLessons, setTrLessons] = useState<TranslateWLessonInfo[]>([]);
    const [searchData, setSearchData] = useState<TranslateSearchRequest>({curNumPage:0, sizeOfPage:500});

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        let wlesson = await loadWLesson();
        searchData.languageId = wlesson.fromLanguage.id;
        searchData.lessonId = wlesson.id;
        fetchTranslations(searchData);
        fetchTranslatesWLesson(props.wlessonId);
    }

    const refreshData = () => {
        fetchTranslations(searchData);
        fetchTranslatesWLesson(wlesson.id);
    }

    const loadWLesson = async () => {
        const response = await WordLessonService.getWordLessonById(props.wlessonId);
        console.log(response.data);
        setWLesson(response.data);
        return response.data;
    }

    const fetchTranslations = async (searchData:TranslateSearchRequest) => {
        console.log(searchData); 
        const response = await TranslateService.searchTranslatesForLesson(searchData);
        console.log(response.data);
        setTrns(response.data.content);
    }

    const fetchTranslatesWLesson = async (lessonId:number) => {
        console.log(searchData);  
        const response = await TranslateWLessonService.getTranslatesOfLesson(lessonId);
        console.log(response.data);
        setTrLessons(response.data);
    }

    const addToLesson = async (translateId:number) => {
        let twl = {
            translate: { id: translateId },
            wordLesson: wlesson,
            targetAnswer: 1,
        } as TranslateWordLesson;
        const response = await TranslateWLessonService.addTrWLesson(twl);
        if(response.status == 200){
            refreshData();
        }
    } 

    const learnAgain = async (twLesson:TranslateWLessonInfo) => {
        console.log(twLesson);
        let twl = {
            id : twLesson.id,
            translate: { id: twLesson.translateId },
            wordLesson: wlesson ,
            correctAnswer: 0,
            skip: false,
        } as TranslateWordLesson;
        const response = await TranslateWLessonService.learnAgainTrLesson(twl);
        if(response.status == 200){
            refreshData();
        }
    }

    const skipLearning = async (twLesson:TranslateWLessonInfo) => {
        console.log(twLesson);
        let twl = {
            id : twLesson.id,
            translate: { id: twLesson.translateId },
            wordLesson: wlesson ,
            skip: true,
        } as TranslateWordLesson;
        const response = await TranslateWLessonService.skipTrLesson(twl);
        if(response.status == 200){
            refreshData();
        }
    }

    const deleteFromLesson = async (twlId:number) => {
        const response = await TranslateWLessonService.deleteTrWLesson(twlId);
        if(response.status == 200){
            refreshData();
        }
    } 

    const setLessonLearnAgain = async (wlesson:Lesson) => {
        const response = await TranslateWLessonService.setLessonLearnAgain(wlesson);
        if(response.status == 200){
            refreshData();
        }
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
                        <Col md={4}>
                            <h4 style={greenColor}>{wlesson?.fromLanguage?.fullName}-{wlesson?.toLanguage?.fullName}</h4>
                        </Col>
                        <Col md={6}>
                            <h4 style={indigoColor}>{wlesson?.name}</h4>
                            <Link to={`/wlesson/edit/${props.wlessonId}`} state={{ prevPath: location.pathname }}
                                        className="btn btn-outline-primary mx-2" style={{width: 110}}>Update</Link>
                            <Link to={`/process/wlesson/${props.wlessonId}`} 
                                        className="btn btn-outline-primary mx-2" style={{width: 110}}>Start</Link>
                            <Link onClick={() => setLessonLearnAgain(wlesson)} to={""}
                                        className="btn btn-outline-primary mx-2" style={{ width: 110 }}>Learn again</Link>
                        </Col>
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
                <Col md={5} className="p-0">
                    <WTranslateTable trns={trns} addAction={addToLesson}/>
                </Col>
                <Col md={7} className="p-0">
                    <TranslatesForLessonTable trLessons={trLessons} deleteAction={deleteFromLesson} again={learnAgain} skip={skipLearning} lesson={wlesson}/>
                </Col>
            </Row>
        </Container>    
    );
};

export default WLessonManagePanel;