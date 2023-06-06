import { useContext, useEffect, useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
// import Spline from '@splinetool/react-spline'
// import { Application } from "@splinetool/runtime";


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

    // useEffect(() => {
    //     if (isLogged) {
    //         const canvas = document.getElementById("canvas3d");
    //         const app = new Application(canvas);
    //         app.load("https://prod.spline.design/GMQvBU5qnCiH4SKu/scene.splinecode");

    //         return () => {
    //             app.destroy();
    //         };
    //     }
    // }, [isLogged]);


    if (!isLogged) {
        return <LoadingSpinner />
    }

    return (
        <Container style={{ marginTop: "200px" }}>
            <Row>
                <Col md={6}>
                    <h1 className="mb-5">Home Page</h1>
                    <p className="mb-5">asdbfhasgfhagsdkfhhagdshjfgh</p>
                    <Row className="mt-5">
                        <Col>
                            <Button className='btn btn-primary'> Register </Button>
                        </Col>
                        <Col>
                            <Button className='btn btn-primary'> Login </Button>
                        </Col>
                    </Row>
                </Col>
                <Col md={6}>
                    <h1>3D</h1>
                    {/* <canvas id="canvas3d"></canvas> */}
                    {/* <canvas id="canvas3d" style={{ height: "500px" }}></canvas> */}

                </Col>
            </Row>
        </Container>
    )
}

export default HomePage
