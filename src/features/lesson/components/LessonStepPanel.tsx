import React, { useState, useEffect, useCallback } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useLocation } from 'react-router-dom';
import { Square, VolumeUp, ArrowRepeat, TrophyFill, ArrowRightSquare, CheckSquare, XSquare, CheckCircle, Circle } from "react-bootstrap-icons";
import WordLessonService from "../services/WordLessonService";
import TranslateWLessonService from "../services/TranslateWLessonService";
import PictureFileService from "../../card/services/PictureFileService";
import AudioFileService from "../../card/services/AudioFileService";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import LessonStatisticPanel from "./LessonStatisticPanel";
import Utils from "../../Utils"
import { Translate } from "../../translate/models/Translate";
import { TranslateWLessonInfo } from "../models/TranslateWLessonInfo";
import { Lesson } from "../models/Lesson";

const LessonStepPanel = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
    
    const [wlesson, setWLesson] = useState<Lesson>({});
    const [trLessons, setTrLessons] = useState(new Map());
    const [lessonSize, setLessonSize] = useState<number>(0);
    const [lessonReady, setLessonReady] = useState<number>(0);
    const [isPlayAudio, setIsPlayAudio] = useState<boolean>(true);
    const [searchData, setSearchData] = useState(
        {
            "languageId": 0,
            "lessonId": 0,
            "word": "string",
            "curNumPage": 0,
            "sizeOfPage": 500
        }
    );
    const [curTranslate, setCurTranslate] = useState<TranslateWLessonInfo>({});
    const [isCurChecked, setCurChecked] = useState<boolean>(false);
    const [isCurCorrect, setCurCorrect] = useState<boolean>(false);
    const [round, setRound] = useState([]);
    const [isStart, setIsStart] = useState(false);
    const [answer, setAnswer] = useState<string>('');
    const [curAudio1, setCurAudio1] = useState<HTMLAudioElement>();
    const [curAudio2, setCurAudio2] = useState<HTMLAudioElement>();

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        let wl = await loadWLesson(props.lessonId);
        await fetchTranslatesWLesson(wl);
    }

    const loadWLesson = async (lessonId:number) => {
        const response = await WordLessonService.getWordLessonById(lessonId);
        setWLesson(response.data);
        return response.data;
    }

    const fetchTranslatesWLesson = async (wl:Lesson) => {
        const response = await TranslateWLessonService.getTranslatesOfLesson(wl.id);
        setLessonReady(response.data.filter(item => item.correctAnswer >= wl.countDone).length);
        setupTrLessons(response);
    }

    const setupTrLessons = (response) => {
        console.log(response.data);
        setLessonSize(response.data.length);
        let translates = new Map(response.data.filter(item => !item.skip).map(item => [item.id, item]));
        setTrLessons(translates);
    }

    const initRound = (trLs, wl) => {
        let curRound = trLs.filter(item => item.correctAnswer < wl.countDone); 
        if(curRound.length > 4 && !wlesson.useOrder){
            Utils.shuffleArray(curRound);
        }
        setNextTranslate(curRound);
        setRound(curRound);
    }

    const setNextTranslate = (curRound) => {
        setCurChecked(false);
        setAnswer('');
        setCurCorrect(false);
        if(curRound.length > 0){
            let nextTr = curRound.shift();
            console.log(nextTr);
            setCurAudios(nextTr);
            setCurTranslate(nextTr);
        } else {
            console.log("end round");
            stopLesson();
        }
    }

    const setCurAudios = (curTransl) => {
        let audio1:HTMLAudioElement = curTransl.audioId1 != null ? new Audio(AudioFileService.AUDIO_URL + "/" + curTransl.audioId1) : null;
        setCurAudio1(audio1);
        let audio2 = curTransl.audioId2 != null ? new Audio(AudioFileService.AUDIO_URL + "/" + curTransl.audioId2) : null;
        setCurAudio2(audio2);
        if(wlesson?.reverse && curTransl.audioId2 != null && isPlayAudio){
            audio2.play();
        } 
        if(!wlesson?.reverse && curTransl.audioId1 != null && isPlayAudio) {
            audio1.play();
        }
    }

    const playAudio = (num) => {
        if(curTranslate.audioId2 != null && num == 2){
            curAudio2.play();
        }
        if(curTranslate.audioId1 != null && num == 1){
            curAudio1.play();
        }
    }

    const getAudioElement = (audioId) => {
        return audioId &&
                <div>
                    <audio controls autoPlay src={AudioFileService.AUDIO_URL + "/" + audioId}>
                        <source src={AudioFileService.AUDIO_URL + "/" + audioId}></source>
                    </audio>
                </div>
    }

    const startLesson = () => {
        initRound([...trLessons.values()], wlesson);
        setIsStart(true);
    }

    const manageLesson = async () => {
        await stopLesson();
        navigate(`/wlesson/translates/${wlesson.id}`);
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
        let correctAnswer = wlesson.reverse ? trLesson.word1.substr(0, answer.length) : trLesson.word2.substr(0, answer.length);
        correctAnswer = correctAnswer.toLowerCase();
        console.log(answer + " ? " + correctAnswer);
        if(correctAnswer === answer.toLowerCase()){
            trLesson.correctAnswer += 1;
            setCurCorrect(true);
            let countDone = [...trLessons.values()].filter(item => item.correctAnswer >= wlesson.countDone).length;
            setLessonReady(countDone);
            if(trLesson.correctAnswer >= wlesson.countDone){
                trLesson.countDone += 1;
            }
        } 
        setCurChecked(true);
    }

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    const getReverseIcon = () => {
        return wlesson?.reverse
            ? <ArrowRepeat size={18} color="limegreen" className="border"></ArrowRepeat>
            : <Square></Square>
    }

    const getIsPlayIcon = () => {
        return isPlayAudio
            ? <CheckSquare size={18} color="limegreen" className="border"></CheckSquare>
            : <Square size={18} color="black"></Square>
    }

    const getUseOrderIcon = () => {
        return wlesson?.useOrder
            ? <CheckCircle size={16} color="limegreen"></CheckCircle>
            : <Circle size={14} color="gray"></Circle>
    }

    const greenColor = {
        color: 'limegreen',
    };

    const indigoColor = {
        color: 'indigo',
    }

    return (
        <Container className="mt-3">
            <Row className="border rounded p-3 justify-content-center">
                <Col md={4} className="pt-2">
                    <h4 style={greenColor}>{wlesson?.fromLanguage?.fullName}-{wlesson?.toLanguage?.fullName}</h4>
                    {!isStart && <Button variant="outline-primary" style={{width: 150}} onClick={startLesson} disabled={lessonSize == lessonReady}> Start </Button>}
                    {isStart && <Button variant="outline-primary" style={{width: 150}} onClick={stopLesson}> Stop </Button>}
                    <Button className="ms-2" variant="outline-primary" style={{width: 150}} onClick={manageLesson}> Manage </Button>
                </Col>
                <Col md={4} className="pt-2">
                    <h4 style={indigoColor}>{wlesson?.name}</h4>
                    <div>cards: {lessonSize} ready: {lessonReady}</div>
                </Col>
                <Col md={2}>
                    <div>{getReverseIcon()} reverse</div>
                    <div>{getUseOrderIcon()} use Order</div>
                    <div onClick={() => setIsPlayAudio(!isPlayAudio)}>
                        { getIsPlayIcon() } auto play audio
                    </div>
                </Col>
                <Col md={2}>
                    <div>count done: {wlesson?.countDone}</div>
                    <div>count chars: {wlesson?.countChars}</div>
                </Col>
            </Row>
            {isStart &&
            <Row className="border rounded p-3 mt-3">
                <Col md={4} className="border">
                    {isStart && curTranslate && <img src={PictureFileService.PICTURE_URL + "/" + curTranslate.pictureId}  width="100%"/>}
                </Col>
                <Col md={6}>
                    <Row className="row-cols-auto">
                        <Col className="py-2">
                            { wlesson?.reverse 
                                ? <h5>{wlesson && wlesson.toLanguage.fullName}</h5>
                                : <h5>{wlesson && wlesson.fromLanguage.fullName}</h5>
                            }
                        </Col>
                        <Col className="pt-1">
                            <VolumeUp color="royalblue" size={36} onClick={() => playAudio(wlesson?.reverse ? 2 : 1)}></VolumeUp>
                        </Col>
                        <Col className="text-success">
                            { wlesson?.reverse 
                                ? <h3>{curTranslate && curTranslate.word2}</h3>
                                : <h3>{curTranslate && curTranslate.word1}</h3>
                            } 
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
                                    { wlesson?.reverse 
                                        ? <Form.Control as="textarea" rows={3} disabled readOnly value={isCurChecked ? curTranslate?.word1 : ''}  />
                                        : <Form.Control as="textarea" rows={3} disabled readOnly value={isCurChecked ? curTranslate?.word2 : ''}  />
                                    }
                                    { wlesson?.reverse 
                                        ? <Form.Control as="textarea" rows={5} disabled readOnly value={isCurChecked ? curTranslate?.example1 : ''}  />
                                        : <Form.Control as="textarea" rows={5} disabled readOnly value={isCurChecked ? curTranslate?.example2 : ''}  />
                                    }
                                </Form>
                            </Col>
                        </Row>
                        <Row className="pt-2 justify-content-center">
                            <Col></Col>
                            <Col>
                                { isCurChecked && isPlayAudio && getAudioElement(wlesson?.reverse ? curTranslate.audioId1 : curTranslate.audioId2) }
                            </Col>
                            <Col></Col>
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
                <LessonStatisticPanel trns={[...trLessons.values()]} lesson={wlesson}></LessonStatisticPanel>
            </Row>
            }
        </Container>    
    );
};

export default LessonStepPanel;