import './EventCard.css'

import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dateToString } from '../../utils/dateFormat';

const EventCard = ({ imageUrl, name, _id, date, time }) => {

    return (
        <Card>
            <img src={imageUrl} alt='event-img' />
            <Card.Body>
                <Card.Title className='mb-3'> {name} </Card.Title>
                <Card.Text> {dateToString(date)} at {time} </Card.Text>
                <br />
                <Link to={`/events/${_id}`}>
                    <Button className='btn btn-primary'> See Details </Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default EventCard
