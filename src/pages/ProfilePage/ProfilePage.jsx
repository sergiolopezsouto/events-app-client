import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Container, Row, Col } from "react-bootstrap"
import usersService from "../../services/users.services"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

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


    const handleEditProfile = () => {
        alert('edit profile')
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
                    <p><strong> EVENTS CREATED: </strong></p>
                    <p><strong> EVENTS ASSISTED: </strong></p>
                    <p><strong> // role: </strong>{userFounded.role}</p>
                </Col>
            </Row>
            <hr />
            <button className="btn btn-dark" onClick={handleEditProfile}> EDIT PROFILE </button>

        </Container>
    )
}


export default ProfilePage