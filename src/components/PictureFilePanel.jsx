import React from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useState } from "react";


const PictureFilePanel = ({pictureUrl, onChangeHandler}) => {

    const [preview, setPreview] = useState();

    const fileSelectedHandler = (e) => {
        pictureUrl = null;
        setPreview(URL.createObjectURL(e.target.files[0]));   
        onChangeHandler(e.target.files[0]);
    }

    return (
        <Container>
            {preview
                ? <img src={preview}  width="100%"/>
                : pictureUrl && <img src={pictureUrl}  width="100%"/>     
            }
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Picture for card</Form.Label>
                <Form.Control type="file" onChange={fileSelectedHandler}/>
            </Form.Group>
        </Container>    
    );

};

export default PictureFilePanel;