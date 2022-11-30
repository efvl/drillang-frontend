import React, { useState, useEffect } from "react";
import WordCardService from "../../card/services/WordCardService";
import LangService from "../../langs/services/LangService";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LangDropdown from "../../card/components/LangDropdown";
import PictureFileService from "../../card/services/PictureFileService";
import { useNavigate, useLocation } from 'react-router-dom';
import WCardForm from "../../card/components/WCardForm";
import TranslateService from "../services/TranslateServices";
import { Square, VolumeUp } from "react-bootstrap-icons";
import AudioFileService from "../../card/services/AudioFileService";
import AudioFilePanel from "../../../components/AudioFilePanel";

const AddTranslatePanel = (props) => {

    const [word1, setWord1] = useState();
    const [langs, setLangs] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState({
        "id": 0,
        "shortName": "string",
        "fullName": "string"
    });
    const [audioId, setAudioId] = useState();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setWord1(location.state.word1);
        loadLanguages(location.state.word1.language);
    }, []);

    const loadLanguages = async (lang) => {
        const response = await LangService.searchLanguages();
        if(response.data?.length > 0){
            let filteredLangs = response.data.filter(item => item.id != lang.id);
            setLangs(filteredLangs); 
            setSelectedLanguage(filteredLangs[0]); 
        }
    }

    const handleSelectLanguage = (e) => {
        setSelectedLanguage(langs.find(item => item.id == e));
    }

    const createNewTranslation = async (newCard) => {
        newCard.language = selectedLanguage;
        newCard.pictureId = word1.pictureId;
        let newTranslation = {
            word1 : word1,
            word2 : newCard
        }
        const response = await TranslateService.addTranslate(newTranslation);
        console.log('add translate response: ');
        console.log(response.data);
        navigate('/translate');
    }

    const audioFileUploadHandler = async (file) => {
        const fData = new FormData();
        fData.append("audFile", file);
        const result = await AudioFileService.addAudioFile(fData);
        console.log("create audio file response:");
        console.log(result.data);
        setAudioId(result.data.id);
    }

    const cancelTranslation = (wordCard) => {
        navigate('/translate');
    }


    return (
        <Container className="mt-3">
            <Row>
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