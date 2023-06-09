import { useContext, useEffect, useState } from "react"
import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from '../../components/LoginForm/LoginForm'
import { AuthContext } from "../../contexts/auth.context"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"


const LoginPage = () => {

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

        <Container className="mt-5">
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <h1> Login </h1>
                    <hr />
                    <LoginForm />
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage

