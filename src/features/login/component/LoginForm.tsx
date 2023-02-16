import React, { useState, useEffect, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, InputGroup } from "react-bootstrap";
import { IUser } from "../models/IUser";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../models/AppUserContextProvider";
import { AppUserContext } from "../../../models/AppUserContext";
import { observer } from "mobx-react-lite";

const LoginForm = () => {

    const appUserContext = useContext(AppContext) as AppUserContext;
    const navigate = useNavigate();

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const submitLoginForm = (e) => {
        e.preventDefault();
        appUserContext.store.login(login, password);
        navigate("/");
    }

    const submitRegisterForm = (e) => {
        e.preventDefault();
        appUserContext.store.registrate(login, password);
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={3}></Col>
                <Col md={6}>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="login">
                            <Form.Label column sm="3">Login : </Form.Label>
                            <Form.Control type="text" 
                                    placeholder="Enter login"
                                    value={login}
                                    onChange={e => setLogin(e.target.value)}/>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="password">
                            <Form.Label column sm="3">Password : </Form.Label>
                            <Form.Control type="text" 
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                    </Form>
                    <div className="text-center p-2">
                        <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitLoginForm}> Login </Button>
                        <Button variant="outline-primary" style={{width: 150}} type="submit" onClick={submitRegisterForm}> Register </Button>
                    </div>
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>    
    );
};

export default observer(LoginForm);