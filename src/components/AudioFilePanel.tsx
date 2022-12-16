import React from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";

interface AudioFilePanelProps {
    soundUrl:string;
    onChangeHandler: (file: any) => void;
}

const AudioFilePanel = (props:AudioFilePanelProps) => {

    const [presound, setPresound] = useState<any>({});
    const [newSound, setNewSound] = useState<boolean>(false);

    useEffect(() => {
        console.log(props.soundUrl);
      }, [props]);

    const audioFileSelectedHandler = (e) => {
        setNewSound(true);
        setPresound(URL.createObjectURL(e.target.files[0]));   
        props.onChangeHandler(e.target.files[0]);
    }

    return (
        <Container>
            <div style={{ width: '100%'}}>
                {newSound && <div>new audio: <audio controls autoPlay src={presound}><source src={presound}></source></audio></div>}
                {props.soundUrl && <div>current audio: <audio controls autoPlay><source src={props.soundUrl}></source></audio></div>}
            </div>
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