import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';

const LessonDropdown = (props) => {

    return (
        <Dropdown onSelect={props.handler}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Languages
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {props.lessons.map((item, i) =>
                    <Dropdown.Item eventKey={item.id} key={i}>{item.name}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>    
    );
};

export default LessonDropdown;