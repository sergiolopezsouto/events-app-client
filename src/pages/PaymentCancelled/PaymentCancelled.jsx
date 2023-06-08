import { Button, Container, Card, Alert } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const PaymentCancelled = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const event_id = queryParams.get('eventId');

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: "10%" }}>
            <Card style={{ width: '35rem', textAlign: 'center' }}>
                <Card.Body>
                    <Card.Title><h1 style={{ color: '#F44336', marginBottom: "8%" }}>Payment Cancelled!</h1></Card.Title>
                    <Card.Text>
                        <Alert variant='danger'>
                            Your transaction has been cancelled. You can still go back to the event and try making the payment again.
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

export default PaymentCancelled;
