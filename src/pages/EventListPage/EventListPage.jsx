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
            const filterEvents = eventsBackup.filter(elm => elm.name.includes(query))
            setEvents(filterEvents)
        }

        // if (typeof query == "date") {
        //     const filterEvents = eventsBackup.filter(elm => {
        //         console.log(dateFormat(new Date(elm.date)), dateFormat(query))
        //         // elm.date === query
        //     })

        //     setEvents(filterEvents)
        // }

        if (query instanceof Date) { // Verificar si query es una instancia de Date
            const formattedQuery = dateFormat(query); // Formatear la fecha seleccionada
            const filteredEvents = eventsBackup.filter(elm => dateFormat(new Date(elm.date)) === formattedQuery);
            setEvents(filteredEvents);
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