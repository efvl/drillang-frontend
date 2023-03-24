import { useState, useEffect, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import TagDropdownPanel from "../../card/components/TagDropdownPanel";
import TagService from "../../tags/services/TagService";
import { WTag } from "../../tags/models/WTag";


const TCardActionBar = ({onChangeFilter}) => {

    const [questionFilter, setQuestionFilter] = useState<string>('');
    const [allTags, setAllTags] = useState<WTag[]>([]);
    const [filterTags, setFilterTags] = useState<WTag[]>([]);

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        const responseTags = await TagService.searchTags({});
        let contextTags = [] as WTag[];
        if(responseTags.data?.length > 0){
            setAllTags(responseTags.data);
        }
        let contextQuestion = '';
        onChangeFilter(contextQuestion, contextTags);
    }

    const tagSelectHandler = (tags:WTag[]) => {
        console.log(tags);
        setFilterTags(tags);
    }

    const handleSearch = useCallback(() => {
        onChangeFilter(questionFilter, filterTags);
    }, [questionFilter, filterTags] );


    return (
        <Container>
            <Row className="p-2 row-cols-auto">
                <Col>
                    <Link className="btn btn-outline-success" to="/tcard/add">Add Test Card</Link>
                </Col>
                <Col className="btn border rounded pt-1 shadow-sm" onClick={handleSearch}>
                    <Search size={24}></Search>
                </Col>
                <Col>
                    <Form>
                        <Form.Control type="text" placeholder="Enter question" value={questionFilter} onChange={e => setQuestionFilter(e.target.value)}/>
                    </Form>
                </Col>
            </Row>
            <Row className="p-2 row-cols-auto">
                <Col>
                    <TagDropdownPanel wordTags={filterTags} tags={allTags} handler={tagSelectHandler}/>
                </Col>
            </Row>
        </Container>
    );
};

export default TCardActionBar;