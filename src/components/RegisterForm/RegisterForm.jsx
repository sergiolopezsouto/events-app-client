import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import authService from './../../services/auth.services'
import { useNavigate } from "react-router-dom"
// import { AuthContext } from "../../contexts/auth.context"


const RegisterForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: ''
    })

    // const { authenticateUser, storeToken } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => navigate('/'))
            // .then(({ data }) => {
            //     // no me deja porque en data no tengo la contraseña
            //     // console.log(data)
            //     // const { user } = data
            //     // const { email, password } = user
            //     // console.log(email, password)
            //     // authService.login({ email, password })
            //     //     .then(({ data }) => {
            //     //         // console.log(data)
            //     //         storeToken(data.authToken)
            //     //         authenticateUser()
            //     //         navigate('/feed')
            //     //     })
            //     //     .catch(err => console.log(err))
            // })
            .catch(err => console.log(err))
    }


    const { username, password, email } = signupData

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label> Email </Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label> Username </Form.Label>
                <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label> Password </Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" type="submit">Registrarme</Button>
            </div>

        </Form>
    )
}

export default RegisterForm