import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Badge, InputGroup } from "react-bootstrap";
import LangDropdown from "../../card/components/LangDropdown";
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { CheckSquare, Square, ArrowRepeat } from "react-bootstrap-icons";
import { WTag } from "../../tags/models/WTag";
import TagService from "../../tags/services/TagService";
import TagDropdownPanel from "../../card/components/TagDropdownPanel";
import TestCardTestLessonService from "../services/TestCardTestLessonService";
import LTagService from "../../lessontags/services/LTagService";
import { TestLesson } from "../models/TestLesson";
import TestLessonService from "../services/TestLessonService";
import { LTag } from "../../lessontags/models/LTag";

const TestLessonManagePanel = (props) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [testLesson, setTestLesson] = useState<TestLesson>({});
    const [allWTags, setAllWTags] = useState<WTag[]>([]);
    const [filterWTags, setFilterWTags] = useState<WTag[]>([]);

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        let tlesson = await loadTestLesson();
        let wTags = await loadWTags();
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
    }

    const tagSelectHandler = (tags:WTag[]) => {
        console.log(tags);
        setFilterWTags(tags);
    }
    
    const setLessonLearnAgain = async (tlesson:TestLesson) => {
        const response = await TestCardTestLessonService.setTCardTLessonLearnAgain(tlesson);
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
        return testLesson.lessonTags?.map((item:LTag, i:number) => 
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
                                        className="btn btn-outline-primary mx-2" style={{width: 110}}>Update</Link>
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
                    <TagDropdownPanel wordTags={filterWTags} tags={allWTags} handler={tagSelectHandler}/>
                </Col>
            </Row>
        </Container>    
    );
};

export default TestLessonManagePanel;