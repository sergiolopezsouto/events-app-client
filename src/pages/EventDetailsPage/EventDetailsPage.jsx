import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import eventsService from "../../services/events.services"
import { Container } from "react-bootstrap"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

const EventDetailsPage = () => {

    const { event_id } = useParams()

    const [event, setEvent] = useState()

    useEffect(() => {
        eventsService.getOneEvent(event_id)
            .then(res => setEvent(res.data))
            .catch(err => console.log(err))
    }, [])


    if (!event) {
        return <LoadingSpinner />
    }

    return (
        <Container>
            <h1> {event.name} </h1>
            <hr />
            {event.creator && <p><strong>CREATOR: </strong> {event.creator} </p>}
            <p><strong>DESCRIPTION: </strong> {event.description} </p>
            <button className="btn btn-primary"> ASSIST </button>
            <button className="btn btn-danger"> NOT ASSIST </button>
        </Container>
    )
}

export default EventDetailsPage