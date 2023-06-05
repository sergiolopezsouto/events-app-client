import './EventCard.css'

import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dateToString } from '../../utils/dateFormat';

const EventCard = ({ imageUrl, name, _id, date, time }) => {

    return (
        <Card className='mb-5'>
            <img src={imageUrl} alt='event-img' />
            {/* <Card.Img variant="top" src={imageUrl} style={{ width: '30%' }} /> */}
            <Card.Body>
                <Card.Title className='mb-3'> {name} </Card.Title>
                {/* <Card.Subtitle className=''> {dateToString(date)} at {time} </Card.Subtitle> */}
                <Card.Text> {dateToString(date)} at {time} </Card.Text>
                {/* <Link to={`/events/${_id}`}> See Details </Link> */}
                <br />
                <Link to={`/events/${_id}`}>
                    <Button className='btn btn-primary'> See Details </Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default EventCard
