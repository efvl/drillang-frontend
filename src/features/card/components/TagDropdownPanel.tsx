import { Badge, Button, Col, Container, Dropdown, NavItem, Row} from "react-bootstrap";
import { MouseEvent, useEffect, useState } from 'react';
import { WTag } from "../../tags/models/WTag";
import { PlusSquare, TagFill, XCircle } from "react-bootstrap-icons";
import { DropDirection } from "react-bootstrap/esm/DropdownContext";

interface TagDropdownProps {
    wordTags: Array<WTag>,
    tags: Array<WTag>,
    handler: (tag:WTag[]) => void,
}

const TagDropdownPanel = (props:TagDropdownProps) => {

    const [panelTags, setPanelTags] = useState<WTag[]>([]);

    useEffect(() => {
        console.log(props);
        setPanelTags(props.wordTags);
    }, [props.wordTags]);

    const addSelectedTag = (curSelectedTag:WTag) => {
        if((Object.keys(curSelectedTag).length == 0) || panelTags.find(item => item.id == curSelectedTag.id)){
            console.log("already selected");
        } else {
            var arrTags = [...panelTags, curSelectedTag];
            setPanelTags(arrTags);
            props.handler(arrTags);
        }
    }

    const deleteSelectedTag = (wtag:WTag) => {
        console.log(wtag);
        var arrTags = panelTags.filter(item => item.id != wtag.id);
        setPanelTags(arrTags);
        props.handler(arrTags);
    }

    const selectTagDropdown = (id:number) => {
        let selectTag:WTag = props.tags.find(item => item.id === id)
        addSelectedTag(selectTag);
    }

    return (
        <Container>
            <Row className="row-cols-auto">
                <Col className="border rounded p-0">
                    <Dropdown onSelect={(e: string) => selectTagDropdown(Number(e))} >
                        <Dropdown.Toggle variant="success-outline" id="dropdown-basic">
                            <><TagFill/> Select Tags</>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {props.tags?.map((item:WTag, i:number) =>
                                <Dropdown.Item eventKey={item.id} key={i}>{item.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Row className="pt-2 row-cols-auto">
                        <Col>
                            {panelTags?.map((item:WTag, i:number) => 
                                <Badge pill bg="secondary" key={`tag_${i}`}>
                                    {item.name}
                                    <XCircle size={20} color="crimson" onClick={() => {deleteSelectedTag(item)}} className="ms-2"></XCircle>
                                </Badge>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>    
    );
};

export default TagDropdownPanel;
