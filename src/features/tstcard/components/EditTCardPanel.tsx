import React, { useState, useEffect, useCallback } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PictureFileService from "../../card/services/PictureFileService";
import { Link, useNavigate } from 'react-router-dom';
import PictureFilePanel from "../../../components/PictureFilePanel";
import { TCard } from "../models/TCard";
import TestCardService from "../services/TestCardService";
import TCardForm from "./TCardForm";
import { Accordion, Button } from "react-bootstrap";
import SourceInfoActionBar from "../../srcinfo/components/SourceInfoActionBar";
import SourcesForTCardTable from "../../srcinfo/components/SourcesForTCardTable";
import PaginationBar from "../../../components/PaginationBar";
import { SourceInfoSearchRequest } from "../../srcinfo/models/SourceInfoSearchRequest";
import { TCardSourceInfo } from "../models/TCardSourceInfo";
import { WTag } from "../../tags/models/WTag";
import { SourceInfo } from "../../srcinfo/models/SourceInfo";
import SourceInfoService from "../../srcinfo/services/SourceInfoService";
import TagService from "../../tags/services/TagService";
import TCardSourceInfoTable from "./TCardSourceInfoTable";
import TagDropdownPanel from "../../card/components/TagDropdownPanel";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TCardEditor from "./TCardEditor";

interface EditTCardPanelProps {
    tcardId?:number;
}

const EditTCardPanel = (props:EditTCardPanelProps) => {

    const navigate = useNavigate();

    const [tcardForm, setTcardForm] = useState<TCard>({question:'', answer:'', codePart:'', tags:[]});
    const [pictureId, setPictureId] = useState<number>(0);
    const [codePart, setCodePart] = useState<string>('');
    const [tcardSources, setTCardSources] = useState<TCardSourceInfo[]>([]);
    const [stackSources, setStackSources] = useState<TCardSourceInfo[]>([]);

    const [sourceInfos, setSourceInfos] = useState<SourceInfo[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(5);
    const [searchRequest, setSearchRequest] = useState<SourceInfoSearchRequest>({curNumPage:0, sizeOfPage:10});
    const [allTags, setAllTags] = useState<WTag[]>([]);

    useEffect(() => {
        loadTestCard(); 
        fetchSourceInfos(searchRequest);
        selectTags(); 
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: tcardForm.editorContent,
    });

    useEffect(() => {
        editor?.commands.setContent(tcardForm.editorContent);
      }, [tcardForm.editorContent]);

    const loadTestCard = async () => {
        let result = await TestCardService.getTestCardById(props.tcardId);
        console.log(result.data);  
        if(result.data) {
            setTcardForm(result.data);
            setPictureId(result.data.pictureId);
            setCodePart(result.data.codePart);
            setTCardSources(result.data.sources);
        }
    }

    const selectTags = async () => {
        const response = await TagService.searchTags({});
        console.log(response.data);
        setAllTags(response.data);
    }

    const pictureFileUploadHandler = async (file:File) => {
        const fData = new FormData();
        fData.append("picFile", file);
        const result = await PictureFileService.addPictureFile(fData);
        console.log("create picture file response:");
        console.log(result.data);
        setPictureId(result.data.id);
    }

// sources panel
    const fetchSourceInfos = async (searchData:SourceInfoSearchRequest) => {
        console.log(searchData);  
        const response = await SourceInfoService.searchSourceInfos(searchData);
        console.log(response.data);
        setSourceInfos(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
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

    const addSourceToCard = async (sInfo:SourceInfo) => {
        let found:TCardSourceInfo = tcardSources.find(s => s.sourceInfo.id == sInfo.id);
        if(found){
            console.log(sInfo.name + ' already in sources')
        } else {
            let i = stackSources.findIndex(s => s.sourceInfo.id == sInfo.id);
            if(i >= 0){
                let deleted = stackSources.splice(i, 1);
                setTCardSources([...tcardSources, ...deleted]);
                setStackSources(stackSources);
            } else {
                setTCardSources([...tcardSources, ...[{sourceInfo:sInfo}]]);
            }
        }
    }

    const handleChangePage = useCallback((page:number) => {
        console.log(page);
        setSearchRequest({...searchRequest, curNumPage : page}); 
    }, []);

// 
    const updateTestCard = async (e) => {
        e.preventDefault();
        tcardForm.pictureId = pictureId;
        tcardForm.codePart = codePart;
        tcardForm.sources = tcardSources;
        tcardForm.editorContent = editor.getHTML();
        const response = await TestCardService.updateTestCard(tcardForm);
        console.log(response.data);
        navigate('/tcard');
    }

    const deleteSourceHandler = async (id:number) => {
        let i = tcardSources.findIndex(s => s.sourceInfo.id == id);
        if(i >= 0){
            let deleted = tcardSources.splice(i, 1);
            setStackSources([...stackSources, ...deleted]);
        }
        setTCardSources(tcardSources);
    }

    const updateSourceHandler = async (tcsi:TCardSourceInfo) => {
        let i = tcardSources.findIndex(s => s.sourceInfo.id == tcsi.sourceInfo.id);
        console.log(tcsi);
        if(i >= 0){
            setTCardSources([...tcardSources.slice(0, i), tcsi, ...tcardSources.slice(i + 1)]);
        }
    }

    const tagSelectHandler = (tags:WTag[]) => {
        console.log(tags);
        setTcardForm({...tcardForm, tags:tags});
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col><h5 className="text-center">Edit Test Card</h5></Col>
            </Row>
            <Row>
                <Col className="p-0">
                <Form>
                    <Form.Group className="mb-2" controlId="question">
                        <Form.Label>Question :</Form.Label>
                        <Form.Control as="textarea" rows={2} 
                            placeholder="Enter question"
                            value={tcardForm?.question}
                            onChange={e => setTcardForm({...tcardForm, question: e.target.value})}/>
                    </Form.Group>
                    <TCardEditor isEdit={true} editor={editor} tcardForm={tcardForm}/>
                    <Form.Group className="mb-2" controlId="answer">
                        <Form.Label>Answer :</Form.Label>
                        <Form.Control as="textarea" rows={6} 
                            placeholder="Enter answer"
                            value={tcardForm?.answer}
                            onChange={e => setTcardForm({...tcardForm, answer: e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="sourcesField">
                        <Form.Label>Sources :</Form.Label>
                        <TCardSourceInfoTable cardSources={tcardSources} delete={deleteSourceHandler} update={updateSourceHandler}/>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="tagsField">
                        <Form.Label>Tags :</Form.Label>
                        <TagDropdownPanel wordTags={tcardForm.tags} tags={allTags} handler={tagSelectHandler}/>
                    </Form.Group>
                    <div className="text-center p-2">
                        <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={updateTestCard}> Save </Button>
                        <Link className="btn btn-outline-danger mx-2" style={{width: 150}} to="/tcard">Cancel</Link>
                    </div>
                </Form>
                </Col>
            </Row>
            <Row>
                <Accordion defaultActiveKey={['0']} alwaysOpen className="px-0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Sources for Card</Accordion.Header>
                        <Accordion.Body className="px-0">
                            <Container className="px-0">
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
                                        {pictureId
                                            ? <PictureFilePanel pictureUrl={pictureId? PictureFileService.PICTURE_URL + "/" + pictureId : null} 
                                                    onChangeHandler={pictureFileUploadHandler}></PictureFilePanel>
                                            : <PictureFilePanel pictureUrl={null} onChangeHandler={pictureFileUploadHandler}></PictureFilePanel>
                                        }
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Code part</Accordion.Header>
                        <Accordion.Body>
                            <Form.Group className="mb-2" controlId="codepart">
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

export default EditTCardPanel;