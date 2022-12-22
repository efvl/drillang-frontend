import React, { useState, useEffect, MouseEvent } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { Tag } from "../models/Tag";
import TagService from "../services/TagService";

interface TagFormProps {
    submitAction?:(tag:Tag) => void;
    isEdit?:boolean;
    tagId?:number;
}

const TagForm = (props:TagFormProps) => {

    const [tag, setTag] = useState<Tag>({ name:'', description:''});

    const submitTag = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.submitAction(tag);
    }

    useEffect(() => {
        if(props.isEdit){
            loadTag();
        }
    }, []);

    const loadTag = async () => {
        const result = await TagService.getTagById(props.tagId);
        console.log(result.data);
        setTag(result.data);
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
                                placeholder="Enter tag name"
                                value={tag?.name}
                                onChange={e => setTag({...tag, name: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" 
                                placeholder="Enter description name"
                                value={tag?.description}
                                onChange={e => setTag({...tag, description: e.target.value})}/>
                        </Form.Group>
                        <Button variant="outline-primary" type="submit" onClick={(e) => submitTag(e)}>{props.isEdit?' Save ':' Add '} </Button>
                        <Link className="btn btn-outline-danger mx-2" to="/tags">Cancel</Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default TagForm;

