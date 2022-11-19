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

const AddWCardPanel = () => {

    const navigate = useNavigate();

    const [langs, setLangs] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState({
        "id": 0,
        "shortName": "string",
        "fullName": "string"
    });
    const [preview, setPreview] = useState();
    const [pictureId, setPictureId] = useState();

    useEffect(() => {
        loadLanguages();
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

    const handleSelectLanguage = (e) => {
      setSelectedLanguage(langs.find(item => item.id == e));
    }

    const fileSelectedHandler = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]));   
        handleFileUploadHandler(e.target.files[0]);
    }

    const handleFileUploadHandler = async (file) => {
        const fData = new FormData();
        fData.append("picFile", file);
        const result = await PictureFileService.addPictureFile(fData);
        console.log("create picture file response:");
        console.log(result.data);
        setPictureId(result.data.id);
    }

    const createNewWordCard = async (newCard) => {
        newCard.language = selectedLanguage;
        newCard.pictureId = pictureId;
        const response = await WordCardService.createNewWordCard(newCard);
        console.log('add word card response: ');
        console.log(response.data);
        navigate('/wcard');
    }

    return (
        <Container>
            <Row>
                <Col md={4} className="border">
                    {preview &&  <img src={preview}  width="100%"/> }
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Picture for card</Form.Label>
                        <Form.Control type="file" onChange={fileSelectedHandler}/>
                    </Form.Group>
                </Col>
                <Col md={6} className="border p-4 ">
                    <h5 className="text-center m-4">Create Word Card</h5>
                    <Row>
                        <Col className="col-8">Language: {selectedLanguage.fullName}</Col>
                        <Col className="col-4">
                            <LangDropdown handler={handleSelectLanguage} langs={langs}/>
                        </Col>
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