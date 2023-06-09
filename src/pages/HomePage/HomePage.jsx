import { useContext, useEffect, useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import { Link, useNavigate } from "react-router-dom"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import Spline from '@splinetool/react-spline'
import logo from '../../assets/logo3.png'


const HomePage = () => {

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
        <Container style={{ marginTop: "100px" }}>
            <Row>
                <Col sm={12} md={6} style={{ marginTop: "50px" }}>

                    <img src={logo} alt="logo-img" style={{ width: "100%", marginBottom: "5px" }} />
                    {/* <h1 className="mb-5"> EVENTS APP </h1> */}
                    <h3 className="mb-4"> Look for a plan near you </h3>
                    <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, deleniti? Sed facilis itaque ipsum quibusdam similique iusto vel, cum culpa repellat tenetur laboriosam voluptatem vitae enim laudantium tempora in odio?</p>
                    <Row className="mt-5">
                        <Col>
                            <Link to={'/register'}>
                                <Button className='btn btn-primary' style={{ padding: "3%", paddingInline: "9%" }}> Register </Button>
                            </Link>
                        </Col>
                        <Col>
                            <Link to={'/login'}>
                                <Button className='btn btn-primary' style={{ padding: "3%", paddingInline: "9%" }}> Login </Button>
                            </Link>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} >
                    {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Spline scene="https://prod.spline.design/GMQvBU5qnCiH4SKu/scene.splinecode" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }} />
                    </div> */}
                    <div style={{ justifyContent: 'left' }}>
                        <Spline scene="https://prod.spline.design/8ooMk25lNm7YPJ1B/scene.splinecode" />
                    </div>

                </Col>
            </Row>
        </Container>
    )
}

export default HomePage
