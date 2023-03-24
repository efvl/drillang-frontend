import { SelectCallback } from "@restart/ui/esm/types";
import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Language } from "../../langs/models/Language";
import { SourceType } from "../models/SourceType";

interface SourceInfoDropdownProps {
    handler: (str:string) => void,
}

const SourceInfoDropdown = (props:SourceInfoDropdownProps) => {

    return (
        <Dropdown onSelect={(e: string) => props.handler(e)}>
            <Dropdown.Toggle variant="success-outline" id="dropdown-basic">
                Source Types
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {Object.keys(SourceType).map((itemKey:string, i:number) =>
                    <Dropdown.Item eventKey={itemKey} key={i}>{SourceType[itemKey]}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>    
    );
};

export default SourceInfoDropdown;