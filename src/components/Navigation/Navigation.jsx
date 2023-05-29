import './Navigation.css'

import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'


const Navigation = () => {

    return (

        <Navbar collapseOnSelect expand="md" bg="white" variant="white" sticky='top' className='mb-5'>
            <Container>
                <Navbar.Brand> <Link to="/">EVENTS APP</Link> </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as="span"> <Link to="/feed">Feed</Link> </Nav.Link>
                        <Nav.Link as="span"> <Link to="/events">Events</Link> </Nav.Link>
                        <Nav.Link as="span"> <Link to="/create-event">New Event</Link> </Nav.Link>
                        <Nav.Link as="span"> <Link to="/users">Users</Link> </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as="span"> <Link to="/profile">Profile</Link> </Nav.Link>
                        <Nav.Link as="span"> <Link to="/register">Register</Link> </Nav.Link>
                        <Nav.Link as="span"> <Link to="/login">Login</Link> </Nav.Link>
                        <Nav.Link as="span"> <Link to="/logout">Logout</Link> </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}


export default Navigation