import { Col } from "react-bootstrap"
import EventCard from "../EventCard/EventCard"

const EventList = ({ events }) => {

    return (
        events.map(event => {
            return (
                <Col md={{ span: 6 }} lg={{ span: 4 }} key={event._id}>
                    <EventCard key={event._id} {...event} />
                </Col>
            )
        })
    )
}


export default EventList