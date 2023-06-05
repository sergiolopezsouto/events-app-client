import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Col, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import usersService from "../../services/users.services"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

const UserPage = () => {

    const { user } = useContext(AuthContext)
    const { user_id } = useParams()
    const navigate = useNavigate()

    const [userFounded, setUserFounded] = useState()
    const [isFollowing, setIsFollowing] = useState(false)


    useEffect(() => {

        if (user._id === user_id) {
            navigate('/profile', { replace: true })
        }

        usersService
            .getUserById(user_id)
            .then(res => setUserFounded(res.data))
            .catch(err => console.log(err))

        if (user && user._id) {
            usersService
                .getUserById(user._id)
                .then(res => setIsFollowing(res.data.following.some(elm => elm._id === user_id)))
                .catch(err => console.log(err))
        }

    }, [user, user_id, navigate])


    const handleFollow = () => {
        setIsFollowing(true)
        usersService
            .followUser(user_id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    const handleUnfollow = () => {
        setIsFollowing(false)
        usersService
            .unfollowUser(user_id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }



    if (!user || !userFounded) {
        return <LoadingSpinner />
    }


    return (
        <Container>
            {/* TODO: DESACOPLAR BOTON */}
            <h1> {userFounded.username} </h1>
            <hr />
            <Row>
                <Col>
                    <img src={userFounded.profileImg} alt="profile-img" style={{ width: "35%" }} />
                </Col>
                <Col>

                    {
                        !isFollowing ? <button className="btn btn-success" onClick={handleFollow}> FOLLOW </button> : <button className="btn btn-danger" onClick={handleUnfollow}> UNFOLLOW </button>
                    }

                </Col>
            </Row>
            <hr />

        </Container>
    )
}


export default UserPage