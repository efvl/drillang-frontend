import { useState, useEffect, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LangService from "../../langs/services/LangService";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { Language } from "../../langs/models/Language";
import { AppUserContext } from "../../../models/AppUserContext";
import { AppContext } from "../../../models/AppUserContextProvider";
import TagService from "../../tags/services/TagService";
import { WTag } from "../../tags/models/WTag";
import { TranslateSearchRequest } from "../models/TranslateSearchRequest";
import LangDropdown from "../../card/components/LangDropdown";
import TagDropdownPanel from "../../card/components/TagDropdownPanel";


const TranslateActionBar = ({onChangeFilter}) => {

    const appUserContext = useContext(AppContext) as AppUserContext;

    const [langs, setLangs] = useState<Language[]>([]);
    const [filterLang, setFilterLang] = useState<Language>({});
    const [wordFilter, setWordFilter] = useState<string>('');
    const [allTags, setAllTags] = useState<WTag[]>([]);
    const [filterTags, setFilterTags] = useState<WTag[]>([]);

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        const responseTags = await TagService.searchTags({});
        const pageSearch = {...appUserContext.store.wcardPageSearch} as TranslateSearchRequest;
        let contextTags = [] as WTag[];
        if(responseTags.data?.length > 0){
            setAllTags(responseTags.data);
            if(pageSearch?.tags?.length > 0){
                setFilterTags(pageSearch.tags);
                contextTags = pageSearch.tags;
            }
        }
        const response = await LangService.searchLanguages({});
        let contextLang = {} as Language;
        if(response.data?.length > 0){
            setLangs(response.data); 
            if(pageSearch?.languageId !== undefined){
                let lang = response.data.find(item => item.id == pageSearch.languageId);
                setFilterLang(lang);
                contextLang = lang;
            } else {
                setFilterLang(response.data[0]);
                contextLang = response.data[0];
            }
        }
        let contextWord = '';
        if(pageSearch?.word !== undefined){
            contextWord = pageSearch.word;
            setWordFilter(contextWord);
        }
        onChangeFilter(contextWord, contextLang, contextTags);
    }

    const tagSelectHandler = (tags:WTag[]) => {
        console.log(tags);
        setFilterTags(tags);
    }

    const handleSearch = useCallback(() => {
        onChangeFilter(wordFilter, filterLang, filterTags);
    }, [wordFilter, filterLang, filterTags] );

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
            <Row className="p-2 row-cols-auto">
                <Col>
                    <TagDropdownPanel wordTags={filterTags} tags={allTags} handler={tagSelectHandler}/>
                </Col>
            </Row>
        </Container>
    );
};

export default TranslateActionBar;