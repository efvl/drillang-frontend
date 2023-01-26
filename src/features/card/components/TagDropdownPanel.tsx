import { Badge, Button, Col, Container, Dropdown, NavItem, Row} from "react-bootstrap";
import { MouseEvent, useState } from 'react';
import { Tag } from "../../tags/models/Tag";
import { PlusSquare, TagFill } from "react-bootstrap-icons";
import { DropDirection } from "react-bootstrap/esm/DropdownContext";

interface TagDropdownProps {
    tags: Array<Tag>,
    handler: (tag:Tag[]) => void,
}

const TagDropdownPanel = (props:TagDropdownProps) => {

    const [panelTags, setPanelTags] = useState<Tag[]>([]);
    const [curSelectedTag, setCurSelectedTag] = useState<Tag>({});

    const addSelectedTag = (e: MouseEvent<SVGElement>) => {
        e.preventDefault();
        if(panelTags.includes(curSelectedTag)){
            console.log("already selected");
        } else {
            setPanelTags([...panelTags, curSelectedTag]);
            props.handler([...panelTags, curSelectedTag]);
        }
    }

    const selectTagDropdown = (id:number) => {
        let selectTag:Tag = props.tags.find(item => item.id === id)
        setCurSelectedTag(selectTag);
    }

    return (
        <Container>
            <Row className="row-cols-auto">
                <Col sm={3} className="border rounded">
                    <Dropdown onSelect={(e: string) => selectTagDropdown(Number(e))} >
                        <Dropdown.Toggle variant="success-outline" id="dropdown-basic">
                            <><TagFill/> Select Tags</>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {props.tags?.map((item:Tag, i:number) =>
                                <Dropdown.Item eventKey={item.id} key={i}>{item.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col sm={9}>
                    <Row className="pt-2 row-cols-auto">
                        <Col>
                            <span>{curSelectedTag?.name}</span>
                        </Col>
                        <Col>
                            <PlusSquare size={24} color="green" onClick={addSelectedTag} className="shadow"></PlusSquare>
                        </Col>
                        <Col>
                            {panelTags.map((item:Tag, i:number) => 
                                <Badge pill bg="secondary" id={`tag_${i}`}>{item.name}</Badge>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>    
    );
};

export default TagDropdownPanel;
