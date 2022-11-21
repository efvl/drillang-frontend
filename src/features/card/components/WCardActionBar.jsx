import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const WCardActionBar = () => {
    return (
        <Container>
            <Row className="pt-2">
                <ButtonToolbar aria-label="Word Card Toolbar">
                    <ButtonGroup className="me-2" aria-label="Actions group">
                        <Link className="btn btn-outline-success" to="/wcard/add">Add Word Card</Link>
                    </ButtonGroup>
                </ButtonToolbar>
            </Row>
        </Container>
    );
};

export default WCardActionBar;