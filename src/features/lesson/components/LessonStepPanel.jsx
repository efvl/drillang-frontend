import React, { useState, useEffect, useCallback } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useLocation } from 'react-router-dom';
import { Square, VolumeUp, ArrowRepeat, TrophyFill, ArrowRightSquare, CheckSquare, XSquare } from "react-bootstrap-icons";
import WordLessonService from "../services/WordLessonService";
import TranslateWLessonService from "../services/TranslateWLessonService";
import PictureFileService from "../../card/services/PictureFileService";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import LessonStatisticPanel from "./LessonStatisticPanel";

const LessonStepPanel = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
    
    const [wlesson, setWLesson] = useState({});
    const [trLessons, setTrLessons] = useState(new Map());
    const [lessonSize, setLessonSize] = useState(0);
    const [lessonReady, setLessonReady] = useState(0);
    const [searchData, setSearchData] = useState(
        {
            "languageId": 0,
            "lessonId": 0,
            "word": "string",
            "curNumPage": 0,
            "sizeOfPage": 500
        }
    );
    const [curTranslate, setCurTranslate] = useState({});
    const [isCurChecked, setCurChecked] = useState(false);
    const [isCurCorrect, setCurCorrect] = useState(false);
    const [round, setRound] = useState([]);
    const [isStart, setIsStart] = useState(false);
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        let wl = await loadWLesson(props.lessonId);
        await fetchTranslatesWLesson(wl);
    }

    const loadWLesson = async (lessonId) => {
        const response = await WordLessonService.getWordLessonById(lessonId);
        setWLesson(response.data);
        return response.data;
    }

    const fetchTranslatesWLesson = async (wl) => {
        const response = await TranslateWLessonService.getTranslatesOfLesson(wl.id);
        setLessonReady(response.data.filter(item => item.correctAnswer >= wl.countDone).length);
        setupTrLessons(response);
    }

    const setupTrLessons = (response) => {
        console.log(response.data);
        setLessonSize(response.data.length);
        let translates = new Map(response.data.map(item => [item.id, item]));
        setTrLessons(translates);
    }

    const initRound = (trLs, wl) => {
        let curRound = trLs.filter(item => item.correctAnswer < wl.countDone); 
        setNextTranslate(curRound);
        setRound(curRound);
    }

    const setNextTranslate = (curRound) => {
        setCurChecked(false);
        setAnswer('');
        setCurCorrect(false);
        if(curRound.length > 0){
            let gg = curRound.pop();
            console.log(gg);
            setCurTranslate(gg);
        } else {
            console.log("end round");
            stopLesson();
        }
    }

    const startLesson = () => {
        initRound([...trLessons.values()], wlesson);
        setIsStart(true);
    }

    const stopLesson = async () => {
        setIsStart(false);
        const response = await TranslateWLessonService.updateAllTrWLessons([...trLessons.values()]);
        setLessonReady(response.data.filter(item => item.correctAnswer >= wlesson.countDone).length);
        setupTrLessons(response);
    }

    const handleAnswerKeyDown = (event) => {
        if(event.key == 'ArrowRight' || (event.key === 'Enter' && isCurChecked)){
            event.preventDefault();
            setNextTranslate(round);
        }
        if (event.key === 'Enter' && !isCurChecked) {
            event.preventDefault();
            if(answer.length >= wlesson.countChars){
                calcStatistic();
            }
        }
    }

    const calcStatistic = () => {
        let trLesson = trLessons.get(curTranslate.id);
        trLesson.allAnswer += 1;
        let correctAnswer = trLesson.word2.substr(0, answer.length);
        console.log(answer + " ? " + correctAnswer);
        if(correctAnswer === answer){
            trLesson.correctAnswer += 1;
            setCurCorrect(true);
            let countDone = [...trLessons.values()].filter(item => item.correctAnswer >= wlesson.countDone).length;
            setLessonReady(countDone);
        } 
        setCurChecked(true);
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
            <Row className="border rounded p-3">
                <Col md={5}>
                    <h4 style={greenColor}>{wlesson?.fromLanguage?.fullName}-{wlesson?.toLanguage?.fullName}</h4>
                    {!isStart && <Button variant="outline-primary" style={{width: 150}} onClick={startLesson}> Start </Button>}
                    {isStart && <Button variant="outline-primary" style={{width: 150}} onClick={stopLesson}> Stop </Button>}
                </Col>
                <Col md={5}>
                    <h4 style={indigoColor}>{wlesson?.name}</h4>
                    <div>cards: {lessonSize} ready: {lessonReady}</div>
                </Col>
                <Col md={2}>
                    <div>{getReverseIcon()} reverse</div>
                    <div>count done: {wlesson?.countDone}</div>
                    <div>count chars: {wlesson?.countChars}</div>
                </Col>
            </Row>
            {isStart &&
            <Row className="border rounded p-3 mt-3">
                <Col md={4} className="border"> image
                    {isStart && curTranslate && <img src={PictureFileService.PICTURE_URL + "/" + curTranslate.pictureId}  width="100%"/>}
                </Col>
                <Col md={6}>
                    <Row className="row-cols-auto">
                        <Col className="py-2">
                            <h5>{wlesson && wlesson.fromLanguage.fullName}</h5>
                        </Col>
                        <Col className="pt-1">
                            <VolumeUp color="royalblue" size={36}></VolumeUp>
                        </Col>
                        <Col className="text-success"> 
                            <h3>
                                {curTranslate && curTranslate.word1}
                            </h3>
                        </Col>
                    </Row>
                    <Container className="p-3">
                        <Row>
                            <Col>
                                <Form>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter answer" autoFocus 
                                        value={answer} 
                                        onChange={e => setAnswer(e.target.value)}
                                        onKeyDown={handleAnswerKeyDown} />
                                    <Form.Control as="textarea" rows={3} disabled readOnly  
                                        value={isCurChecked ? curTranslate?.word2 : ''}  />
                                </Form>
                            </Col>
                        </Row>
                        <Row className="pt-3 justify-content-center">
                            <Col></Col>
                            <Col>
                                <Button variant="outline-primary" style={{width: 150}} onClick={() => setNextTranslate(round)}> Next </Button>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                </Col>
                <Col>
                    <div><Square/> {curTranslate.allAnswer} (all)</div>
                    <div><XSquare color="firebrick"/> {curTranslate.allAnswer - curTranslate.correctAnswer} (wrong)</div>
                    <div><CheckSquare color="limegreen"/> {curTranslate.correctAnswer} (correct)</div>
                    <div><ArrowRightSquare color="gold"/> {curTranslate.targetAnswer} (target)</div>
                    {isCurChecked && 
                        <div className="border text-center rounded mt-3 p-2">
                            <h5>{isCurCorrect ? 'right' : 'wrong'}</h5>
                            <div>{isCurCorrect ? <TrophyFill color="gold" size={36}/> : <XSquare color="firebrick" size={36}/>}</div>
                        </div>
                    }
                </Col>
            </Row>
            }
            {!isStart &&
            <Row>
                <LessonStatisticPanel trns={[...trLessons.values()]}></LessonStatisticPanel>
            </Row>
            }
        </Container>    
    );
};

export default LessonStepPanel;