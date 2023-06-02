import { Route, Routes } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"

import HomePage from "../pages/HomePage/HomePage"
import EventListPage from "../pages/EventListPage/EventListPage"
import EventDetailsPage from "../pages/EventDetailsPage/EventDetailsPage"
import EventCreatePage from "../pages/EventCreatePage/EventCreatePage"
import RegisterPage from "../pages/RegisterPage/RegisterPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import UserPage from "../pages/UserPage/UserPage"
import EditProfilePage from "../pages/EditProfilePage/EditProfilePage"


const AppRoutes = () => {

    return (
        <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
                <Route path="/feed" element={<p> soy feed </p>} />
                <Route path="/create-event" element={<EventCreatePage />} />
                <Route path="/events" element={<EventListPage />} />
                <Route path="/events/:event_id" element={<EventDetailsPage />} />
                {/* <Route path="/events/:event_id/edit" element={<EventDetailsPage />} /> */}
                <Route path="/users" element={<p> soy useres </p>} />
                <Route path="/users/:user_id" element={<UserPage />} />
                <Route path="/events" element={<p> soy eventos </p>} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/edit" element={<EditProfilePage />} />
            </Route>

            <Route path="*" element={<h1> 404 </h1>} />

        </Routes>
    )
}

export default AppRoutes