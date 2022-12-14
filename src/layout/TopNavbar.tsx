import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { CardList, Umbrella, ArrowLeftRight, House, PencilSquare, Book, Tag } from "react-bootstrap-icons";
import {LinkContainer} from 'react-router-bootstrap'
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Drill Language</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to="/">
                        <Nav.Link><House size={18}/> Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/wcard">
                        <Nav.Link><CardList size={18}/> Word Cards</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/translate">
                        <Nav.Link><ArrowLeftRight size={18}/> Translations</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/wlesson">
                        <Nav.Link><PencilSquare size={18}/> Word Lessons</Nav.Link>
                    </LinkContainer>
                    <NavDropdown title={<><Book size={18}/> Dictionary</>} id="basic-nav-dropdown" className="bg-dark">
                        <NavDropdown.Item as={Link} to="/lang">
                            <Umbrella size={18}/> Languages
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/tags">
                            <Tag size={18}/> Tags
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>    
    );

};

export default TopNavbar;