import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import usersService from "../../services/users.services"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

const UserPage = () => {

    const { user } = useContext(AuthContext)
    const { user_id } = useParams()

    const [userFounded, setUserFounded] = useState()
    const [isFollowing, setIsFollowing] = useState(false)


    useEffect(() => {
        usersService
            .getUserById(user_id)
            .then(res => {
                // console.log(res.data._id)
                setUserFounded(res.data)
                setIsFollowing(user?.following.some(elm => elm._id === res.data._id))
            })
            .catch(err => console.log(err))

    }, [user_id, user?._id, user?.following])


    const handleFollow = () => {
        setIsFollowing(true)
        usersService.followUser(user_id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    const handleUnfollow = () => {
        setIsFollowing(false)
        usersService.unfollowUser(user_id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }



    if (!user || !userFounded) {
        return <LoadingSpinner />
    }


    return (
        <Container>

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