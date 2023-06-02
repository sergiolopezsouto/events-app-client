import { useRef, useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap/';
import eventsService from '../../services/events.services';
import { useNavigate } from 'react-router-dom';
import FormError from '../FormError/FormError';
import uploadServices from '../../services/upload.services';
import { Autocomplete } from '@react-google-maps/api';



const EventForm = () => {

    const navigate = useNavigate()
    const autocompleteRef = useRef()

    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        imageUrl: undefined,
        // date: new Date().toISOString().slice(0, 10),
        date: undefined,
        time: undefined,
        location: null,
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const [mapLoaded, setMapLoaded] = useState(false);
    const [errors, setErrors] = useState([])

    useEffect(() => {

        const googleMapsScript = document.createElement('script');
        googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBRgKaKfGaksL3PDZ-uWmOsj-PCBgJSE-E&libraries=places`;
        googleMapsScript.async = true;
        googleMapsScript.defer = true;
        googleMapsScript.onload = () => {
            setMapLoaded(true);
            document.body.appendChild(googleMapsScript);
        }

    }, []);


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

    const handlePlaceSelect = (place) => {
        const address = place.formatted_address;
        const latitude = place.geometry.location.lat()
        const longitude = place.geometry.location.lng()

        setEventData({ ...eventData, location: { address, latitude, longitude } })
    }


    const handleSubmit = event => {
        event.preventDefault()

        eventsService
            .saveEvent(eventData)
            .then(({ data }) => navigate(`/events/${data._id}`))
            .catch(err => setErrors(err.response.data.errorMessages))
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

            {/* TODO juntar en un solo input que sea buscador de sitios con la api de google maps */}
            <Row>
                <Form.Group className="mb-4" controlId="eventLocation">
                    <Form.Label> Location </Form.Label>
                    <Autocomplete
                        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                        onPlaceChanged={() => {
                            const place = autocompleteRef.current.getPlace();
                            handlePlaceSelect(place);
                        }}
                    >
                        <Form.Control type="text" placeholder="Enter event location here" name="location" ref={autocompleteRef} />
                    </Autocomplete>
                </Form.Group>

                {/* <Col>
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
                </Col> */}
            </Row>

            {/* TODO pensar si quitar la imagen y dejar solamente el mapa */}
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
