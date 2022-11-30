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

const EditTranslatePanel = (props) => {

    const [translate, setTranslate] = useState();
    const [langs, setLangs] = useState([]);
    const [word2Lang, setWord2Lang] = useState({
        "id": 0,
        "shortName": "string",
        "fullName": "string"
    });
    const [audioId, setAudioId] = useState();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        loadTranslation();
    }, []);

    const loadTranslation = async () => {
        console.log(props.translateId);
        const response = await TranslateService.getTranslateById(props.translateId)
        console.log(response.data);  
        setTranslate(response.data);
        let lang1 = response.data.word1.language;
        let lang2 = response.data.word2.language;
        setWord2Lang(lang2); 
        if(response.data) {
            const responseLang = await LangService.searchLanguages();
            console.log(responseLang.data);
            let filteredLangs = responseLang.data.filter(item => item.id != lang1.id);
            setLangs(filteredLangs); 
        }
    }

    const loadLanguages = async (lang1, lang2) => {
        const response = await LangService.searchLanguages();
        if(response.data?.length > 0){
            let filteredLangs = response.data.filter(item => item.id != lang1.id);
            setLangs(filteredLangs);  
            setWord2Lang(lang2); 
        }
    }

    const handleSelectLanguage = (e) => {
        setWord2Lang(langs.find(item => item.id == e));
    }

    const updateTranslation = async (newCard) => {
        console.log(newCard);
        newCard.language = word2Lang;
        translate.word2 = newCard;
        const response = await TranslateService.updateTranslate(translate);
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
                    {translate && <img src={PictureFileService.PICTURE_URL + "/" + translate.word1.pictureId}  width="100%"/>}
                </Col>
                <Col md={6}>
                    <Row className="row-cols-auto">
                        <Col className="py-2">
                            <h5>{translate && translate.word1.language.fullName + ' :'}</h5>
                        </Col>
                        <Col className="pt-1">
                            <VolumeUp color="royalblue" size={36}></VolumeUp>
                        </Col>
                        <Col className="text-success"> 
                            <h3>{translate && translate.word1.word}</h3>
                        </Col>
                    </Row>
                    <Container className="border p-3">
                        <Row className="row-cols-auto">
                            <Col>
                                <LangDropdown handler={handleSelectLanguage} langs={langs}/>
                            </Col>
                            <Col><h5>Language: {word2Lang ? word2Lang.fullName : ""}</h5></Col>
                        </Row>
                        <Row className="pt-3">
                            <AudioFilePanel onChangeHandler={audioFileUploadHandler}></AudioFilePanel>
                        </Row>
                        <Row>
                            {translate && <WCardForm isEdit={true} wordcard={translate.word2} submitAction={updateTranslation} cancelAction={cancelTranslation}/>}
                        </Row>
                    </Container>
                </Col>
                <Col></Col>
            </Row>
        </Container>    
    );
};

export default EditTranslatePanel;