import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Lesson } from "../../lesson/models/Lesson";

interface LessonDropdownProps {
    lessons:Array<Lesson>;
    handler:(id:number) => void;
}

const LessonDropdown = (props:LessonDropdownProps) => {

    return (
        <Dropdown onSelect={(e:String) => props.handler(Number(e))}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Lesson
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