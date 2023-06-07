import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import authService from './../../services/auth.services'
import { useNavigate } from "react-router-dom"
import FormError from '../FormError/FormError'
import uploadServices from '../../services/upload.services';


const RegisterForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        profileImg: undefined
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])


    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleFileUpload = e => {

        setLoadingImage(true)
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setSignupData({ ...signupData, profileImg: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }


    const handleSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => navigate('/'))
            .catch(err => setErrors(err.response.data.errorMessages))
    }


    const { username, password, email } = signupData

    return (

        <Form className="mt-5" onSubmit={handleSubmit}>

            <Form.Group className="mb-4" controlId="email">
                <Form.Label> Email </Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="username">
                <Form.Label> Username </Form.Label>
                <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
                <Form.Label> Password </Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="image">
                <Form.Label> Profile Image </Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <div className='mt-5'>
                {errors.length > 0 && <FormError> {errors.map(elm => <p>{elm}</p>)} </FormError>}
            </div>

            <div className='d-grid mt-5'>
                <Button variant="primary" type="submit" disabled={loadingImage}>{loadingImage ? 'Loading image...' : 'Register'}</Button>
            </div>

        </Form>
    )
}

export default RegisterForm