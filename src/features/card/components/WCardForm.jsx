import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const WCardForm = (props) => {

    const [wcardForm, setWcardForm] = useState({
        word: "",
        transcript: "",
        example:""
    });

    const submitWordCard = (e) => {
        e.preventDefault();
        props.submitAction(wcardForm);
    }

    const cancelWordCard = (e) => {
        e.preventDefault();
        props.cancelAction(wcardForm);
    }

    useEffect(() => {
        console.log(props);
        if(props.isEdit){
            setWcardForm(props.wordcard);
        }
    }, [props.wordcard]);

    return (
        <Form>
            <Form.Group className="mb-3" controlId="word">
                <Form.Label>Word</Form.Label>
                <Form.Control type="text" 
                    placeholder="Enter word"
                    value={wcardForm.word}
                    onChange={e => setWcardForm({...wcardForm, word: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="transcript">
                <Form.Label>Transcription</Form.Label>
                <Form.Control type="text" 
                    placeholder="Enter word transcription"
                    value={wcardForm.transcript}
                    onChange={e => setWcardForm({...wcardForm, transcript: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="example">
                <Form.Label>Example</Form.Label>
                <Form.Control type="text" 
                    placeholder="Enter example of word using"
                    value={wcardForm.example}
                    onChange={e => setWcardForm({...wcardForm, example: e.target.value})}/>
            </Form.Group>
            <div className="text-center p-2">
                <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitWordCard}> Save </Button>
                {props.cancelAction
                    ? <Button variant="outline-danger mx-2" style={{width: 150}} type="submit" onClick={cancelWordCard}> Cancel </Button>
                    : <Link className="btn btn-outline-danger mx-2" style={{width: 150}} to="/wcard">Cancel</Link>
                }
            </div>
        </Form>
    );
};

export default WCardForm;