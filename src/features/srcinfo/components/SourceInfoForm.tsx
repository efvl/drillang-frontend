import React, { useState, useEffect, MouseEvent } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { InputGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SourceInfo } from "../models/SourceInfo";
import SourceInfoService from "../services/SourceInfoService";
import SourceInfoDropdown from "./SourceInfoDropdown";
import { SourceType } from "../models/SourceType";

interface SourceInfoFormProps {
    submitAction: (srcInfo: SourceInfo) => void,
    isEdit: boolean,
    srcInfoId: number,
}

const SourceInfoForm = (props:SourceInfoFormProps) => {

    const [sourceInfo, setSourceInfo] = useState<SourceInfo>();
    const [typeLabel, setTypeLabel] = useState<string>('');

    const submitSourceInfo = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.submitAction(sourceInfo);
    }

    useEffect(() => {
        if(props.isEdit){
            loadSourceInfo();
        }
    }, []);

    const loadSourceInfo = async () => {
        const result = await SourceInfoService.getSourceInfoById(props.srcInfoId);
        console.log(result.data);  
        setSourceInfo(result.data);
        setTypeLabel(SourceType[result.data.sourceType]);
    }

    const handleSourceType = (e:string) => {
        console.log(e);
        setSourceInfo({...sourceInfo, sourceType: e});
        setTypeLabel(SourceType[e]);
    }

    return (
        <Container>
            <Row>
                <Col className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h5 className="text-center m-4">{props.isEdit?'Edit':'Create'} Source Info</h5>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="typeSource">
                            <Col sm="9" className="pt-2">
                                <InputGroup className="mb-3">
                                    <SourceInfoDropdown handler={handleSourceType} />
                                    <Form.Control placeholder="Select type" aria-disabled
                                        value={typeLabel} 
                                        onChange={e => setTypeLabel(typeLabel)}/>
                                </InputGroup> 
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="pathLink">
                            <Form.Label>Path Link</Form.Label>
                            <Form.Control type="text" 
                                placeholder="Enter path or link"
                                value={sourceInfo?.pathLink}
                                onChange={e => setSourceInfo({...sourceInfo, pathLink: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="srcName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" 
                                placeholder="Enter name"
                                value={sourceInfo?.name}
                                onChange={e => setSourceInfo({...sourceInfo, name: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="authors">
                            <Form.Label>Authors</Form.Label>
                            <Form.Control type="text" 
                                placeholder="Enter authors"
                                value={sourceInfo?.authors}
                                onChange={e => setSourceInfo({...sourceInfo, authors: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="other">
                            <Form.Label>Other</Form.Label>
                            <Form.Control type="text" 
                                placeholder="Enter other"
                                value={sourceInfo?.other}
                                onChange={e => setSourceInfo({...sourceInfo, other: e.target.value})}/>
                        </Form.Group>
                        <Button variant="outline-primary" type="submit" onClick={(e) => submitSourceInfo(e)}>{props.isEdit?' Save ':' Add '} </Button>
                        <Link className="btn btn-outline-danger mx-2" to="/srcinfo">Cancel</Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SourceInfoForm;