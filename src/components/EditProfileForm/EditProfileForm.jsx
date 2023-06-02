import { useContext, useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import FormError from '../FormError/FormError'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import uploadServices from '../../services/upload.services';
import usersService from "../../services/users.services"
import { AuthContext } from "../../contexts/auth.context"

const EditProfileForm = () => {
    const { user } = useContext(AuthContext)

    const [userFounded, setUserFounded] = useState(null)

    const [editedData, setEditedData] = useState({
        username: "",
        email: "",
        profileImg: ""
    })
    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            loadUser()
        }
    }, [user])

    useEffect(() => {
        if (userFounded) {
            setEditedData({
                username: userFounded.username,
                email: userFounded.email,
                profileImg: userFounded.profileImg
            })
        }
    }, [userFounded])

    const loadUser = () => {
        usersService
            .getUserById(user._id)
            .then(res => setUserFounded(res.data))
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.target
        setEditedData({ ...editedData, [name]: value })
    }

    const handleFileUpload = e => {
        setLoadingImage(true)
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setEditedData({ ...editedData, profileImg: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }

    const handleSubmit = e => {
        e.preventDefault()

        usersService
            .updateProfile(editedData)
            .then(() => navigate('/profile'))
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    if (!userFounded) {
        return <LoadingSpinner />
    }

    const { username, email, profileImg } = editedData

    return (
        <Form className="mt-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="email">
                <Form.Label> Email </Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                    name="email"
                />
            </Form.Group>

            <Form.Group className="mb-4" controlId="username">
                <Form.Label> Username </Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={handleInputChange}
                    name="username"
                />
            </Form.Group>

            <Form.Group className="mb-4" controlId="image">
                <Form.Label> Profile Image </Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <div className='mt-5'>
                {errors && errors.length > 0 && <FormError> {errors.map(elm => <p>{elm}</p>)} </FormError>}
            </div>

            <div className='d-grid mt-5'>
                <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Loading image...' : 'Update Profile'}</Button>
            </div>
        </Form>
    )
}

export default EditProfileForm
