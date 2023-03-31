import React, { useState, useEffect, useRef } from "react";
import WordCardService from "../services/WordCardService";
import { Language } from "../../langs/models/Language";
import { Popover } from "react-bootstrap";
import { WCard } from "../models/WCard";

interface WCardPopoverProps {
    card1Id?:number;
    card2Id?:number;
}

const WCardPopover = (props:WCardPopoverProps) => {
    const [wcard1Form, setWcard1Form] = useState<WCard>({word:'', transcript:'', example:'', tags:[]});
    const [wcard2Form, setWcard2Form] = useState<WCard>({word:'', transcript:'', example:'', tags:[]});

    useEffect(() => {
        loadWordCard(props.card1Id, props.card2Id);
    }, []);

    const loadWordCard = async (wcard1Id, wcard2Id) => {
        const result = await WordCardService.getWordCardById(wcard1Id);
        console.log(result.data);  
        setWcard1Form(result.data);
        const result2 = await WordCardService.getWordCardById(wcard2Id);
        console.log(result2.data);  
        setWcard2Form(result2.data);
    }

    return (
        <Popover>
            <Popover.Header as="h3">Popover right</Popover.Header>
            <Popover.Body>
                <div>{props.card1Id}</div>
                <div>{props.card2Id}</div> 
            </Popover.Body>
        </Popover>

    );
};

export default WCardPopover;