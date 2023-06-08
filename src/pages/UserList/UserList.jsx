import { useEffect, useState } from "react"
import usersService from "../../services/users.services"
import { Container } from "react-bootstrap"
import { Link } from 'react-router-dom'


const UserList = () => {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = () => {
        usersService
            .getAllUsers()
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    // TODO: DESACOPLAR A UTILS
    const filteredUsers = searchTerm
        ? users?.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
        :
        []

    return (
        <Container style={{ width: "50%" }}>
            <h1> Search People </h1>
            <hr />
            <input className="form-control mt-5 mb-5" type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search users..." />
            {
                filteredUsers?.map(user => (<p key={user._id}> <Link to={`/users/${user._id}`}> {user.username} </Link> </p>))
            }
        </Container>
    )
}

export default UserList
