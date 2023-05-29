import { useContext } from "react"
import { AuthContext } from "./../contexts/auth.context"

import { Navigate, Outlet } from 'react-router-dom'
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"

const PrivateRoute = () => {

    const { user, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}

export default PrivateRoute