import { useContext, useState } from "react"
import { Form, Button } from "react-bootstrap"
import authService from './../../services/auth.services'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../contexts/auth.context"
import FormError from '../FormError/FormError'


const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState([])


    const navigate = useNavigate()

    const { authenticateUser, storeToken } = useContext(AuthContext)

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                navigate('/feed')
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }


    const { password, email } = loginData

    return (

        <Form className="mt-5" onSubmit={handleSubmit}>

            <Form.Group className="mb-4" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <div className='mt-5'>
                {errors.length > 0 && <FormError> {errors.map(elm => <p>{elm}</p>)} </FormError>}
            </div>

            <div className="d-grid">
                <Button variant="primary" type="submit"> Login </Button>
            </div>

        </Form>
    )
}

export default LoginForm