import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import eventsService from "../../services/events.services";
import { Col, Container, Row } from "react-bootstrap";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../contexts/auth.context";
import { dateToString } from "../../utils/dateFormat";
import MapContainer from "../../components/MapContainer/MapContainer";

const EventDetailsPage = () => {
    const { user } = useContext(AuthContext);
    const { event_id } = useParams();

    const [event, setEvent] = useState();
    const [isAssisting, setIsAssisting] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        eventsService
            .getOneEvent(event_id)
            .then((res) => {
                setEvent(res.data);
                setIsAssisting(
                    res.data.assistants.some((elm) => elm._id === user._id)
                );
                setComments(res.data.comments);
            })
            .catch((err) => console.log(err));
    }, [event_id, user?._id]);


    const handleAssist = () => {
        setIsAssisting(true);
        eventsService
            .assistEvent({ event_id })
            .then(({ data }) =>
                event?.assistants.length !== data.assistants.length && setEvent(data)
            )
            .catch((err) => console.log(err));
    };

    const handleNotAssist = () => {
        setIsAssisting(false);
        eventsService
            .notAssistEvent({ event_id })
            .then(({ data }) =>
                event?.assistants.length !== data.assistants.length && setEvent(data)
            )
            .catch((err) => console.log(err));
    };

    const handleEditEvent = () => alert("editing");

    const handleDeleteEvent = () => {
        eventsService
            .deleteEvent(event_id)
            .then()
            .catch((err) => console.log(err));

        navigate("/events");
    };

    const handleAddComment = () => {
        eventsService
            .addComment(event_id, newComment)
            .then(({ data }) => {
                setComments(data.comments);
                setNewComment("");
            })
            .catch((err) => console.log(err));
    };

    if (!event || !event.assistants) {
        return <LoadingSpinner />;
    }

    return (
        <Container>
            <h1> {event.name} </h1>
            <hr />
            <Row>
                <Col>
                    <MapContainer location={event.location} />
                </Col>

                <Col>
                    <Row>
                        <Col>
                            <p><strong> DATE → </strong> {dateToString(event.date)}</p>
                            <p><strong> TIME → </strong> {event.time}{" "} </p>
                            <p><strong> DESCRIPTION: </strong></p>
                            <p>{event.description}</p>
                        </Col>
                        <Col>
                            <p><strong> CREATOR: </strong>
                                {user._id === event.creator._id ?
                                    (
                                        <Link to={`/profile`}> {event.creator.username} </Link>
                                    )
                                    :
                                    (
                                        <Link to={`/users/${event.creator._id}`}> {event.creator.username} </Link>
                                    )
                                }
                            </p>

                            <p><strong> ASSISTANTS: </strong></p>
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
                        </Col>
                    </Row>
                </Col>
            </Row>

            <hr />

            {user._id === event.creator._id ?
                (
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
                )
                :
                (
                    <>
                        {!isAssisting ? (
                            <button className="btn btn-primary" onClick={handleAssist}>
                                {" "}
                                ASSIST{" "}
                            </button>
                        ) : (
                            <button className="btn btn-danger" onClick={handleNotAssist}>
                                {" "}
                                NOT ASSIST{" "}
                            </button>
                        )}

                        <hr />
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
                                    <p key={comment._id}> <strong> {comment.user.username}: </strong> {comment.message}{auxDate} </p>
                                )
                            })
                    )
                    :
                    (
                        <p>No comments yet.</p>
                    )
                }
            </Container>

        </Container>
    );
};

export default EventDetailsPage;
