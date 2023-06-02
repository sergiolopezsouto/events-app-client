import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../../config';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useEffect } from 'react';


const containerStyle = {
    width: '100%',
    height: '400px'
};

// const center = {
//     lat: -34.397,
//     lng: 150.644
// };

const center = {
    lat: 40.416,
    lng: -3.703
};


const MapContainer = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    });

    useEffect(() => {
        if (loadError) {
            console.error('Error loading Google Maps API:', loadError);
        }
    }, [loadError]);

    if (!isLoaded) {
        return <LoadingSpinner />
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
        />
    );
};

export default MapContainer;
