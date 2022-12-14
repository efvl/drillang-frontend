import React, { useState, useEffect } from "react";
import WordCardService from "../services/WordCardService";
import LangService from "../../langs/services/LangService";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LangDropdown from "./LangDropdown";
import PictureFileService from "../services/PictureFileService";
import AudioFileService from "../services/AudioFileService";
import { useNavigate } from 'react-router-dom';
import WCardForm from "./WCardForm";
import { VolumeUp } from "react-bootstrap-icons";
import PictureFilePanel from "../../../components/PictureFilePanel";
import AudioFilePanel from "../../../components/AudioFilePanel";
import { WCard } from "../models/WCard";
import { Language } from "../../langs/models/Language";

const AddWCardPanel = () => {

    const navigate = useNavigate();

    const [langs, setLangs] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>({});
    const [pictureId, setPictureId] = useState<number>();
    const [audioId, setAudioId] = useState<number>();

    useEffect(() => {
        loadLanguages();
    }, []);

    const loadLanguages = async () => {
        const response = await LangService.searchLanguages({});
        if(response.data?.length > 0){
            setLangs(response.data); 
            setSelectedLanguage(response.data[0]); 
        }
    }

    const handleSelectLanguage = (e:number) => {
      setSelectedLanguage(langs.find(item => item.id == e));
    }

    const pictureFileUploadHandler = async (file:File) => {
        const fData = new FormData();
        fData.append("picFile", file);
        const result = await PictureFileService.addPictureFile(fData);
        console.log("create picture file response:");
        console.log(result.data);
        setPictureId(result.data.id);
    }

    const audioFileUploadHandler = async (file:File) => {
        const fData = new FormData();
        fData.append("audFile", file);
        const result = await AudioFileService.addAudioFile(fData);
        setAudioId(result.data.id);
    }

    const createNewWordCard = async (newCard:WCard) => {
        newCard.language = selectedLanguage;
        newCard.pictureId = pictureId;
        newCard.audioId = audioId;
        const response = await WordCardService.createNewWordCard(newCard);
        navigate('/translate/add', { state: { word1: response.data }});
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4} className="border">
                    <PictureFilePanel onChangeHandler={pictureFileUploadHandler}></PictureFilePanel>
                    <AudioFilePanel onChangeHandler={audioFileUploadHandler} soundUrl={null}></AudioFilePanel>
                </Col>
                <Col md={6} className="border p-4 ">
                    <h5 className="text-center">Create Word Card</h5>
                    <Row>
                        <Col className="col-8">Language: {selectedLanguage?.fullName}</Col>
                        <Col className="col-4">
                            <LangDropdown handler={handleSelectLanguage} langs={langs}/>
                        </Col>
                    </Row>
                    <Row >
                        <VolumeUp color="royalblue" size={36}></VolumeUp>
                    </Row>
                    <Row>
                        <WCardForm isEdit={false} submitAction={createNewWordCard}/>
                    </Row>
                </Col>
                <Col></Col>
            </Row>
        </Container>    
    );
};

export default AddWCardPanel;