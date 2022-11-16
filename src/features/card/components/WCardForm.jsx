import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WordCardService from "../services/WordCardService";
import LangService from "../../langs/services/LangService";
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LangDropdown from "./LangDropdown";
import Image from 'react-bootstrap/Image'

const WCardForm = (props) => {

    const [wcard, setWCard] = useState({
        "id": 0,
        "language": {
          "id": 0,
          "shortName": "string",
          "fullName": "string"
        },
        "word": "string",
        "transcript": "string",
        "example": "string",
    });
    const [langs, setLangs] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState({
        "id": 0,
        "shortName": "string",
        "fullName": "string"
    });
    const [selectedPicture, setSelectedPicture] = useState();

    const handleSelectLanguage = (e) => {
      console.log(e);
      setSelectedLanguage(langs.find(item => item.id == e));
    }

    const fileSelectedHandler = (e) => {
        console.log("file selected");
        setSelectedPicture(e.target.files[0])
    }

    const handleFileUploadHandler = () => {

    }


    const submitWordCard = (e) => {
        e.preventDefault();
        wcard.language = selectedLanguage;
        console.log(wcard);
        props.submitAction(wcard);
    }

    useEffect(() => {
        loadLanguages();
        if(props.isEdit){
            loadWordCard();  
        } 
    }, []);

    const loadWordCard = async () => {
        const result = await WordCardService.getWordCardById(props.wcardId);
        console.log(result.data);  
        setWCard(result.data);
        if(result.data) {
            setSelectedLanguage(result.data.language);
        }
    }

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

    return (
        <Container>
            <Row>
                <Col md={4} className="border">
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Default file input example</Form.Label>
                        <Form.Control type="file" onChange={fileSelectedHandler}/>
                    </Form.Group>
                </Col>
                <Col md={6} className="border p-4 ">
                    <h5 className="text-center m-4">{props.isEdit?'Edit':'Create'} Word Card</h5>
                    <Row>
                        <Col className="col-8">Language: {selectedLanguage.fullName}</Col>
                        <Col className="col-4">
                            <LangDropdown handler={handleSelectLanguage} langs={langs}/>
                        </Col>
                    </Row>
                    <Row>
                        <Form>
                            <Form.Group className="mb-3" controlId="word">
                                <Form.Label>Word</Form.Label>
                                <Form.Control type="text" 
                                    placeholder="Enter word"
                                    value={wcard.word}
                                    onChange={e => setWCard({...wcard, word: e.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="transcript">
                                <Form.Label>Transcription</Form.Label>
                                <Form.Control type="text" 
                                    placeholder="Enter word transcription"
                                    value={wcard.transcript}
                                    onChange={e => setWCard({...wcard, transcript: e.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="example">
                                <Form.Label>Example</Form.Label>
                                <Form.Control type="text" 
                                    placeholder="Enter example of word using"
                                    value={wcard.example}
                                    onChange={e => setWCard({...wcard, example: e.target.value})}/>
                            </Form.Group>
                            <div className="text-center">
                                <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitWordCard}>{props.isEdit?' Save ':' Add '} </Button>
                                <Link className="btn btn-outline-danger mx-2" style={{width: 150}} to="/wcard">Cancel</Link>
                            </div>
                        </Form>
                    </Row>
                </Col>
                <Col></Col>
            </Row>
        </Container>    
    );
};

export default WCardForm;