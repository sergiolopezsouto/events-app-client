import { Route, Routes } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"

import HomePage from "../pages/HomePage/HomePage"
import EventListPage from "../pages/EventListPage/EventListPage"
import EventDetailsPage from "../pages/EventDetailsPage/EventDetailsPage"
import EventCreatePage from "../pages/EventCreatePage/EventCreatePage"
import RegisterPage from "../pages/RegisterPage/RegisterPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"


const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<p> soy feed </p>} />
            <Route path="/events" element={<EventListPage />} />
            <Route path="/events/:event_id" element={<EventDetailsPage />} />
            <Route path="/create-event" element={<EventCreatePage />} />
            <Route path="/users" element={<p> soy useres </p>} />
            <Route path="/users/:username" element={<p> soy detalle user </p>} />
            <Route path="/events" element={<p> soy eventos </p>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<h1> 404 </h1>} />
        </Routes>
    )
}

export default AppRoutes