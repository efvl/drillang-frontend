import { Badge, Button, Col, Container, Dropdown, NavItem, Row} from "react-bootstrap";
import { useEffect, useState } from 'react';
import { TagFill, XCircle } from "react-bootstrap-icons";
import { LTag } from "../../lessontags/models/LTag";

interface LTagDropdownProps {
    lessonTags: Array<LTag>,
    tags: Array<LTag>,
    handler: (tag:LTag[]) => void,
}

const LTagDropdownPanel = (props:LTagDropdownProps) => {

    const [panelLTags, setPanelLTags] = useState<LTag[]>([]);

    useEffect(() => {
        console.log(props);
        setPanelLTags(props.lessonTags);
    }, [props.lessonTags]);

    const addSelectedLTag = (curSelectedTag:LTag) => {
        if((Object.keys(curSelectedTag).length == 0) || panelLTags.find(item => item.id == curSelectedTag.id)){
            console.log("already selected");
        } else {
            var arrTags = [...panelLTags, curSelectedTag];
            setPanelLTags(arrTags);
            props.handler(arrTags);
        }
    }

    const deleteSelectedLTag = (ltag:LTag) => {
        console.log(ltag);
        var arrLTags = panelLTags.filter(item => item.id != ltag.id);
        setPanelLTags(arrLTags);
        props.handler(arrLTags);
    }

    const selectLTagDropdown = (id:number) => {
        let selectLTag:LTag = props.tags.find(item => item.id === id)
        addSelectedLTag(selectLTag);
    }

    return (
        <Container>
            <Row className="row-cols-auto">
                <Col className="border rounded p-0">
                    <Dropdown onSelect={(e: string) => selectLTagDropdown(Number(e))} >
                        <Dropdown.Toggle variant="success-outline" id="dropdown-basic">
                            <><TagFill/> Select Lesson Tags</>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {props.tags?.map((item:LTag, i:number) =>
                                <Dropdown.Item eventKey={item.id} key={i}>{item.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Row className="pt-2 row-cols-auto">
                        <Col>
                            {panelLTags?.map((item:LTag, i:number) => 
                                <Badge pill bg="secondary" key={`tag_${i}`}>
                                    {item.name}
                                    <XCircle size={20} color="crimson" onClick={() => {deleteSelectedLTag(item)}} className="ms-2"></XCircle>
                                </Badge>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>    
    );
};

export default LTagDropdownPanel;
