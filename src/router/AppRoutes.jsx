import { Route, Routes } from "react-router-dom"
import EventListPage from "../pages/EventListPage/EventListPage"
import EventDetailsPage from "../pages/EventDetailsPage/EventDetailsPage"
import EventCreatePage from "../pages/EventCreatePage/EventCreatePage"

const AppRoutes = () => {


    return (
        <Routes>
            <Route path="/" element={<p> soy inicio </p>} />
            <Route path="/events" element={<EventListPage />} />
            <Route path="/events/:event_id" element={<EventDetailsPage />} />
            <Route path="/create-event" element={<EventCreatePage />} />
            <Route path="/users" element={<p> soy useres </p>} />
            <Route path="/users/:username" element={<p> soy detalle user </p>} />
            <Route path="/events" element={<p> soy eventos </p>} />
            <Route path="*" element={<h1> 404 </h1>} />
        </Routes>
    )
}

export default AppRoutes