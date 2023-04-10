import React, { MouseEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { WCard } from "../models/WCard";
import TagDropdownPanel from "./TagDropdownPanel";
import { WTag } from "../../tags/models/WTag";
import TagService from "../../tags/services/TagService";

interface WCardFormProps {
    wordcard?:WCard,
    submitAction?:(wcard:WCard) => void,
    isEdit?:boolean,
    cancelAction?:(wcard:WCard) => void;
}

const WCardForm = (props:WCardFormProps) => {

    const [wcardForm, setWcardForm] = useState<WCard>({word:'', transcript:'', example:'', tags:[]});
    const [allTags, setAllTags] = useState<WTag[]>([]);

    useEffect(() => {
        console.log(props.wordcard);
        if(props.isEdit){
            setWcardForm(props.wordcard);
        } 
        selectTags();
    }, [props]);

    const submitWordCard = (e) => {
        e.preventDefault();
        props.submitAction(wcardForm);
    }

    const selectTags = async () => {
        const response = await TagService.searchTags({});
        console.log(response.data);
        setAllTags(response.data);
    }

    const tagSelectHandler = (tags:WTag[]) => {
        console.log(tags);
        setWcardForm({...wcardForm, tags:tags});
    }

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
                <Form.Control as="textarea" rows={5} 
                    placeholder="Enter example of word using"
                    value={wcardForm?.example}
                    onChange={e => setWcardForm({...wcardForm, example: e.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="tagsField">
                <Form.Label>Tags</Form.Label>
                <TagDropdownPanel wordTags={wcardForm?.tags} tags={allTags} handler={tagSelectHandler}/>
            </Form.Group>
            <div className="text-center p-2">
                <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitWordCard}> Save </Button>
                <Link className="btn btn-outline-danger mx-2" style={{width: 150}} to="/wcard">Cancel</Link>
            </div>
        </Form>
    );
};

export default WCardForm;