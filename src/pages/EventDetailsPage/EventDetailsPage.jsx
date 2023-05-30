import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import eventsService from "../../services/events.services"
import { Container } from "react-bootstrap"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { AuthContext } from "../../contexts/auth.context"

const EventDetailsPage = () => {

    const { user } = useContext(AuthContext)

    const { event_id } = useParams()

    const [event, setEvent] = useState()
    const [isAssisting, setIsAssisting] = useState(false)


    useEffect(() => {
        eventsService.getOneEvent(event_id)
            .then(res => {
                setEvent(res.data)
                setIsAssisting(res.data.assistants.includes(user?._id))
            })
            .catch(err => console.log(err))
    }, [event_id, user?._id])


    useEffect(() => {

        if (isAssisting) {
            eventsService
                .assistEvent({ event_id })
                .then(({ data }) => event.assistants.length != data.assistants.length && setEvent(data))
                .catch(err => console.log(err))
        }

        if (!isAssisting) {
            eventsService
                .notAssistEvent({ event_id })
                .then(({ data }) => event.assistants.length != data.assistants.length && setEvent(data))
                .catch(err => console.log(err))
        }

    }, [isAssisting])



    if (!event) {
        return <LoadingSpinner />
    }


    const handleAssist = () => {

        setIsAssisting(!isAssisting)

    }



    return (
        <Container>

            <h1> {event.name} </h1>
            <hr />
            {event.creator && <p><strong> CREATOR: </strong> {event.creator.username} </p>}
            <p><strong> DESCRIPTION: </strong> {event.description} </p>
            <img src={event.imageUrl} alt="event-img" />

            <p><strong> ASSISTANTS: </strong></p>
            {event.assistants.length > 0 ? (
                event.assistants.map(assistant => (
                    <Link key={assistant._id} className="d-block mb-3" to={`/users/${assistant._id}`}> {assistant.username} </Link>
                ))
            ) : (
                <p>No assistants yet.</p>
            )}

            {
                !isAssisting ? <button className="btn btn-primary" onClick={handleAssist}> ASSIST </button> : <button className="btn btn-danger" onClick={handleAssist}> NOT ASSIST </button>
            }

        </Container>
    )
}

export default EventDetailsPage