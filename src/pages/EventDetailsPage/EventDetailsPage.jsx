import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import eventsService from "../../services/events.services"
import { Col, Container, Row } from "react-bootstrap"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { AuthContext } from "../../contexts/auth.context"
import { dateToString } from "../../utils/dateFormat"

const EventDetailsPage = () => {

    const { user } = useContext(AuthContext)
    const { event_id } = useParams()

    const [event, setEvent] = useState()
    const [isAssisting, setIsAssisting] = useState(false)

    const navigate = useNavigate()


    useEffect(() => {
        eventsService
            .getOneEvent(event_id)
            .then(res => {
                setEvent(res.data)
                setIsAssisting(res.data.assistants.some(elm => elm._id === user._id))
            })
            .catch(err => console.log(err))
    }, [event_id, user?._id])


    const handleAssist = () => {
        setIsAssisting(true)
        eventsService
            .assistEvent({ event_id })
            .then(({ data }) => event?.assistants.length !== data.assistants.length && setEvent(data))
            .catch(err => console.log(err))
    }

    const handleNotAssist = () => {
        setIsAssisting(false)
        eventsService
            .notAssistEvent({ event_id })
            .then(({ data }) => event?.assistants.length !== data.assistants.length && setEvent(data))
            .catch(err => console.log(err))
    }

    const handleEditEvent = () => alert('editing')

    const handleDeleteEvent = () => {

        eventsService
            .deleteEvent(event_id)
            .then()
            .catch(err => console.log(err))

        navigate('/events')
    }


    if (!event || !event.assistants) {
        return <LoadingSpinner />
    }

    return (
        <Container>

            <h1> {event.name} </h1>
            <hr />
            <Row>
                <Col>
                    <img src={event.imageUrl} alt="event-img" />
                </Col>

                <Col>
                    <Row>
                        <Col>
                            <p><strong> DATE → </strong> {dateToString(event.date)} </p>
                            <p><strong> TIME → </strong> {event.time} </p>
                            <p><strong> DESCRIPTION: </strong></p>
                            <p>{event.description}</p>
                        </Col>
                        <Col>
                            <p><strong> CREATOR: </strong> {user._id === event.creator._id ? <Link to={`/profile`}> {event.creator.username} </Link> : <Link to={`/users/${event.creator._id}`}> {event.creator.username} </Link>} </p>
                            {/* {event.creator && <p><strong> CREATOR: </strong> {<Link to={`/users/${event.creator.username}`}> {event.creator.username} </Link>} </p>} */}

                            <p><strong> ASSISTANTS: </strong></p>
                            {event.assistants.length > 0 ? (
                                event.assistants.map(assistant => (
                                    <Link key={assistant._id} className="d-block mb-3" to={`/users/${assistant._id}`}> {assistant.username} </Link>
                                ))
                            ) : (
                                <p>No assistants yet.</p>
                            )}

                            {
                                !isAssisting ? <button className="btn btn-primary" onClick={handleAssist}> ASSIST </button> : <button className="btn btn-danger" onClick={handleNotAssist}> NOT ASSIST </button>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>

            <hr />

            {
                user._id === event.creator._id &&
                <>
                    <Container className="mt-5 mb-5">
                        <Row>
                            <Col>
                                <button className="btn btn-dark" onClick={handleEditEvent}> EDIT EVENT </button>
                            </Col>
                            <Col>
                                <button className="btn btn-danger " onClick={handleDeleteEvent}> DELETE EVENT </button>
                            </Col>
                        </Row>
                    </Container>

                    <hr />
                </>
            }

            <h3 className="mt-5"> COMMENTS: </h3>
            <p>comment</p>
            <p>comment</p>
            <p>comment</p>
            <p>comment</p>

            <hr />

        </Container >
    )
}


export default EventDetailsPage