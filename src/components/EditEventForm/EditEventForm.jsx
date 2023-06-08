import { useContext, useEffect, useRef, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap/'
import eventsService from '../../services/events.services'
import { useNavigate, useParams } from 'react-router-dom'
import FormError from '../FormError/FormError'
import uploadServices from '../../services/upload.services'
import { Autocomplete } from '@react-google-maps/api'
import { dateFormat } from '../../utils/dateFormat'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'


const EditEventForm = () => {

    const { event_id } = useParams()

    const [eventFounded, setEventFounded] = useState(null)

    const navigate = useNavigate()
    const autocompleteRef = useRef()

    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        // date: new Date().toISOString().slice(0, 10),
        date: '',
        time: '',
        location: { address: '', latitude: null, longitude: null },
        price: '',
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState()


    useEffect(() => {
        if (event_id) {
            eventsService
                .getOneEvent(event_id)
                .then(res => setEventFounded(res.data))
                .catch(err => console.log(err))
        }
    }, [event_id])


    useEffect(() => {
        if (eventFounded) {
            setEventData({
                name: eventFounded.name,
                description: eventFounded.description,
                imageUrl: eventFounded.imageUrl,
                // date: new Date().toISOString().slice(0, 10),
                date: eventFounded.date,
                time: eventFounded.time,
                location: eventFounded.location,
                price: eventFounded.price,
            })
        }
    }, [eventFounded])



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
            .updateEvent(event_id, eventData)
            .then((res) => navigate(`/events/${eventFounded._id}`))
            .catch(err => setErrors(err.response.data.errorMessages))
    }



    if (!eventFounded) {
        return <LoadingSpinner />
    }

    return (

        <Form className="mt-5" onSubmit={handleSubmit}>

            <Form.Group className="mb-4" controlId="eventName">
                <Form.Label> Event Name </Form.Label>
                <Form.Control type="text" placeholder="Enter event name here" name="name" value={eventData.name} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="eventDescription">
                <Form.Label> Description </Form.Label>
                <Form.Control type="text" placeholder="Enter event description here" name="description" value={eventData.description} onChange={handleInputChange} />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group className="mb-4" controlId="eventDate">
                        <Form.Label> Date </Form.Label>
                        <Form.Control type="date" name="date" value={dateFormat(new Date(eventData.date))} onChange={handleInputChange} />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-4" controlId="eventTime">
                        <Form.Label> Time </Form.Label>
                        <Form.Control type="time" name="time" value={eventData.time} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-4" controlId="eventDate">
                        <Form.Label> Price </Form.Label>
                        <Form.Control type="number" name="price" value={eventData.price} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
            </Row>

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
                        <Form.Control type="text" placeholder="Enter event location here" name="location" ref={autocompleteRef} defaultValue={eventFounded.location.address} />
                    </Autocomplete>
                </Form.Group>
            </Row>

            <Form.Group className="mb-4" controlId="image">
                <Form.Label> Image </Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <div className='mt-5'>
                {errors && errors.length > 0 && <FormError> {errors.map(elm => <p>{elm}</p>)} </FormError>}
            </div>

            <div className='d-grid mt-5'>
                <Button variant="primary" type="submit" disabled={loadingImage}>{loadingImage ? 'Loading image...' : 'Update Event'}</Button>
            </div>

        </Form>

    )
}


export default EditEventForm
