import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { CardList, Umbrella, ArrowLeftRight, House, PencilSquare, Book, Tag, PersonSquare } from "react-bootstrap-icons";
import {LinkContainer} from 'react-router-bootstrap'
import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AppUserContext } from '../models/AppUserContext';
import { useContext } from 'react';
import { AppContext } from '../models/AppUserContextProvider';
import { observer } from "mobx-react-lite";

const TopNavbar = () => {

    const navigate = useNavigate();
    const appUserContext = useContext(AppContext) as AppUserContext;

    const doLogout = (e) => {
        e.preventDefault();
        console.log('logout' + appUserContext.store.isAuth);
        appUserContext.store.logout();
        navigate('/');
    }

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
                <Nav>
                    { appUserContext.store.isAuth 
                    ?
                    <LinkContainer to="/home">
                        <Nav.Link onClick={(e)=> doLogout(e)}>({appUserContext.store?.user?.login}) Logout</Nav.Link>
                    </LinkContainer>
                    :
                    <LinkContainer to="/login">
                        <Nav.Link><PersonSquare size={18}/> Login</Nav.Link>
                    </LinkContainer>
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>    
    );

};

export default observer(TopNavbar);