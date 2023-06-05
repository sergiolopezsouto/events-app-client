import { useContext, useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"


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
        <Container>
            <h1>Home Page</h1>
            <hr />
        </Container>
    )
}

export default HomePage
