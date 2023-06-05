import axios from 'axios'

class UserService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`
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



    getUserById(user_id) {
        return this.api.get(`/${user_id}`)
    }

    getUserByUsername(username) {
        return this.api.get(`/${username}`)
    }

    followUser(user_id) {
        return this.api.put(`/followUser/${user_id}`)
    }

    unfollowUser(user_id) {
        return this.api.put(`/unfollowUser/${user_id}`)
    }

    updateProfile(newUserInfo) {
        return this.api.put(`/updateProfile` , newUserInfo)
    }


    // updateUser(userData) {
    //     return this.api.post('/updateUser', userData)
    // }

    // updateEvent(eventData) {
    //     return this.api.put('/updateEvent', eventData)
    // }    
    
    // assistEvent({event_id}) {
    //     return this.api.put('/assistEvent', {event_id})
    // }

    // notAssistEvent({event_id}) {
    //     return this.api.put('/notAssistEvent', {event_id})
    // }

}


const usersService = new UserService()

export default usersService