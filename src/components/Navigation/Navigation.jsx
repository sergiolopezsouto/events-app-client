import './Navigation.css'

import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';

import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { SITE_TITLE } from '../../consts/project-consts';


const Navigation = () => {

    const { user, logout } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (

        <Navbar collapseOnSelect expand="md" bg="white" variant="white" sticky='top' className='mb-5'>
            <Container>
                {
                    user && <Navbar.Brand> <Link to="/">{SITE_TITLE}</Link> </Navbar.Brand>
                }
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {
                            user &&
                            <>
                                <Nav.Link as="span"> <Link to="/feed"> Feed </Link> </Nav.Link>
                                <Nav.Link as="span"> <Link to="/events"> Events </Link> </Nav.Link>
                                <Nav.Link as="span"> <Link to="/create-event"> Create Event </Link> </Nav.Link>
                                <Nav.Link as="span"> <Link to="/users"> Search People </Link> </Nav.Link>
                            </>
                        }
                    </Nav>
                    {/* <Nav>
                        {
                            user ?
                                <>
                                    <Nav.Link as="span"> <Link to="/profile"> Profile </Link> </Nav.Link>
                                    <Nav.Link as="span" onClick={handleLogout}> <Link to={'/'}> Logout </Link> </Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link as="span"> <Link to="/register"> Register </Link> </Nav.Link>
                                    <Nav.Link as="span"> <Link to="/login"> Login </Link> </Nav.Link>
                                </>
                        }
                    </Nav> */}
                    <Nav>
                        {
                            user &&
                            <>
                                <Nav.Link as="span"> <Link to="/profile"> Profile </Link> </Nav.Link>
                                <Nav.Link as="span" onClick={handleLogout}> <Link to={'/'}> Logout </Link> </Nav.Link>
                            </>
                        }
                    </Nav>


                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}


export default Navigation