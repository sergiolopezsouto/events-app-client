import axios from 'axios'

class EventService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/events`
        })

        // token available on server in any request
        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");
            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })

    }


    getEvents() {
        return this.api.get('/getAllEvents')
    }

    getOneEvent(event_id) {
        return this.api.get(`/getOneEvent/${event_id}`)
    }

    saveEvent(eventData) {
        return this.api.post('/saveEvent', eventData)
    }

    updateEvent(eventData) {
        return this.api.put('/updateEvent', eventData)
    }    

    deleteEvent(event_id) {
        return this.api.delete(`/deleteEvent/${event_id}`)
    }  
    
    assistEvent({event_id}) {
        return this.api.put('/assistEvent', {event_id})
    }

    notAssistEvent({event_id}) {
        return this.api.put('/notAssistEvent', {event_id})
    }

    addComment = (event_id, comment) => {
        return this.api.post(`/${event_id}/comments`, { comment });
    }


}


const eventsService = new EventService()

export default eventsService