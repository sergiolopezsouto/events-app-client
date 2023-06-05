import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Container, Row, Col } from "react-bootstrap"
import usersService from "../../services/users.services"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { Link } from "react-router-dom"

const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    const [userFounded, setUserFounded] = useState()

    useEffect(() => {
        loadUser()
    }, [user])

    const loadUser = () => {
        usersService
            .getUserById(user._id)
            .then(res => setUserFounded(res.data))
            .catch(err => console.log(err))
    }



    if (!userFounded) {
        return <LoadingSpinner />
    }

    return (
        <Container>

            <h1> Hello, {userFounded.username} </h1>
            <hr />
            <Row>
                <Col>
                    <img src={userFounded.profileImg} alt="profile-img" style={{ width: "35%" }} />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <p><strong> EVENTS CREATED (modal): </strong></p>
                        </Col>
                        <Col>
                            <p><strong> EVENTS ASSISTED (modal): </strong></p>
                        </Col>
                        <Col>
                            <p><strong> FOLLOWING (modal): </strong></p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <hr />
            <Link to={'/profile/edit'}>
                <button className="btn btn-dark"> EDIT PROFILE </button>
            </Link>

        </Container>
    )
}


export default ProfilePage