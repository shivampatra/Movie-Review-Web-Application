import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";

const Header = () => {
 
return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand href="/" style={{"color":'gold'}}>
                {/* <FontAwesomeIcon icon ={faVideoSlash}/> */}
                Movie Review Web Application
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '50em'}}
                        navbarScroll
                    >
                    <NavLink className ="nav-link" to="/">Home</NavLink>
                    <NavLink className ="nav-link" to="/watchList">Previous Watch</NavLink>      
                </Nav>
                <Link to="/login">
                <Button variant="outline-info" className="me-2">Login</Button>
                </Link>
                <Link to="/register">
                <Button variant="outline-info">Register</Button>
                </Link>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header
