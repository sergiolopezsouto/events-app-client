import { useContext, useEffect, useState } from "react"
import { Container, Row, Col } from 'react-bootstrap'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import { AuthContext } from "../../contexts/auth.context"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"


const RegisterPage = () => {

    const [isLogged, setIsLogged] = useState(false)
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()


    useEffect(() => {
        if (user) {
            navigate("/feed")
        } else {
            setIsLogged(true)
        }
    }, [user, navigate])


    if (!isLogged) {
        return <LoadingSpinner />
    }

    return (

        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <h1>Register</h1>
                    <hr />
                    <RegisterForm />
                </Col>
            </Row>
        </Container>

    )
}

export default RegisterPage
