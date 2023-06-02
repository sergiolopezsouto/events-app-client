import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import eventsService from '../../services/events.services'
import EventList from '../../components/EventList/EventList'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import EventFilter from '../../components/EventFilter/EventFilter'
import { dateFormat } from '../../utils/dateFormat'


const EventsPage = () => {

    const [events, setEvents] = useState()
    const [eventsBackup, setEventsBackup] = useState()

    useEffect(() => {
        loadEvents()
    }, [])

    const loadEvents = () => {
        eventsService
            .getEvents()
            .then(res => {
                setEvents(res.data)
                setEventsBackup(res.data)
            })
            .catch(err => console.log(err))
    }

    const filterEvents = query => {

        if (typeof query == "string") {
            const filterEvents = eventsBackup.filter(elm => elm.name.toLowerCase().includes(query.toLowerCase()))
            setEvents(filterEvents)
        }

        if (query instanceof Date) {
            const formattedQuery = dateFormat(query)
            const filteredEvents = eventsBackup.filter(elm => dateFormat(new Date(elm.date)) === formattedQuery)
            setEvents(filteredEvents)
        }

        if (query === null) {
            setEvents(eventsBackup);
        }

    }


    if (!events) {
        return <LoadingSpinner />
    }

    return (
        <Container>
            <h1> Events: </h1>
            {/* <hr /> */}
            <EventFilter filterEvents={filterEvents} />
            {/* <hr /> */}
            <Row>
                <EventList events={events} />
            </Row>
        </Container>
    )
}

export default EventsPage