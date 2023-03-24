import React, { MouseEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TagDropdownPanel from "../../card/components/TagDropdownPanel";
import { WTag } from "../../tags/models/WTag";
import TagService from "../../tags/services/TagService";
import { TCard } from "../models/TCard";
import TCardSourceInfoTable from "./TCardSourceInfoTable";
import { TCardSourceInfo } from "../models/TCardSourceInfo";

interface TCardFormProps {
    testcard?:TCard,
    submitAction?:(tcard:TCard) => void,
    isEdit?:boolean,
    cancelAction?:(tcard:TCard) => void;
}

const TCardForm = (props:TCardFormProps) => {

    const [tcardForm, setTcardForm] = useState<TCard>({question:'', answer:'', codePart:'', tags:[]});
    const [allTags, setAllTags] = useState<WTag[]>([]);

    useEffect(() => {
        console.log(props.testcard);
        if(props.isEdit){
            setTcardForm(props.testcard);
        } 
        selectTags();
    }, []);

    const submitTestCard = (e) => {
        e.preventDefault();
        props.submitAction(tcardForm);
    }

    const selectTags = async () => {
        const response = await TagService.searchTags({});
        console.log(response.data);
        setAllTags(response.data);
    }

    const tagSelectHandler = (tags:WTag[]) => {
        console.log(tags);
        setTcardForm({...tcardForm, tags:tags});
    }


    const deleteSourceHandler = (id:number) => {
        console.log('delete tcard source info ' + id);
    }

    const updateSourceHandler = (tcsi:TCardSourceInfo) => {
        console.log('update tcard source info ' + tcsi.timePage);
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="question">
                <Form.Label>Question</Form.Label>
                <Form.Control as="textarea" rows={5} 
                    placeholder="Enter question"
                    value={tcardForm?.question}
                    onChange={e => setTcardForm({...tcardForm, question: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="answer">
                <Form.Label>Answer</Form.Label>
                <Form.Control as="textarea" rows={5} 
                    placeholder="Enter answer"
                    value={tcardForm?.answer}
                    onChange={e => setTcardForm({...tcardForm, answer: e.target.value})}/>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="sourcesField">
                <Form.Label>Sources</Form.Label>
                <TCardSourceInfoTable cardSources={tcardForm?.sources} delete={deleteSourceHandler} update={updateSourceHandler}/>
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="tagsField">
                <Form.Label>Tags</Form.Label>
                <TagDropdownPanel wordTags={tcardForm.tags} tags={allTags} handler={tagSelectHandler}/>
            </Form.Group>
            <div className="text-center p-2">
                <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitTestCard}> Save </Button>
                <Link className="btn btn-outline-danger mx-2" style={{width: 150}} to="/tcard">Cancel</Link>
            </div>
        </Form>
    );
};

export default TCardForm;