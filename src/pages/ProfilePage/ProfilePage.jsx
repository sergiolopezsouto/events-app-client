import './ProfilePage.css'
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import usersService from "../../services/users.services"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { Link } from "react-router-dom"
import eventsService from "../../services/events.services"
import { dateToString } from '../../utils/dateFormat'


const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    const [userFounded, setUserFounded] = useState()
    const [createdEvents, setCreatedEvents] = useState([]);
    const [attendedEvents, setAttendedEvents] = useState([]);

    const [showCreatedEvents, setShowCreatedEvents] = useState(false);
    const [showAssistedEvents, setShowAssistedEvents] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    const handleCloseCreatedEvents = () => setShowCreatedEvents(false);
    const handleShowCreatedEvents = () => setShowCreatedEvents(true);
    const handleCloseAssistedEvents = () => setShowAssistedEvents(false);
    const handleShowAssistedEvents = () => setShowAssistedEvents(true);
    const handleCloseFollowing = () => setShowFollowing(false);
    const handleShowFollowing = () => setShowFollowing(true);


    useEffect(() => {
        loadUser()
    }, [user])

    const loadUser = () => {
        usersService
            .getUserById(user._id)
            .then(res => {
                setUserFounded(res.data);
                return eventsService.getEvents();
            })
            .then(res => {
                setCreatedEvents(res.data.filter(event => event.creator._id === user._id));
                setAttendedEvents(res.data.filter(event => event.assistants.some(assistant => assistant._id === user._id)));
            })
            .catch(err => console.log(err))
    }


    if (!userFounded) {
        return <LoadingSpinner />
    }

    return (
        <Container>

            <h1> Hello, {userFounded.username} </h1>
            <hr />
            <Row>
                <Col className='d-flex justify-content-center my-2' sm={12} md={6}>
                    <article className='profile-img' >
                        <img src={userFounded.profileImg} alt="profile-img" />
                    </article>
                </Col>

                <Col className='mt-5'>
                    <Row>
                        <Col className='mb-4' sm={12} md={4}>
                            <Button variant="primary" onClick={handleShowCreatedEvents}> EVENTS CREATED </Button>
                        </Col>
                        <Col className='mb-4' sm={12} md={4}>
                            <Button variant="primary" onClick={handleShowAssistedEvents}> EVENTS ASSISTED </Button>
                        </Col>
                        <Col className='mb-4' sm={12} md={4}>
                            <Button variant="primary" onClick={handleShowFollowing}> FOLLOWING </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <hr />
            <Link to={'/profile/edit'}>
                <button className="btn btn-dark mt-4"> EDIT PROFILE </button>
            </Link>

            <Modal show={showCreatedEvents} onHide={handleCloseCreatedEvents}>
                <Modal.Header closeButton>
                    <Modal.Title>Created Events</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {createdEvents.length > 0 ?
                        createdEvents.map(event => {
                            const eventDate = new Date(event.date);
                            const now = new Date();
                            return (
                                <p key={event._id} className={eventDate < now ? 'past-event' : ''}>
                                    <Link to={`/events/${event._id}`}> <strong>{event.name}</strong> </Link> on {dateToString(event.date)}
                                </p>
                            )
                        })
                        :
                        <p>You haven't created any events yet.</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreatedEvents}> Close </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAssistedEvents} onHide={handleCloseAssistedEvents}>
                <Modal.Header closeButton>
                    <Modal.Title>Assisted Events</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {attendedEvents.length > 0 ?
                        attendedEvents.map(event => {
                            const eventDate = new Date(event.date);
                            const now = new Date();
                            return (
                                <p key={event._id} className={eventDate < now ? 'past-event' : ''}>
                                    <Link to={`/events/${event._id}`}> <strong>{event.name}</strong> </Link> on {dateToString(event.date)}
                                </p>
                            )
                        })
                        :
                        <p>You haven't attended any events yet.</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAssistedEvents}> Close </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showFollowing} onHide={handleCloseFollowing}>
                <Modal.Header closeButton>
                    <Modal.Title>Following</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {userFounded.following.length > 0 ?
                        userFounded.following.map(user => (
                            <p key={user._id}>
                                <Link to={`/users/${user._id}`}> {user.username} </Link>
                            </p>
                        ))
                        : <p>You are not following anyone yet.</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseFollowing}> Close </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    )
}


export default ProfilePage