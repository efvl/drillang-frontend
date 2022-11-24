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

const EditTranslatePanel = (props) => {

    const [translate, setTranslate] = useState();
    const [langs, setLangs] = useState([]);
    const [word2Lang, setWord2Lang] = useState({
        "id": 0,
        "shortName": "string",
        "fullName": "string"
    });

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
                    <Row className="align-bottom">
                        <Col md={3} className="py-2">
                            <h5>{translate && translate.word1.language.fullName + ' :'}</h5>
                        </Col>
                        <Col md={9} className="text-success"> 
                            <h3>{translate && translate.word1.word}</h3>
                        </Col>
                    </Row>
                    <Container className="border p-4">
                        <Row>
                            <Col className="col-8">Language: {word2Lang ? word2Lang.fullName : ""}</Col>
                            <Col className="col-4">
                                <LangDropdown handler={handleSelectLanguage} langs={langs}/>
                            </Col>
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