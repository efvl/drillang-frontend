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
import PictureFilePanel from "../../../components/PictureFilePanel";
import AudioFilePanel from "../../../components/AudioFilePanel";
import { WCard } from "../models/WCard";
import { Language } from "../../langs/models/Language";

interface EditWCardPanelProps {
    wcardId?:number;
}

const EditWCardPanel = (props:EditWCardPanelProps) => {

    const navigate = useNavigate();

    const [wcard, setWCard] = useState<WCard>({});
    const [langs, setLangs] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>({});
    const [pictureId, setPictureId] = useState<number>();
    const [audioId, setAudioId] = useState<number>();

    useEffect(() => {
        loadLanguages();
        loadWordCard();  
    }, []);

    const loadLanguages = async () => {
        const response = await LangService.searchLanguages({});
        if(response.data?.length > 0){
            setLangs(response.data); 
            setSelectedLanguage(response.data[0]); 
        }
    }

    const loadWordCard = async () => {
        const result = await WordCardService.getWordCardById(props.wcardId);
        console.log(result.data);  
        setWCard(result.data);
        if(result.data) {
            setSelectedLanguage(result.data.language);
            setPictureId(result.data.pictureId);
            setAudioId(result.data.audioId);
        }
    }

    const handleSelectLanguage = (e) => {
      console.log(e);
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
        console.log("create audio file response:");
        console.log(result.data);
        setAudioId(result.data.id);
    }

    const updateWordCard = async (newWCard:WCard) => {
        newWCard.language = selectedLanguage;
        newWCard.pictureId = pictureId;
        newWCard.audioId = audioId;
        const response = await WordCardService.updateWordCard(newWCard);
        console.log(response.data);
        navigate('/wcard');
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4} className="border">
                    <PictureFilePanel pictureUrl={pictureId? PictureFileService.PICTURE_URL + "/" + pictureId : null} 
                                    onChangeHandler={pictureFileUploadHandler}>
                    </PictureFilePanel>
                    <AudioFilePanel soundUrl={audioId? AudioFileService.AUDIO_URL + "/" + audioId : null}
                                    onChangeHandler={audioFileUploadHandler}>
                    </AudioFilePanel>
                </Col>
                <Col md={6} className="border p-4 ">
                    <h5 className="text-center">Edit Word Card</h5>
                    <Row>
                        <Col className="col-8">Language: {selectedLanguage.fullName}</Col>
                        <Col className="col-4">
                            <LangDropdown handler={handleSelectLanguage} langs={langs}/>
                        </Col>
                    </Row>
                    <Row>
                        <WCardForm isEdit={true} submitAction={updateWordCard} wordcard={wcard}/>
                    </Row>
                </Col>
                <Col></Col>
            </Row>
        </Container>    
    );
};

export default EditWCardPanel;