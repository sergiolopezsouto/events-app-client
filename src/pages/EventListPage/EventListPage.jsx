import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import eventsService from '../../services/events.services'
import EventList from '../../components/EventList/EventList'


const EventsPage = () => {

    const [events, setEvents] = useState()

    useEffect(() => {
        eventsService.getEvents()
            .then(res => setEvents(res.data))
            .catch(err => console.log(err))
    }, [])


    return (
        <Container>
            <h1>Events: </h1>
            <hr />
            <strong> --------- FILTERS --------- </strong>
            <hr />
            <Row>
                <EventList events={events} />
            </Row>
        </Container>
    )
}

export default EventsPage