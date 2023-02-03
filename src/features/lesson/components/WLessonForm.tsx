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
import { Language } from "../../langs/models/Language";
import { Lesson } from "../models/Lesson";

interface WLessonFormProps {
    isEdit?:boolean;
    wlessonId?:number;
}

const WLessonForm = (props:WLessonFormProps) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [wlessonForm, setWLessonForm] = useState<Lesson>({ name: '', reverse: false, countDone: 1, countChars : 1 });
    const [fromLangs, setFromLangs] = useState<Language[]>([]);
    const [fromLabel, setFromLabel] = useState<string>('');
    const [fromSelectLang, setFromSelectLang] = useState<Language>({});
    const [toLangs, setToLangs] = useState<Language[]>([]);
    const [toLabel, setToLabel] = useState<string>('');
    const [toSelectLang, setToSelectLang] = useState<Language>({});

    useEffect(() => {
        if(props.isEdit){
            loadWLesson();
        }
        loadLanguages();
    }, []);

    const loadLanguages = async () => {
        const response = await LangService.searchLanguages({});
        if(response.data?.length > 0){
            setFromLangs(response.data);
            setToLangs(response.data); 
        }
    }

    const loadWLesson = async () => {
        const response = await WordLessonService.getWordLessonById(props.wlessonId);
        setWLessonForm(response.data);
        setFromSelectLang(response.data.fromLanguage);
        setFromLabel(response.data.fromLanguage.fullName);
        setToSelectLang(response.data.toLanguage);
        setToLabel(response.data.toLanguage.fullName);
    }

    const handleFromSelectLanguage = (e) => {
        let fromSelect = fromLangs.find(item => item.id == e);
        setFromSelectLang(fromSelect);
        setFromLabel(fromSelect.fullName);
    }

    const handleToSelectLanguage = (e) => {
        let toSelect = toLangs.find(item => item.id == e);
        setToSelectLang(toSelect);
        setToLabel(toSelect.fullName);
    }

    const submitWordLesson = async (e) => {
        e.preventDefault();
        if(isEmpty(fromSelectLang) || isEmpty(toSelectLang)){
            console.log('from or to lang is null');
            return false;
        }
        if(fromSelectLang.id == toSelectLang.id){
            console.log('from == to langs');
            return false;
        }
        wlessonForm.fromLanguage = fromSelectLang;
        wlessonForm.toLanguage = toSelectLang;
        const response = await WordLessonService.addWordLesson(wlessonForm);
        console.log(response.data);
        if(location.state?.prevPath) {
            navigate(location.state.prevPath);
        } else {
            navigate('/wlesson');
        }
    }

    const cancelAction = async (e) => {
        e.preventDefault();
        if(location.state.prevPath) {
            navigate(location.state.prevPath);
        } else {
            navigate('/wlesson');
        }
    }

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    const handleCountDoneChange = event => {
        const result = event.target.value.replace(/\D/g, '');
        setWLessonForm({...wlessonForm, countDone: result});
    };

    const handleCountCharsChange = event => {
        const result = event.target.value.replace(/\D/g, '');
        setWLessonForm({...wlessonForm, countChars: result});
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md={3}></Col>
                <Col md={6} className="border rounded pt-3">
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="name">
                        <Form.Label column sm="3">Name : </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" 
                                placeholder="Enter name"
                                value={wlessonForm.name}
                                onChange={e => setWLessonForm({...wlessonForm, name: e.target.value})}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="fromLang">
                        <Form.Label column sm="3">From language : </Form.Label>
                        <Col sm="9" className="pt-2">
                            <InputGroup className="mb-3">
                                <LangDropdown handler={handleFromSelectLanguage} langs={fromLangs}/>
                                <Form.Control placeholder="Select language" aria-disabled
                                    value={fromLabel}
                                    onChange={e => setFromLabel(fromSelectLang.fullName)} />
                            </InputGroup> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="toLang">
                        <Form.Label column sm="3">To language : </Form.Label>
                        <Col sm="9" className="pt-2">
                            <InputGroup className="mb-3">
                                <LangDropdown handler={handleToSelectLanguage} langs={toLangs}/>
                                <Form.Control placeholder="Select language" aria-disabled
                                    value={toLabel}
                                    onChange={e => setToLabel(toSelectLang.fullName)} />
                            </InputGroup> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="isReverse">
                        <Form.Label column sm="3">Reverse : </Form.Label>
                        <Col sm="9" className="pt-2">
                            <Form.Check type='checkbox' 
                                    checked={wlessonForm?.reverse} 
                                    onChange={e => setWLessonForm({...wlessonForm, reverse: e.target.checked})}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="counDone">
                        <Form.Label column sm="3">Count done : </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text"
                                placeholder="Enter count that should be done"
                                value={wlessonForm.countDone}
                                onChange={handleCountDoneChange}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="countChars">
                        <Form.Label column sm="3">Count chars : </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text"
                                placeholder="Enter minimum count chars that need to check answer"
                                value={wlessonForm.countChars}
                                onChange={handleCountCharsChange}/>
                        </Col>
                    </Form.Group>
                    <div className="text-center p-2">
                        <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitWordLesson}> Save </Button>
                        <Link className="btn btn-outline-danger mx-2" style={{ width: 150 }} onClick={cancelAction} to={""}>Cancel</Link>
                    </div>
                </Form>
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>    
    );
};

export default WLessonForm;