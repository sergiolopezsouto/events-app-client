import { useState } from 'react';
import { Form, Button } from 'react-bootstrap/';
import eventsService from '../../services/events.services';
import { useNavigate } from 'react-router-dom';
import FormError from '../FormError/FormError';


const EventForm = () => {

    const navigate = useNavigate()

    const [eventData, setEventData] = useState({
        name: '',
        description: '',
    })

    // const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])


    const handleInputChange = event => {
        const { name, value } = event.target
        setEventData({ ...eventData, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()

        eventsService.saveEvent(eventData)
            .then(newEvent => navigate(`/events/${newEvent.data._id}`)) // preguntarle a german si mejor que desde el server devuelva el res.data directamente
            .catch(err => setErrors(err.response.data.errorMessages))
    }


    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="eventName">
                <Form.Label> Event Name </Form.Label>
                <Form.Control type="text" placeholder="Enter event name here" name="name" value={eventData.name} onChange={handleInputChange} />
                <Form.Text className="text-muted"> We'll never share your email with anyone else. </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="eventDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter event description here" name="description" value={eventData.description} onChange={handleInputChange} />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="eventCheckInfo">
                <Form.Check type="checkbox" label="All info is correct?" />
            </Form.Group> */}

            <div className='mt-5'>
                {errors.length > 0 && <FormError> {errors.map(elm => <p>{elm}</p>)} </FormError>}
            </div>


            <div className='d-grid mt-5'>
                <Button variant="primary" type="submit"> Create Event </Button>
            </div>

        </Form>

    )
}


export default EventForm
