import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { dateFormat } from "../../utils/dateFormat"


const EventFilter = ({ filterEvents }) => {

    const [textQuery, setTextQuery] = useState('')
    const [dateQuery, setDateQuery] = useState('')


    const handleSearch = e => {
        const inputValue = e.target.value
        setTextQuery(inputValue)
        filterEvents(inputValue)
    }

    const handleDate = e => {
        const inputValue = e.target.value

        if (!inputValue) {
            filterEvents(null)
            setDateQuery(null)
        } else {
            const dateValue = new Date(inputValue)
            setDateQuery(dateFormat(dateValue))
            filterEvents(dateValue)
        }
    }


    return (
        <Container>
            <Row className="">
                <Col>
                    <input className="form-control mt-4 mb-5" type="text" placeholder="Search..." value={textQuery} onChange={handleSearch} />
                </Col>
                <Col>
                    <input className="form-control mt-4 mb-5" type="date" value={dateQuery} onChange={handleDate} />
                </Col>
            </Row>
        </Container>
    )
}

export default EventFilter