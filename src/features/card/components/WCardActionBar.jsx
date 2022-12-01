import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LangDropdown from "./LangDropdown";
import LangService from "../../langs/services/LangService";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const WCardActionBar = ({onChangeFilter}) => {

    const [langs, setLangs] = useState([]);
    const [filterLang, setFilterLang] = useState({});
    const [wordFilter, setWordFilter] = useState('');

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        const response = await LangService.searchLanguages();
        if(response.data?.length > 0){
            setLangs(response.data); 
            setFilterLang(response.data[0]);
            handleSearch();
        }
    }

    const handleSearch = () => {
        onChangeFilter(wordFilter, filterLang);
    }

    const handleSelectLanguage = (e) => {
        let lang = langs.find(item => item.id == e);
        setFilterLang(lang);
    }

    return (
        <Container>
            <Row className="p-2 row-cols-auto">
                <Col>
                    <Link className="btn btn-outline-success" to="/wcard/add">Add Word Card</Link>
                </Col>
                <Col className="btn border rounded pt-1 shadow-sm" onClick={handleSearch}>
                    <Search size={24}></Search>
                </Col>
                <Col>
                    <Form>
                        <Form.Control type="text" placeholder="Enter word" value={wordFilter} onChange={e => setWordFilter(e.target.value)}/>
                    </Form>
                </Col>
                <Col>
                    <LangDropdown handler={handleSelectLanguage} langs={langs}/>
                </Col>
                <Col>
                    <h5 className="pt-1">{filterLang?.fullName}</h5>
                </Col>
            </Row>
        </Container>
    );
};

export default WCardActionBar;