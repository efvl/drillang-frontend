import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

interface PicturePanelProps {
    pictureUrl?:string;
    onChangeHandler?: (file: any) => void;
}

const PictureFilePanel = (props:PicturePanelProps) => {

    const [preview, setPreview] = useState<any>({});
    const [isNew, setIsNew] = useState<boolean>(false);

    useEffect(() => {
        console.log(props.pictureUrl);
      }, [props.pictureUrl]);


    const fileSelectedHandler = (e) => {
        setIsNew(true);
        setPreview(URL.createObjectURL(e.target.files[0]));   
        props.onChangeHandler(e.target.files[0]);
    }

    return (
        <Container>
            {isNew && preview && <img src={preview}  width="100%"/>}
            {!isNew && props.pictureUrl && <img src={props.pictureUrl}  width="100%"/>}
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Picture for card</Form.Label>
                <Form.Control type="file" onChange={fileSelectedHandler}/>
            </Form.Group>
        </Container>    
    );

};

export default PictureFilePanel;