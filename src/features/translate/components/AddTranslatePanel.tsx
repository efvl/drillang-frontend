import React, { useState, useEffect } from "react";
import WordCardService from "../../card/services/WordCardService";
import LangService from "../../langs/services/LangService";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LangDropdown from "../../card/components/LangDropdown";
import LessonDropdown from './LessonDropdown';
import PictureFileService from "../../card/services/PictureFileService";
import { useNavigate, useLocation } from 'react-router-dom';
import WCardForm from "../../card/components/WCardForm";
import TranslateService from "../services/TranslateServices";
import TranslateWLessonService from "../../lesson/services/TranslateWLessonService";
import LessonService from '../../lesson/services/WordLessonService';
import { Square, VolumeUp } from "react-bootstrap-icons";
import AudioFileService from "../../card/services/AudioFileService";
import AudioFilePanel from "../../../components/AudioFilePanel";
import { WCard } from "../../card/models/WCard";
import { Language } from "../../langs/models/Language";
import { Lesson } from "../../lesson/models/Lesson";

const AddTranslatePanel = (props) => {

    const [word1, setWord1] = useState<WCard>({});
    const [langs, setLangs] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>({});
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [selectedLesson, setSelectedLesson] = useState<Lesson>({});
    const [audioId, setAudioId] = useState<number>();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setWord1(location.state.word1);
        loadLanguages(location.state.word1.language);
        loadLessons(location.state.word1.language);
    }, []);

    const loadLanguages = async (lang:Language) => {
        const response = await LangService.searchLanguages({});
        if(response.data?.length > 0){
            let filteredLangs = response.data.filter(item => item.id != lang.id);
            setLangs(filteredLangs); 
            setSelectedLanguage(filteredLangs[0]); 
        }
    }

    const loadLessons = async (lang:Language) => {
        const response = await LessonService.getLessonsFromLang(lang.id);
        console.log(response.data);
        if(response.data?.length > 0){
            setLessons(response.data);
            setSelectedLesson(response.data[0]);
        }
    }

    const handleSelectLanguage = (e) => {
        setSelectedLanguage(langs.find(item => item.id == e));
    }

    const handleSelectLesson = (e) => {
        setSelectedLesson(lessons.find(item => item.id == e));
    }

    const createNewTranslation = async (newCard:WCard) => {
        newCard.language = selectedLanguage;
        newCard.pictureId = word1.pictureId;
        let newTranslation = {
            word1 : word1,
            word2 : newCard
        }
        const response = await TranslateService.addTranslate(newTranslation);
        console.log('add translate response: ');
        console.log(response.data);
        if(response.status == 200 && response.data.id && selectedLesson != null){
            let twl = {
                translate: { id: response.data.id },
                wordLesson: selectedLesson,
                targetAnswer: 3,
            }
            const response2 = await TranslateWLessonService.addTrWLesson(twl);
            console.log(response2);
        }
        navigate('/wcard');
    }

    const audioFileUploadHandler = async (file:File) => {
        const fData = new FormData();
        fData.append("audFile", file);
        const result = await AudioFileService.addAudioFile(fData);
        console.log("create audio file response:");
        console.log(result.data);
        setAudioId(result.data.id);
    }

    const cancelTranslation = (wordCard:WCard) => {
        navigate('/translate');
    }


    return (
        <Container className="mt-3">
            <Row className="border rounded py-2 row-cols-auto">
                <Col>
                    <h5>Lesson: </h5>
                </Col>
                <Col>
                    <LessonDropdown handler={handleSelectLesson} lessons={lessons}/>
                </Col>
                <Col>
                    <h5>{selectedLesson?.name}</h5>
                </Col>
            </Row>
            <Row className="py-2">
                <Col md={4} className="border">
                    {word1 && <img src={PictureFileService.PICTURE_URL + "/" + word1.pictureId}  width="100%"/>}
                </Col>
                <Col md={6}>
                    <Row className="row-cols-auto">
                        <Col className="py-2">
                            <h5>{word1 && word1.language.fullName + ' :'}</h5>
                        </Col>
                        <Col className="py-1">
                            <VolumeUp color="royalblue" size={36}></VolumeUp>
                        </Col>
                        <Col className="text-success">
                            <h3>{word1 && word1.word}</h3>
                        </Col>
                    </Row>
                    <Container className="border p-3">
                        <Row className="row-cols-auto">
                            <Col>
                                <LangDropdown handler={handleSelectLanguage} langs={langs}/>
                            </Col>
                            <Col>
                                <h5>Language: {selectedLanguage.fullName}</h5>
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <AudioFilePanel onChangeHandler={audioFileUploadHandler}></AudioFilePanel>
                        </Row>
                        <Row>
                            <WCardForm isEdit={false} submitAction={createNewTranslation} cancelAction={cancelTranslation}/>
                        </Row>
                    </Container>
                </Col>
                <Col></Col>
            </Row>
        </Container>    
    );
};

export default AddTranslatePanel;