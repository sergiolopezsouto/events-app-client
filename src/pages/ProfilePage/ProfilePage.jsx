import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"

import { Container } from "react-bootstrap"
// import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    return (
        <Container>
            <h1> Hello {user.username} </h1>
            <hr />
            <img src={user.profileImg} alt="profile-image" />
        </Container>
    )
}


export default ProfilePage