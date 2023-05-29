import { Container } from 'react-bootstrap'
import EventForm from '../../components/EventForm/EventForm'

const EventCreatePage = () => {

    return (

        <Container>
            <h1> new event </h1>
            <hr />
            <EventForm />
        </Container>

    )
}

export default EventCreatePage