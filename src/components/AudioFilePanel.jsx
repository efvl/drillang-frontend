import React from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";


const AudioFilePanel = ({soundUrl, onChangeHandler}) => {

    const [presound, setPresound] = useState();

    useEffect(() => {
        console.log(soundUrl);
      }, [presound]);

    const audioFileSelectedHandler = (e) => {
        soundUrl = null;
        setPresound(URL.createObjectURL(e.target.files[0]));   
        onChangeHandler(e.target.files[0]);
    }

    return (
        <Container>
            {presound 
                ? <audio controls autoPlay width="100%" src={presound}><source src={presound}></source></audio>
                : soundUrl && <audio controls autoPlay width="100%"><source src={soundUrl}></source></audio>
            }
            <div className="text-center">
                <Form.Group controlId="formFile2" className="mb-3">
                    <Form.Label>Audio for card</Form.Label>
                    <Form.Control type="file" onChange={audioFileSelectedHandler}/>
                </Form.Group>
            </div>
        </Container>    
    );

};

export default AudioFilePanel;