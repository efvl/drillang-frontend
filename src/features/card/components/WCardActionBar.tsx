import { useState, useEffect, useCallback, useContext } from "react";
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
import { Language } from "../../langs/models/Language";
import { AppUserContext } from "../../../models/AppUserContext";
import { AppContext } from "../../../models/AppUserContextProvider";

const WCardActionBar = ({onChangeFilter}) => {

    const { wcardPageSearch, setWCardPageSearch } = useContext(AppContext) as AppUserContext;

    const [langs, setLangs] = useState<Language[]>([]);
    const [filterLang, setFilterLang] = useState<Language>({});
    const [wordFilter, setWordFilter] = useState<string>('');

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        const response = await LangService.searchLanguages({});
        if(response.data?.length > 0){
            setLangs(response.data); 
            if(wcardPageSearch.languageId !== undefined){
                let lang = response.data.find(item => item.id == wcardPageSearch.languageId);
                setFilterLang(lang);
            } else {
                setFilterLang(response.data[0]);
            }
            handleSearch();
        }
    }

    const handleSearch = useCallback(() => {
        onChangeFilter(wordFilter, filterLang);
    }, [wordFilter, filterLang] );

    const handleSelectLanguage = (e: number) => {
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
                <Col className="border rounded">
                    <LangDropdown handler={handleSelectLanguage} langs={langs}/>
                </Col>
                <Col className="border rounded">
                    <h5 className="pt-1">{filterLang?.fullName}</h5>
                </Col>
            </Row>
        </Container>
    );
};

export default WCardActionBar;