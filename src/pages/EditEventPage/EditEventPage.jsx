import { Container, Row, Col } from 'react-bootstrap'
import EditEventForm from '../../components/EditEventForm/EditEventForm'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { useNavigate, useParams } from 'react-router-dom'
import eventsService from '../../services/events.services'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'


const EditEventPage = () => {

    const { user } = useContext(AuthContext)
    const { event_id } = useParams()
    const navigate = useNavigate()
    const [isCreator, setIsCreator] = useState(false)


    useEffect(() => {
        if (event_id) {
            eventsService
                .getOneEvent(event_id)
                .then(res => {
                    if (res.data.creator._id !== user._id) {
                        navigate(`/events/${event_id}`)
                    } else {
                        setIsCreator(true)
                    }
                })
                .catch(err => console.log(err))
        }
    }, [event_id, user._id, navigate])



    if (!isCreator) {
        return <LoadingSpinner />
    }

    return (

        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <h1> Edit event </h1>
                    <hr />
                    <EditEventForm />
                </Col>
            </Row>
        </Container>

    )
}

export default EditEventPage