import React, { useState, useEffect, useCallback } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PictureFileService from "../../card/services/PictureFileService";
import { Link, useNavigate } from 'react-router-dom';
import { VolumeUp } from "react-bootstrap-icons";
import PictureFilePanel from "../../../components/PictureFilePanel";
import TestCardService from "../services/TestCardService";
import { TCard } from "../models/TCard";
import TCardForm from "./TCardForm";
import { SourceInfo } from "../../srcinfo/models/SourceInfo";
import { SourceInfoSearchRequest } from "../../srcinfo/models/SourceInfoSearchRequest";
import SourceInfoService from "../../srcinfo/services/SourceInfoService";
import PaginationBar from "../../../components/PaginationBar";
import SourcesForTCardTable from "../../srcinfo/components/SourcesForTCardTable";
import { Accordion, Button } from "react-bootstrap";
import SourceInfoActionBar from "../../srcinfo/components/SourceInfoActionBar";
import { TCardSourceInfo } from "../models/TCardSourceInfo";
import { WTag } from "../../tags/models/WTag";
import TagService from "../../tags/services/TagService";
import TagDropdownPanel from "../../card/components/TagDropdownPanel";
import TCardSourceInfoTable from "./TCardSourceInfoTable";

const AddTCardPanel = () => {

    const navigate = useNavigate();

    const [sourceInfos, setSourceInfos] = useState<SourceInfo[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(5);
    const [searchRequest, setSearchRequest] = useState<SourceInfoSearchRequest>({curNumPage:0, sizeOfPage:10});
    const [pictureId, setPictureId] = useState<number>();
    const [codePart, setCodePart] = useState<string>('');
    const [tcardSources, setTCardSources] = useState<TCardSourceInfo[]>([]);
    const [tcardForm, setTcardForm] = useState<TCard>({question:'', answer:'', codePart:'', tags:[]});
    const [allTags, setAllTags] = useState<WTag[]>([]);

    useEffect(() => {
        fetchSourceInfos(searchRequest);
        selectTags();
    }, []);

    const fetchSourceInfos = async (searchData:SourceInfoSearchRequest) => {
        console.log(searchData);  
        const response = await SourceInfoService.searchSourceInfos(searchData);
        console.log(response.data);
        setSourceInfos(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
    }

    const handleChangePage = useCallback((page:number) => {
        console.log(page);
        setSearchRequest({...searchRequest, curNumPage : page}); 
    }, []);

    const pictureFileUploadHandler = async (file:File) => {
        const fData = new FormData();
        fData.append("picFile", file);
        const result = await PictureFileService.addPictureFile(fData);
        console.log("create picture file response:");
        console.log(result.data);
        setPictureId(result.data.id);
    }

    const createNewTestCard = async (e) => {
        e.preventDefault();
        tcardForm.pictureId = pictureId;
        tcardForm.codePart = codePart;
        tcardForm.sources = tcardSources;
        console.log(tcardForm);
        const response = await TestCardService.createNewTestCard(tcardForm);
        navigate('/tcard');
    }

    const addSourceToCard = async (sInfo:SourceInfo) => {
        if(tcardSources.find(s => s.sourceInfo.id == sInfo.id)){
            console.log(sInfo.name + ' already in sources')
        } else {
            setTCardSources([...tcardSources, ...[{sourceInfo:sInfo}]]);
        }
    }

    const deleteSourceHandler = async (id:number) => {
        console.log(id);
        setTCardSources(tcardSources.filter(s => s.sourceInfo.id != id));
    }

    const updateSourceHandler = async (tcsi:TCardSourceInfo) => {
        let updArray = tcardSources.filter(s => s.sourceInfo.id != tcsi.sourceInfo.id);
        updArray.push(tcsi);
        setTCardSources(updArray);
        console.log(tcsi);
    }

    const handleChangeFilter = async (name:string, authors:string) => {
        console.log('handleChangeFilter');
        let filter = { ...searchRequest, 
            name : name,
            authors : authors,
            curNumPage : 0,
        } as SourceInfoSearchRequest;
        setSearchRequest(filter);
        fetchSourceInfos(filter);
    }

    const selectTags = async () => {
        const response = await TagService.searchTags({});
        console.log(response.data);
        setAllTags(response.data);
    }

    const tagSelectHandler = (tags:WTag[]) => {
        console.log(tags);
        setTcardForm({...tcardForm, tags:tags});
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col><h5 className="text-center">Create Test Card</h5></Col>
            </Row>
            <Row>
                <Col className="border p-4">
                <Form>
                    <Form.Group className="mb-3" controlId="question">
                        <Form.Label>Question</Form.Label>
                        <Form.Control as="textarea" rows={5} 
                            placeholder="Enter question"
                            value={tcardForm?.question}
                            onChange={e => setTcardForm({...tcardForm, question: e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="answer">
                        <Form.Label>Answer</Form.Label>
                        <Form.Control as="textarea" rows={5} 
                            placeholder="Enter answer"
                            value={tcardForm?.answer}
                            onChange={e => setTcardForm({...tcardForm, answer: e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="sourcesField">
                        <Form.Label>Sources</Form.Label>
                        <TCardSourceInfoTable cardSources={tcardSources} delete={deleteSourceHandler} update={updateSourceHandler}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="tagsField">
                        <Form.Label>Tags</Form.Label>
                        <TagDropdownPanel wordTags={tcardForm.tags} tags={allTags} handler={tagSelectHandler}/>
                    </Form.Group>
                    <div className="text-center p-2">
                        <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={createNewTestCard}> Save </Button>
                        <Link className="btn btn-outline-danger mx-2" style={{width: 150}} to="/tcard">Cancel</Link>
                    </div>
                </Form>
                </Col>
            </Row>
            <Row>
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Sources for Card</Accordion.Header>
                        <Accordion.Body>
                            <Container>
                            <Row>
                                <SourceInfoActionBar onChangeFilter={handleChangeFilter}/>
                                <SourcesForTCardTable srcInfos={sourceInfos} addToCard={addSourceToCard}/>
                                <PaginationBar currentPage={currentPage} totalPages={totalPages} onChangePage={handleChangePage}/>
                            </Row>
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Picture for Card</Accordion.Header>
                        <Accordion.Body>
                            <Container>
                                <Row>
                                    <Col></Col>
                                    <Col md={4}>
                                        <PictureFilePanel onChangeHandler={pictureFileUploadHandler}></PictureFilePanel>
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Code part</Accordion.Header>
                        <Accordion.Body>
                            <Form.Group className="mb-3" controlId="codepart">
                            <Form.Control as="textarea" rows={5} 
                                placeholder="Enter code part"
                                value={codePart}
                                onChange={e => setCodePart(e.target.value)}/>
                            </Form.Group>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>
        </Container>    
    );
};

export default AddTCardPanel;