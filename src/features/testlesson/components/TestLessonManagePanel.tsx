import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Badge, InputGroup } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { CheckSquare, Square, ArrowRepeat } from "react-bootstrap-icons";
import { WTag } from "../../tags/models/WTag";
import TagService from "../../tags/services/TagService";
import TagDropdownPanel from "../../card/components/TagDropdownPanel";
import TestCardTestLessonService from "../services/TestCardTestLessonService";
import LTagService from "../../lessontags/services/LTagService";
import { TestLesson } from "../models/TestLesson";
import { TestCardTestLesson } from "../models/TestCardTestLesson"
import TestLessonService from "../services/TestLessonService";
import { LTag } from "../../lessontags/models/LTag";
import { TCard } from "../../tstcard/models/TCard";
import { TCardSearchRequest } from "../../tstcard/models/TCardSearchRequest";
import TestCardService from "../../tstcard/services/TestCardService";
import { TestCardTestLessonSearchRequest } from "../models/TestCardTestLessonSearchRequest";
import AllTCardsTable from "./AllTCardsTable";
import CurLessonTCardsTable from "./CurLessonTCardsTable";
import { TCardTLessonInfo } from "../models/TCardTLessonInfo";


interface TestLessonManagePanelProps {
    tlessonId: number;
}

const TestLessonManagePanel = (props: TestLessonManagePanelProps) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [testLesson, setTestLesson] = useState<TestLesson>({});
    const [tCards, setTCards] = useState<TCard[]>([]);
    const [tcInfos, setTcInfos] = useState<TCardTLessonInfo[]>([]);
    const [tCardSearchData, setTCardSearchData] = useState<TestCardTestLessonSearchRequest>({ curNumPage: 0, sizeOfPage: 500, lessonId: props.tlessonId });
    const [allWTags, setAllWTags] = useState<WTag[]>([]);
    const [filterWTags, setFilterWTags] = useState<WTag[]>([]);

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        let tlesson = await loadTestLesson();
        let wTags = await loadWTags();
        fetchAllTCards(tCardSearchData);
        fetchCardInfosOfLesson(props.tlessonId);
    }

    const loadTestLesson = async () => {
        const response = await TestLessonService.getTestLessonById(props.tlessonId);
        console.log(response.data);
        setTestLesson(response.data);
        return response.data;
    }

    const loadWTags = async () => {
        const responseTags = await TagService.searchTags({});
        setAllWTags(responseTags.data);
        return responseTags.data;
    }

    const refreshData = () => {
        console.log('refresh');
        fetchAllTCards(tCardSearchData);
        fetchCardInfosOfLesson(testLesson.id);
    }

    const fetchAllTCards = async (searchData: TestCardTestLessonSearchRequest) => {
        console.log(searchData);
        const response = await TestCardService.searchTestCardsForLesson(searchData);
        console.log(response.data);
        setTCards(response.data.content);
    }

    const fetchCardInfosOfLesson = async (lessonId: number) => {
        const response = await TestCardTestLessonService.getTCardsOfTLesson(lessonId);
        console.log(response.data);
        setTcInfos(response.data);
    }

    const tagSelectHandler = (tags: WTag[]) => {
        console.log(tags);
        setFilterWTags(tags);
        let searchData = {...tCardSearchData, tags:tags}
        setTCardSearchData(searchData);
        fetchAllTCards(searchData);
    }

    const setLessonLearnAgain = async (tlesson: TestLesson) => {
        const response = await TestCardTestLessonService.setTCardTLessonLearnAgain(tlesson);
        if (response.status == 200) {
            refreshData();
        }
    }

    const learnAgain = async (tLessonInfo:TCardTLessonInfo) => {
        console.log(tLessonInfo);
        let tctl = {
            id : tLessonInfo.id,
            testCard: { id: tLessonInfo.testCardId },
            testLesson: testLesson,
            correctAnswer: 0,
            skip: false,
        } as TestCardTestLesson;
        const response = await TestCardTestLessonService.learnAgainTCardTLesson(tctl);
        if(response.status == 200){
            refreshData();
        }
    }

    const skipLearning = async (tLessonInfo:TCardTLessonInfo) => {
        console.log(tLessonInfo);
        let tctl = {
            id : tLessonInfo.id,
            testCard: { id: tLessonInfo.testCardId },
            testLesson: testLesson,
        } as TestCardTestLesson;
        const response = await TestCardTestLessonService.skipTCardTLesson(tLessonInfo);
        if(response.status == 200){
            refreshData();
        }
    }

    const addToLesson = async (tcardId: number) => {
        let tctl = {
            testCard: { id: tcardId },
            testLesson: testLesson,
            targetAnswer: 1,
        } as TestCardTestLesson;
        const response = await TestCardTestLessonService.addTCardTLesson(tctl);
        if (response.status == 200) {
            refreshData();
        }
    }

    const deleteFromLesson = async (cardId: number) => {
        const response = await TestCardTestLessonService.deleteTCardFromTLesson(cardId);
        if(response.status == 200){
            refreshData();
        }
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
        return testLesson.lessonTags?.map((item: LTag, i: number) =>
            <Badge pill bg="secondary" key={`tag_${i}`}>
                {item.name}
            </Badge>
        )
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
                            {getLessonTagsLabel()}
                        </Col>
                        <Col md={6}>
                            <h4 style={indigoColor}>{testLesson?.name}</h4>
                            <Link to={`/testlesson/edit/${props.tlessonId}`} state={{ prevPath: location.pathname }}
                                className="btn btn-outline-primary mx-2" style={{ width: 110 }}>Update</Link>
                            <Link to={`/process/testlesson/${props.tlessonId}`} 
                                className="btn btn-outline-primary mx-2" style={{width: 110}}>Start</Link>
                            <Link onClick={() => setLessonLearnAgain(testLesson)} to={""}
                                className="btn btn-outline-primary mx-2" style={{ width: 110 }}>Learn again</Link>
                        </Col>
                        <Col md={2}>
                            <div>{getReverseIcon()} reverse</div>
                            <div>count done: {testLesson?.countDone}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}></Col>
                        <Col md={5}></Col>
                        <Col md={2}></Col>
                    </Row>
                </Col>
            </Row>
            <Row className="p-2 row-cols-auto">
                <Col>
                    <TagDropdownPanel wordTags={filterWTags} tags={allWTags} handler={tagSelectHandler} />
                </Col>
            </Row>
            <Row>
                <Col md={5} className="p-0">
                    <AllTCardsTable tCards={tCards} addAction={addToLesson} />
                </Col>
                <Col md={7} className="p-0">
                    <CurLessonTCardsTable tcInfos={tcInfos} deleteAction={deleteFromLesson} again={learnAgain} skip={skipLearning} tlesson={testLesson}/>
                </Col>
            </Row>
        </Container>
    );
};

export default TestLessonManagePanel;