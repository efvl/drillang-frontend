import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Col } from "react-bootstrap";

const SourceInfoActionBar = ({onChangeFilter}) => {

    const [nameFilter, setNameFilter] = useState<string>('');
    const [authorsFilter, setAuthorsFilter] = useState<string>('');

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        let contextName = '';
        let contextAuthors = '';
        onChangeFilter(contextName, contextAuthors);
    }

    const handleSearch = useCallback(() => {
        onChangeFilter(nameFilter, authorsFilter);
    }, [nameFilter, authorsFilter] );

    return (
        <Container>
            <Row className="p-2 row-cols-auto">
                <Col>
                    <Link className="btn btn-outline-success" to="/srcinfo/add">Add SourceInfo</Link>
                </Col>
                <Col className="btn border rounded pt-1 shadow-sm" onClick={handleSearch}>
                    <Search size={24}></Search>
                </Col>
                <Col>
                    <Form>
                        <Form.Control type="text" placeholder="Enter name" value={nameFilter} onChange={e => setNameFilter(e.target.value)}/>
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <Form.Control type="text" placeholder="Enter author" value={authorsFilter} onChange={e => setAuthorsFilter(e.target.value)}/>
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};

export default SourceInfoActionBar;