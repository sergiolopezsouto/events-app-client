import './EventCard.css'

import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {

    return (
        <Card className='mb-5'>
            <Card.Img variant="top" src={event.imageUrl} style={{ width: '30%' }} />
            <Card.Body>
                <Card.Title> {event.name} </Card.Title>
                <Card.Subtitle className=''> 28 mar , from 17:00 to 22:00 </Card.Subtitle>
                <Card.Text className='mb-5'> 28 mar , from 17:00 to 22:00 </Card.Text>
                <Link to={`/events/${event._id}`}> See Details </Link>
                <br />
                <Link to={`/events/${event._id}`}>
                    <Button className='btn btn-primary'> See Details </Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default EventCard
