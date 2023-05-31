import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap/';
import eventsService from '../../services/events.services';
import { useNavigate } from 'react-router-dom';
import FormError from '../FormError/FormError';
import uploadServices from '../../services/upload.services';


const EventForm = () => {

    const navigate = useNavigate()

    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        // date: new Date().toISOString().slice(0, 10),
        date: undefined,
        time: undefined,
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])


    const handleInputChange = event => {
        const { name, value } = event.target
        setEventData({ ...eventData, [name]: value })
    }

    const handleFileUpload = e => {

        setLoadingImage(true)
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setEventData({ ...eventData, imageUrl: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }


    const handleSubmit = event => {
        event.preventDefault()

        eventsService.saveEvent(eventData)
            .then(newEvent => navigate(`/events/${newEvent.data._id}`)) // preguntarle a german si mejor que desde el server devuelva el res.data directamente
            // .catch(err => setErrors(err.response.data.errorMessages))
            .catch(err => console.log(err.response.data.errorMessages))
    }


    return (

        <Form className="mt-5" onSubmit={handleSubmit}>

            <Form.Group className="mb-4" controlId="eventName">
                <Form.Label> Event Name </Form.Label>
                <Form.Control type="text" placeholder="Enter event name here" name="name" value={eventData.name} onChange={handleInputChange} />
                {/* <Form.Text className="text-muted"> We'll never share your email with anyone else. </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-4" controlId="eventDescription">
                <Form.Label> Description </Form.Label>
                <Form.Control type="text" placeholder="Enter event description here" name="description" value={eventData.description} onChange={handleInputChange} />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group className="mb-4" controlId="eventDate">
                        <Form.Label> Date </Form.Label>
                        <Form.Control type="date" name="date" value={eventData.date} onChange={handleInputChange} />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-4" controlId="eventTime">
                        <Form.Label> Time </Form.Label>
                        <Form.Control type="time" name="time" value={eventData.time} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
            </Row>

            {/* juntar en un solo input que sea buscador de sitios con la api de google maps */}
            <Row>
                <Col>
                    <Form.Group className="mb-4" controlId="eventLatitude">
                        <Form.Label> Latitude </Form.Label>
                        <Form.Control type="text" name="latitude" value={eventData.description} onChange={handleInputChange} />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-4" controlId="eventLongitude">
                        <Form.Label> Longitude </Form.Label>
                        <Form.Control type="text" name="logitude" value={eventData.description} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
            </Row>

            {/* pensar si quitar la imagen y dejar solamente el mapa */}
            <Form.Group className="mb-4" controlId="image">
                <Form.Label> Image </Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <div className='mt-5'>
                {errors.length > 0 && <FormError> {errors.map(elm => <p>{elm}</p>)} </FormError>}
            </div>

            <div className='d-grid mt-5'>
                <Button variant="primary" type="submit" disabled={loadingImage}>{loadingImage ? 'Loading image...' : 'Create Event'}</Button>
            </div>

        </Form>

    )
}


export default EventForm
