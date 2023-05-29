import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"

import { Container } from "react-bootstrap"
// import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

const ProfilePage = () => {

    const { user } = useContext(AuthContext)


    // if (!user) {
    //     return <LoadingSpinner />
    // }


    return (
        <Container>
            <h1> Hello {user.username} </h1>
            <hr />
        </Container>
    )
}


export default ProfilePage