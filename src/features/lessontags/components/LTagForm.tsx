import React, { useState, useEffect, MouseEvent } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { LTag } from "../models/LTag";
import LTagService from "../services/LTagService";

interface LTagFormProps {
    submitAction?:(ltag:LTag) => void;
    isEdit?:boolean;
    tagId?:number;
}

const LTagForm = (props:LTagFormProps) => {

    const [ltag, setLTag] = useState<LTag>({ name:'', description:''});

    const submitTag = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.submitAction(ltag);
    }

    useEffect(() => {
        if(props.isEdit){
            loadLTag();
        }
    }, []);

    const loadLTag = async () => {
        const result = await LTagService.getLTagById(props.tagId);
        console.log(result.data);
        setLTag(result.data);
    }

    return (
        <Container>
            <Row>
                <Col className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h5 className="text-center m-4">{props.isEdit?'Edit':'Create'} Tag</h5>
                    <Form>
                        <Form.Group className="mb-3" controlId="tagName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" 
                                placeholder="Enter lesson tag name"
                                value={ltag?.name}
                                onChange={e => setLTag({...ltag, name: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" 
                                placeholder="Enter lesson description name"
                                value={ltag?.description}
                                onChange={e => setLTag({...ltag, description: e.target.value})}/>
                        </Form.Group>
                        <Button variant="outline-primary" type="submit" onClick={(e) => submitTag(e)}>{props.isEdit?' Save ':' Add '} </Button>
                        <Link className="btn btn-outline-danger mx-2" to="/ltags">Cancel</Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LTagForm;

