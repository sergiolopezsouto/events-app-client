import { GoogleMap, Marker, MarkerF } from '@react-google-maps/api'


const containerStyle = {
    width: '100%',
    height: '400px'
}


const MapContainer = ({ location }) => {

    const center = {
        lat: location.latitude,
        lng: location.longitude
    }

    return (

        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
            <MarkerF position={center} title={location.address} />
        </GoogleMap>

    )
}

export default MapContainer
