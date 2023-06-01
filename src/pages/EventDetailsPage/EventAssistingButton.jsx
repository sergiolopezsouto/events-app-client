import { useState } from "react"
import eventsService from "../../services/events.services"

const EventAssistingButton = () => {
    // TODO: ENGANACHAR A PAGINA

    const [isAssisting, setIsAssisting] = useState(false)

    const handleAssist = () => {
        setIsAssisting(true)
        eventsService
            .assistEvent({ event_id })
            .then(({ data }) => event?.assistants.length != data.assistants.length && setEvent(data))
            .catch(err => console.log(err))
    }

    const handleNotAssist = () => {
        setIsAssisting(false)
        eventsService
            .notAssistEvent({ event_id })
            .then(({ data }) => event?.assistants.length != data.assistants.length && setEvent(data))
            .catch(err => console.log(err))
    }

    return (
        !isAssisting ? <button className="btn btn-primary" onClick={handleAssist}> ASSIST </button> : <button className="btn btn-danger" onClick={handleNotAssist}> NOT ASSIST </button>
    )
}


export default EventAssistingButton