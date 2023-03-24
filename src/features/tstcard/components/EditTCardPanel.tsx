import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PictureFileService from "../../card/services/PictureFileService";
import { useNavigate } from 'react-router-dom';
import PictureFilePanel from "../../../components/PictureFilePanel";
import { TCard } from "../models/TCard";
import TestCardService from "../services/TestCardService";
import TCardForm from "./TCardForm";

interface EditTCardPanelProps {
    tcardId?:number;
}

const EditTCardPanel = (props:EditTCardPanelProps) => {

    const navigate = useNavigate();

    const [tcard, setTCard] = useState<TCard>({question:'', answer:'', codePart:''});
    const [pictureId, setPictureId] = useState<number>();

    useEffect(() => {
        loadTestCard();  
    }, []);

    const loadTestCard = async () => {
        const result = await TestCardService.getTestCardById(props.tcardId);
        console.log(result.data);  
        setTCard(result.data);
        if(result.data) {
            setPictureId(result.data.pictureId);
        }
    }

    const pictureFileUploadHandler = async (file:File) => {
        const fData = new FormData();
        fData.append("picFile", file);
        const result = await PictureFileService.addPictureFile(fData);
        console.log("create picture file response:");
        console.log(result.data);
        setPictureId(result.data.id);
    }

    const updateTestCard = async (newWCard:TCard) => {
        newWCard.pictureId = pictureId;
        const response = await TestCardService.updateTestCard(newWCard);
        console.log(response.data);
        navigate('/tcard');
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4} className="border">
                    {pictureId
                        ? <PictureFilePanel pictureUrl={pictureId? PictureFileService.PICTURE_URL + "/" + pictureId : null} 
                                onChangeHandler={pictureFileUploadHandler}></PictureFilePanel>
                        : <PictureFilePanel pictureUrl={null} onChangeHandler={pictureFileUploadHandler}></PictureFilePanel>
                    }
                </Col>
                <Col md={6} className="border p-4 ">
                    <h5 className="text-center">Edit Test Card</h5>
                    <Row>
                        <TCardForm isEdit={true} submitAction={updateTestCard} testcard={tcard}/>
                    </Row>
                </Col>
                <Col></Col>
            </Row>
        </Container>    
    );
};

export default EditTCardPanel;