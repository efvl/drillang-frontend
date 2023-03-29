import React, { useState, useEffect, useCallback } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useLocation } from 'react-router-dom';
import { Square, VolumeUp, ArrowRepeat, TrophyFill, ArrowRightSquare, CheckSquare, XSquare } from "react-bootstrap-icons";
import PictureFileService from "../../card/services/PictureFileService";
import { Badge, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Utils from "../../Utils"
import TestCardTestLessonService from "../services/TestCardTestLessonService";
import TestLessonService from "../services/TestLessonService";
import { TestLesson } from "../models/TestLesson";
import TestLessonStatisticPanel from "./TestLessonStatisticPanel";
import { LTag } from "../../lessontags/models/LTag";
import { TCardTLessonInfo } from "../models/TCardTLessonInfo";
import { WTag } from "../../tags/models/WTag";

interface TestLessonStepPanelProps {
    testLessonId: number;
}

const TestLessonStepPanel = (props:TestLessonStepPanelProps) => {

    const location = useLocation();
    const navigate = useNavigate();
    
    const [testLesson, setTestLesson] = useState<TestLesson>();
    const [cardInfosOfLesson, setCardInfosOfLesson] = useState(new Map());
    const [lessonSize, setLessonSize] = useState<number>(0);
    const [lessonReady, setLessonReady] = useState<number>(0);
    const [curCardInfo, setCurCardInfo] = useState<TCardTLessonInfo>({});

    const [searchData, setSearchData] = useState(
        {
            "languageId": 0,
            "lessonId": 0,
            "word": "string",
            "curNumPage": 0,
            "sizeOfPage": 500
        }
    );
    const [isCurChecked, setCurChecked] = useState<boolean>(false);
    const [isCurCorrect, setCurCorrect] = useState<boolean>(false);
    const [round, setRound] = useState([]);
    const [isStart, setIsStart] = useState(false);
    const [answer, setAnswer] = useState<string>('');

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        let tlesson = await loadTestLesson(props.testLessonId);
        await fetchTCardsOfLesson(tlesson.id);
    }

    const loadTestLesson = async (id:number) => {
        const response = await TestLessonService.getTestLessonById(id);
        setTestLesson(response.data);
        return response.data;
    }

    const fetchTCardsOfLesson = async (id:number) => {
        const response = await TestCardTestLessonService.getTCardsOfTLesson(id);
        setLessonReady(0);
        setupCardInfosOfLesson(response);
    }

    const setupCardInfosOfLesson = (response) => {
        console.log(response.data);
        setLessonSize(response.data.length);
        let cardInfos = new Map(response.data.filter(item => !item.skip).map(item => [item.id, item]));
        setCardInfosOfLesson(cardInfos);
    }

    const initRound = (tcLs, wl) => {
        let curRound = tcLs.filter(item => item.correctAnswer < wl.countDone); 
        if(curRound.length > 4){
            Utils.shuffleArray(curRound);
        }
        setNextCardInfo(curRound);
        setRound(curRound);
    }

    const setNextCardInfo = (curRound) => {
        setCurChecked(false);
        setAnswer('');
        setCurCorrect(false);
        if(curRound.length > 0){
            let nextCard = curRound.pop();
            console.log(nextCard);
            setCurCardInfo(nextCard);
        } else {
            console.log("end round");
            stopLesson();
        }
    }

    const startLesson = () => {
        initRound([...cardInfosOfLesson.values()], testLesson);
        setIsStart(true);
    }

    const manageLesson = async () => {
        await stopLesson();
        navigate(`/testlesson/cards/${testLesson.id}`);
    }

    const stopLesson = async () => {
        setIsStart(false);
        const response = await TestCardTestLessonService.updateAllTCardTLessons([...cardInfosOfLesson.values()]);
        setLessonReady(response.data.filter(item => item.correctAnswer >= testLesson.countDone).length);
        setupCardInfosOfLesson(response);
    }

    const handleAnswerKeyDown = (event) => {
        if(event.key == 'ArrowRight' || (event.key === 'Enter' && isCurChecked)){
            event.preventDefault();
            setNextCardInfo(round);
        }
        if (event.key === 'Enter' && !isCurChecked) {
            event.preventDefault();
            if(answer.length >= 3){
                calcStatistic();
            }
        }
    }

    const calcStatistic = () => {
        let cardInfo = cardInfosOfLesson.get(curCardInfo.id) as TCardTLessonInfo;
        cardInfo.allAnswer += 1;
        let correctAnswer = cardInfo.answer.substr(0, answer.length);
        correctAnswer = correctAnswer.toLowerCase();
        console.log(answer + " ? " + correctAnswer);
        if(correctAnswer === answer.toLowerCase()){
            cardInfo.correctAnswer += 1;
            setCurCorrect(true);
            let countDone = [...cardInfosOfLesson.values()].filter(item => item.correctAnswer >= testLesson.countDone).length;
            setLessonReady(countDone);
            if(cardInfo.correctAnswer >= testLesson.countDone){
                cardInfo.countDone += 1;
            }
        } 
        setCurChecked(true);
    }

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    const getReverseIcon = () => {
        return testLesson?.reverse
            ? <ArrowRepeat size={18} color="limegreen" className="border"></ArrowRepeat>
            : <Square></Square>
    }

    const getLessonTagsLabel = () => {
        return testLesson 
            ? testLesson?.lessonTags?.map((item: LTag, i: number) =>
                <Badge pill bg="secondary" key={`tag_${i}`}>
                    {item.name}
                </Badge>
                )
            : <></>    
    }

    const getCardTagsLabel = () => {
        return curCardInfo 
            ? curCardInfo?.tags?.map((item: WTag, i: number) =>
                <Badge pill bg="secondary" key={`tag_${i}`}>
                    {item.name}
                </Badge>
                )
            : <></>    
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
                    <div>{getLessonTagsLabel()}</div>
                    <Button className="m-2" variant="outline-primary" style={{width: 150}} onClick={manageLesson}> Manage </Button>
                    {!isStart && <Button variant="outline-primary" style={{width: 150}} onClick={startLesson} disabled={lessonSize == lessonReady}> Start </Button>}
                    {isStart && <Button variant="outline-primary" style={{width: 150}} onClick={stopLesson}> Stop </Button>}
                </Col>
                <Col md={6} className="pt-2">
                    <h4 style={indigoColor}>{testLesson?.name}</h4>
                    <div>cards: {lessonSize} ready: {lessonReady}</div>
                </Col>
                <Col md={2}>
                    <div>{getReverseIcon()} reverse</div>
                    <div>count done: {testLesson?.countDone}</div>
                </Col>
            </Row>
            {isStart &&
            <Row className="border rounded p-3 mt-3">
                <Col md={4} className="border">
                    {isStart && curCardInfo && curCardInfo.pictureId && <img src={PictureFileService.PICTURE_URL + "/" + curCardInfo.pictureId}  width="100%"/>}
                    <span>GGG</span>
                </Col>
                <Col md={6}>
                    <Row className="row-cols-auto">
                        <Col className="py-2">
                            {getCardTagsLabel()}
                        </Col>
                    </Row>
                    <Container className="p-3">
                        <Row>
                            <Col>
                                <Form>
                                    <Form.Control as="textarea" rows={3} disabled readOnly 
                                        value={curCardInfo?.question}  />
                                    <Form.Control as="textarea" rows={3} placeholder="Enter answer" autoFocus 
                                        value={answer} 
                                        onChange={e => setAnswer(e.target.value)}
                                        onKeyDown={handleAnswerKeyDown} />
                                    <Form.Control as="textarea" rows={3} disabled readOnly 
                                        value={isCurChecked ? curCardInfo?.answer : ''}  />
                                </Form>
                            </Col>
                        </Row>
                        <Row className="pt-2 justify-content-center">
                            <Col></Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                        <Row className="pt-3 justify-content-center">
                            <Col></Col>
                            <Col>
                                <Button variant="outline-primary" style={{width: 150}} onClick={() => setNextCardInfo(round)}> Next </Button>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                </Col>
                <Col>
                    <div><Square/> {curCardInfo.allAnswer} (all)</div>
                    <div><XSquare color="firebrick"/> {curCardInfo.allAnswer - curCardInfo.correctAnswer} (wrong)</div>
                    <div><CheckSquare color="limegreen"/> {curCardInfo.correctAnswer} (correct)</div>
                    <div><ArrowRightSquare color="gold"/> {curCardInfo.targetAnswer} (target)</div>
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
                <TestLessonStatisticPanel tcInfos={[...cardInfosOfLesson.values()]} lesson={testLesson} />
            </Row>
            }
        </Container>    
    );
};

export default TestLessonStepPanel;
