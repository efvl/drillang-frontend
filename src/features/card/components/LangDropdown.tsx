import { SelectCallback } from "@restart/ui/esm/types";
import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Language } from "../../langs/models/Language";

interface LangDropdownProps {
    langs: Array<Language>,
    handler: (id:number) => void,
}

const LangDropdown = (props:LangDropdownProps) => {

    return (
        <Dropdown onSelect={(e: string) => props.handler(Number(e))}>
            <Dropdown.Toggle variant="success-outline" id="dropdown-basic">
                Languages
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {props.langs.map((item:Language, i:number) =>
                    <Dropdown.Item eventKey={item.id} key={i}>{item.fullName}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>    
    );
};

export default LangDropdown;