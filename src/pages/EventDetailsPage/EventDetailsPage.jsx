import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import eventsService from "../../services/events.services";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../contexts/auth.context";
import { dateToString } from "../../utils/dateFormat";
import MapContainer from "../../components/MapContainer/MapContainer";
import { loadStripe } from '@stripe/stripe-js';


const EventDetailsPage = () => {
    const { user } = useContext(AuthContext);
    const { event_id } = useParams();
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const [paymentSuccessful, setPaymentSuccessful] = useState();

    const [event, setEvent] = useState();
    const [isAssisting, setIsAssisting] = useState(false)
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([])
    const [show, setShow] = useState(false);
    const [showAssistants, setShowAssistants] = useState(false);
    const [showNotAssistConfirm, setShowNotAssistConfirm] = useState(false);

    // TODO: CREAR VENTANA MODAL ÚNICA DINAMIZANDO HEADER, BODY Y FOOTER
    // const [modalContent, setModalContent] = useState('assistants')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseAssistants = () => setShowAssistants(false);
    const handleShowAssistants = () => setShowAssistants(true);
    const handleCloseNotAssistConfirm = () => setShowNotAssistConfirm(false);
    const handleShowNotAssistConfirm = () => setShowNotAssistConfirm(true);


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
    }, [event_id, user?._id, paymentSuccessful])

    useEffect(() => {
        if (paymentSuccessful) {
            setIsAssisting(true);
        }
    }, [paymentSuccessful]);


    const handleAssist = () => {
        setIsAssisting(true)
        eventsService
            .assistEvent({ event_id })
            .then(({ data }) => event?.assistants.length !== data.assistants.length && setEvent(data))
            .catch((err) => console.log(err))
    }

    const handleNotAssist = () => {
        handleShowNotAssistConfirm();
    }

    const confirmNotAssist = () => {
        setIsAssisting(false);
        eventsService
            .notAssistEvent({ event_id })
            .then(({ data }) => event?.assistants.length !== data.assistants.length && setEvent(data))
            .catch((err) => console.log(err))
        handleCloseNotAssistConfirm();
    }



    // const handleNotAssist = () => {
    //     setIsAssisting(false);
    //     eventsService
    //         .notAssistEvent({ event_id })
    //         .then(({ data }) => event?.assistants.length !== data.assistants.length && setEvent(data))
    //         .catch((err) => console.log(err))
    // }

    const handleDeleteEvent = () => {
        eventsService
            .deleteEvent(event_id)
            .then(() => {
                handleClose();
                navigate("/events");
            })
            .catch((err) => console.log(err))
    }

    const handleAddComment = () => {
        eventsService
            .addComment(event_id, newComment)
            .then(({ data }) => {
                setComments(data.comments)
                setNewComment("");
            })
            .catch((err) => console.log(err))
    }

    const handleCheckout = async () => {
        const stripe = await stripePromise;

        const response = await fetch('http://localhost:5005/api/stripe/create-checkout-session', {
            method: 'POST',
            body: JSON.stringify({
                success_url: `${window.location.origin}/events/${event_id}`,
                price: event.price * 100,
                event_name: event.name,
                event_id: event._id,
                user_id: user._id,
                image_url: event.imageUrl
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            alert(result.error.message);
        } else {
            handleAssist();
            setPaymentSuccessful(true)
        }
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
                            {
                                event.price === 0 ?
                                    <p><strong> PRICE: </strong> FREE </p>
                                    :
                                    <p><strong> PRICE: </strong> {event.price} USD </p>
                            }
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
                    <Container className="mt-4 mb-4">
                        <Row>
                            <Col>
                                <Link to={`/events/${event_id}/edit`}>
                                    <button className="btn btn-dark"> EDIT EVENT </button>
                                </Link>
                            </Col>
                            <Col>
                                <Button variant="danger" onClick={handleShow}> DELETE EVENT </Button>
                            </Col>
                        </Row>
                    </Container>
                )
                :
                (
                    <Container className="mt-4 mb-4">
                        {
                            !isAssisting ?
                                (
                                    <>
                                        {
                                            event.price ?
                                                <button className="btn btn-dark" onClick={handleCheckout}> PAY TO ASSIST </button>
                                                :
                                                <button className="btn btn-success" onClick={handleAssist}> ASSIST </button>
                                        }
                                    </>
                                )
                                :
                                (
                                    <button className="btn btn-danger" onClick={handleNotAssist}> NOT ASSIST </button>
                                )
                        }
                    </Container>
                )
            }


            <hr />


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


            {/* ---------------- ALL MODALS ---------------- */}
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

            <Modal show={showNotAssistConfirm} onHide={handleCloseNotAssistConfirm}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Not Assist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        event.price === 0 ?
                            <p>This is a free event.</p> :
                            <p>This event cost {event.price} USD. Remember that you will not be refunded.</p>
                    }
                    Do you want to indicate that you will not assist this event?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseNotAssistConfirm}>Cancel</Button>
                    <Button variant="danger" onClick={confirmNotAssist}>Not Assist</Button>
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
