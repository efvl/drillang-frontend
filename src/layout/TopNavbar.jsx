import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { CardList, Umbrella, ArrowLeftRight, House, PencilSquare } from "react-bootstrap-icons";

const TopNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Drill Language</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/"><House size={18}/> Home</Nav.Link>
                    <Nav.Link href="/lang"><Umbrella size={18}/> Languages</Nav.Link>
                    <Nav.Link href="/wcard"><CardList size={18}/> Word Cards</Nav.Link>
                    <Nav.Link href="/translate"><ArrowLeftRight size={18}/> Translations</Nav.Link>
                    <Nav.Link href="/wlesson"><PencilSquare size={18}/> Word Lessons</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>    
    );

};

export default TopNavbar;