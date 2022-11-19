import React, { useState, useEffect } from "react";
import WordCardService from "../services/WordCardService";
import LangService from "../../langs/services/LangService";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LangDropdown from "./LangDropdown";
import PictureFileService from "../services/PictureFileService";
import { useNavigate } from 'react-router-dom';
import WCardForm from "./WCardForm";

const EditWCardPanel = (props) => {

    const navigate = useNavigate();

    const [wcard, setWCard] = useState({
            "word": "",
            "transcript": "",
            "example": "",
    });
    const [langs, setLangs] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState({
        "id": 0,
        "shortName": "string",
        "fullName": "string"
    });
    const [pictureId, setPictureId] = useState();

    useEffect(() => {
        loadLanguages();
        loadWordCard();  
    }, []);

    const loadLanguages = async () => {
        const searchData = {
            "ids": [ 0 ],
            "shortName": "string",
            "fullName": "string"
          };
        const response = await LangService.searchLanguages(searchData);
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
        }
    }

    const handleSelectLanguage = (e) => {
      console.log(e);
      setSelectedLanguage(langs.find(item => item.id == e));
    }

    const fileSelectedHandler = (e) => {
        console.log("file selected");
        handleFileUpload(e.target.files[0]);
    }

    const handleFileUpload = async (file) => {
        const fData = new FormData();
        fData.append("picFile", file);
        const result = await PictureFileService.addPictureFile(fData);
        console.log("create picture file response:");
        console.log(result.data);
        setPictureId(result.data.id);
    }

    const updateWordCard = async (newWCard) => {
        newWCard.language = selectedLanguage;
        newWCard.pictureId = pictureId;
        const response = await WordCardService.updateWordCard(newWCard);
        console.log(response.data);
        navigate('/wcard');
    }

    return (
        <Container>
            <Row>
                <Col md={4} className="border">
                    {pictureId && <img src={PictureFileService.PICTURE_URL + "/" + pictureId}  width="100%"/>}
                    <div className="text-center">
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Picture for card</Form.Label>
                            <Form.Control type="file" onChange={fileSelectedHandler}/>
                        </Form.Group>
                    </div>
                </Col>
                <Col md={6} className="border p-4 ">
                    <h5 className="text-center m-4">Edit Word Card</h5>
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