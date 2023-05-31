import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Container, Row, Col } from "react-bootstrap"

const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    return (
        <Container>

            <h1> Hello, {user.username} </h1>
            <hr />
            <Row>
                <Col>
                    <img src={user.profileImg} alt="profile-img" style={{ width: "35%" }} />
                </Col>
                <Col>
                    <p><strong> EVENTS CREATED: </strong></p>
                    <p><strong> EVENTS ASSISTED: </strong></p>
                </Col>
            </Row>
            <hr />
            <button className="btn btn-dark"> EDIT PROFILE </button>

        </Container>
    )
}


export default ProfilePage