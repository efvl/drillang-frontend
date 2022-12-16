import React, { MouseEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { WCard } from "../models/WCard";


interface WCardFormProps {
    wordcard?:WCard,
    submitAction?:(wcard:WCard) => void,
    isEdit?:boolean,
}

const WCardForm = (props:WCardFormProps) => {

    const [wcardForm, setWcardForm] = useState<WCard>({word:'', transcript:'', example:''});

    const submitWordCard = (e) => {
        e.preventDefault();
        props.submitAction(wcardForm);
    }

    useEffect(() => {
        if(props.isEdit){
            setWcardForm(props.wordcard);
        }
    }, [props]);

    return (
        <Form>
            <Form.Group className="mb-3" controlId="word">
                <Form.Label>Word</Form.Label>
                <Form.Control type="text" 
                    placeholder="Enter word"
                    value={wcardForm?.word}
                    onChange={e => setWcardForm({...wcardForm, word: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="transcript">
                <Form.Label>Transcription</Form.Label>
                <Form.Control type="text" 
                    placeholder="Enter word transcription"
                    value={wcardForm?.transcript}
                    onChange={e => setWcardForm({...wcardForm, transcript: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="example">
                <Form.Label>Example</Form.Label>
                <Form.Control type="text" 
                    placeholder="Enter example of word using"
                    value={wcardForm?.example}
                    onChange={e => setWcardForm({...wcardForm, example: e.target.value})}/>
            </Form.Group>
            <div className="text-center p-2">
                <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitWordCard}> Save </Button>
                <Link className="btn btn-outline-danger mx-2" style={{width: 150}} to="/wcard">Cancel</Link>
            </div>
        </Form>
    );
};

export default WCardForm;