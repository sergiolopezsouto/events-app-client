import { Button, Container, Card, Alert } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import eventsService from '../../services/events.services';

const PaymentSuccess = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const event_id = queryParams.get('eventId');

    eventsService
        .assistEvent({ event_id })
        .then()
        .catch((err) => console.log(err))

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: "10%" }}>
            <Card style={{ width: '35rem', textAlign: 'center' }}>
                <Card.Body>
                    <Card.Title><h1 style={{ color: '#4CAF50', marginBottom: "8%" }}>Payment Successful!</h1></Card.Title>
                    <Card.Text>
                        <Alert variant='success'>
                            Thank you for your purchase. Your transaction has been completed, and a receipt for your purchase has been emailed to you.
                            You may log into your account to view details of this event in the My Events section.
                        </Alert>
                        <p style={{ marginTop: "8%", marginBottom: "8%" }}>Event ID: {event_id}</p>
                    </Card.Text>
                    <Link to={`/events/${event_id}`}>
                        <Button variant='primary'>Return to Event</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Container >
    );
}

export default PaymentSuccess;
