import { useContext, useEffect, useState } from 'react'
import { Container, Tabs, Tab, Card } from 'react-bootstrap'
import { AuthContext } from '../../contexts/auth.context'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import usersService from '../../services/users.services'
import eventsService from '../../services/events.services'
import { Link } from 'react-router-dom'
import { dateToString } from '../../utils/dateFormat'


function FeedPage() {

    const { user } = useContext(AuthContext)

    const [userFounded, setUserFounded] = useState()
    const [allEvents, setAllEvents] = useState()

    useEffect(() => {
        loadUser()
        loadEvents()
    }, [user])

    const loadUser = () => {
        usersService
            .getUserById(user._id)
            .then(res => setUserFounded(res.data))
            .catch(err => console.log(err))
    }

    const loadEvents = () => {
        eventsService
            .getEvents()
            .then(res => setAllEvents(res.data))
            .catch(err => console.log(err))
    }



    if (!userFounded || !allEvents) {
        return <LoadingSpinner />
    }

    const followedUserIds = userFounded.following.map(user => user._id);

    return (

        <Container style={{ width: "60%", marginTop: "100px" }}>
            <Tabs defaultActiveKey="assisting" id="justify-tab-example" className="mb-5 mt-5" justify>
                <Tab eventKey="assisting" title="Is assisting">
                    {
                        allEvents
                            .map(event => event.assistants
                                .filter(assistant => followedUserIds.includes(assistant._id))
                                .map(assistant =>
                                    // <Card className='mb-4'>
                                    <p key={assistant._id}>
                                        <Link to={`/users/${assistant._id}`}> <strong>{assistant.username}</strong></Link> is assisting to <Link to={`/events/${event._id}`}><strong>{event.name}</strong></Link> on {dateToString(event.date)} at {event.time}.
                                    </p>
                                    // </Card>
                                )
                            )
                    }
                </Tab>

                <Tab eventKey="created" title="Has created">
                    {
                        allEvents
                            .filter(event => event.creator && followedUserIds.includes(event.creator._id))
                            .map(event =>
                                event.creator && <p key={event._id}>
                                    <Link to={`/users/${event.creator._id}`}> <strong>{event.creator.username}</strong></Link> has created <Link to={`/events/${event._id}`}><strong>{event.name}</strong></Link> on {dateToString(event.date)} at {event.time}.
                                </p>
                            )
                    }
                </Tab>

            </Tabs>
        </Container>
    )
}

export default FeedPage