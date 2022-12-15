import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';

const LangDropdown = (props) => {

    return (
        <Dropdown onSelect={props.handler}>
            <Dropdown.Toggle variant="success-outline" id="dropdown-basic">
                Languages
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {props.langs.map((item, i) =>
                    <Dropdown.Item eventKey={item.id} key={i}>{item.fullName}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>    
    );
};

export default LangDropdown;