import { Container, Row, Col } from 'react-bootstrap'
import EventForm from '../../components/EventForm/EventForm'

const EventCreatePage = () => {

    return (

        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <h1> Create a new event </h1>
                    <hr />
                    <EventForm />
                </Col>
            </Row>
        </Container>

    )
}

export default EventCreatePage