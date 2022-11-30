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

const WCardActionBar = ({onChangeLang}) => {

    const [langs, setLangs] = useState([]);
    const [filterLanguage, setFilterLanguage] = useState();

    useEffect(() => {
        loadLanguages();
    }, []);

    const loadLanguages = async () => {
        const response = await LangService.searchLanguages();
        if(response.data?.length > 0){
            setLangs(response.data); 
        }
    }

    const handleSelectLanguage = (e) => {
        let lang = langs.find(item => item.id == e);
        setFilterLanguage(lang.fullName);
        onChangeLang(lang);
    }

    return (
        <Container>
            <Row className="p-2 row-cols-auto">
                <Col>
                    <Link className="btn btn-outline-success" to="/wcard/add">Add Word Card</Link>
                </Col>
                <Col>
                    <LangDropdown handler={handleSelectLanguage} langs={langs}/>
                </Col>
                <Col>
                    <h5>{filterLanguage}</h5>
                </Col>
            </Row>
        </Container>
    );
};

export default WCardActionBar;