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

    const handleSelectLanguage = (e) => {
      console.log(e);
      setSelectedLanguage(langs.find(item => item.id == e));
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
            <h5 className="text-center m-4">{props.isEdit?'Edit':'Create'} Word Card</h5>
            <Row className="col-md-6 offset-md-3 border p-4">
                <Col className="col-8">Language: {selectedLanguage.fullName}</Col>
                <Col className="col-4">
                    <Dropdown onSelect={handleSelectLanguage}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Languages
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {langs.map((item, i) =>
                                <Dropdown.Item eventKey={item.id} key={i}>{item.fullName}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row className="col-md-6 offset-md-3 border rounded p-4 shadow">
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
                    <Button variant="outline-primary" type="submit" onClick={submitWordCard}>{props.isEdit?' Save ':' Add '} </Button>
                    <Link className="btn btn-outline-danger mx-2" to="/wcard">Cancel</Link>
                </Form>
            </Row>
        </Container>    
    );
};

export default WCardForm;