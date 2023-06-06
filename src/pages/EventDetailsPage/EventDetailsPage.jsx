import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import eventsService from "../../services/events.services";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../contexts/auth.context";
import { dateToString } from "../../utils/dateFormat";
import MapContainer from "../../components/MapContainer/MapContainer";

const EventDetailsPage = () => {
    const { user } = useContext(AuthContext);
    const { event_id } = useParams();

    const [event, setEvent] = useState();
    const [isAssisting, setIsAssisting] = useState(false)
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([])
    const [show, setShow] = useState(false);
    const [showAssistants, setShowAssistants] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseAssistants = () => setShowAssistants(false);
    const handleShowAssistants = () => setShowAssistants(true);

    const navigate = useNavigate();

    useEffect(() => {
        eventsService
            .getOneEvent(event_id)
            .then((res) => {
                setEvent(res.data)
                setIsAssisting(res.data.assistants.some((elm) => elm._id === user._id))
                setComments(res.data.comments)
            })
            .catch((err) => console.log(err))
    }, [event_id, user?._id])


    const handleAssist = () => {
        setIsAssisting(true)
        eventsService
            .assistEvent({ event_id })
            .then(({ data }) => event?.assistants.length !== data.assistants.length && setEvent(data))
            .catch((err) => console.log(err))
    }

    const handleNotAssist = () => {
        setIsAssisting(false);
        eventsService
            .notAssistEvent({ event_id })
            .then(({ data }) => event?.assistants.length !== data.assistants.length && setEvent(data))
            .catch((err) => console.log(err));
    }

    const handleDeleteEvent = () => {
        eventsService
            .deleteEvent(event_id)
            .then(() => {
                handleClose();
                navigate("/events");
            })
            .catch((err) => console.log(err));
    }

    const handleAddComment = () => {
        eventsService
            .addComment(event_id, newComment)
            .then(({ data }) => {
                setComments(data.comments);
                setNewComment("");
            })
            .catch((err) => console.log(err));
    }


    if (!event || !event.assistants) {
        return <LoadingSpinner />;
    }

    return (
        <Container>
            <h1> {event.name} </h1>
            <hr />
            <Row>
                <Col sm={12} md={6} className="mt-3 mb-3">
                    <MapContainer location={event.location} />
                </Col>

                <Col sm={12} md={6} className="mt-3 mb-3">
                    <Row>
                        <Col style={{ textAlign: "left" }}>
                            <p><strong> DATE: </strong> {dateToString(event.date)}</p>
                            <p><strong> TIME: </strong> {event.time} </p>
                            <p><strong> CREATOR: </strong> <Link to={`/users/${event.creator._id}`}> {event.creator.username} </Link></p>
                            <p><strong> DESCRIPTION: </strong></p>
                            <p>{event.description}</p>
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={handleShowAssistants}> SEE ASSISTANTS </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <hr />

            {user._id === event.creator._id ?
                (
                    <>
                        <Container className="mt-3 mb-3">
                            <Row>
                                <Col>
                                    <Link to={`/events/${event_id}/edit`}>
                                        <button className="btn btn-dark"> EDIT EVENT </button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Button variant="danger" onClick={handleShow}>DELETE EVENT</Button>
                                </Col>
                            </Row>
                        </Container>

                        <hr />
                    </>
                )
                :
                (
                    <>
                        <Container className="mt-3 mb-3">

                            {
                                !isAssisting ?
                                    (
                                        <button className="btn btn-success" onClick={handleAssist}> ASSIST </button>
                                    )
                                    :
                                    (
                                        <button className="btn btn-danger" onClick={handleNotAssist}> NOT ASSIST </button>
                                    )
                            }

                            <hr className="mt-3" />
                        </Container>

                    </>
                )
            }

            <h3 className="mt-5"> COMMENTS: </h3>

            <Row className="">
                <Col md={{ offset: 3, span: 6 }}>
                    <input className="form-control mt-4 mb-5" type="text" placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <button className="btn btn-primary mb-5" onClick={handleAddComment}> Add Comment </button>
                </Col>
            </Row>

            <Container className="mb-5">
                {comments.length > 0 ?
                    (
                        comments
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((comment) => {
                                let auxDate = new Date(comment.createdAt).toGMTString();
                                return (
                                    <Row key={comment._id} className="mb-3">
                                        <Col> <Link to={`/users/${comment.user._id}`}> <strong> {comment.user.username} </strong></Link> </Col>
                                        <Col> {comment.message} </Col>
                                        <Col>{auxDate}</Col>
                                    </Row>
                                )
                            })
                    )
                    :
                    (
                        <p> No comments yet. </p>
                    )
                }
            </Container>

            <Modal show={showAssistants} onHide={handleCloseAssistants}>
                <Modal.Header closeButton>
                    <Modal.Title>Assistants</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {event.assistants.length > 0 ?
                        (
                            event.assistants.map((assistant) => {
                                return <Link key={assistant._id} className="d-block mb-3" to={`/users/${assistant._id}`}> {assistant.username}</Link>
                            })
                        )
                        :
                        (
                            <p> No assistants yet. </p>
                        )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAssistants}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Confirm Delete </Modal.Title>
                </Modal.Header>
                <Modal.Body> Are you sure you want to delete this event? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Cancel </Button>
                    <Button variant="danger" onClick={handleDeleteEvent}> Delete </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};

export default EventDetailsPage;
