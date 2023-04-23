// @ts-ignore


import React from 'react'
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import {useAppSelector} from "../../redux/hooks";

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

function G_Maps() {
    const user = useAppSelector(state => state.userInfo);
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey
    })
    console.log(user)
    React.useEffect(() => {
        if(user.token !=''){
            console.log(user.token)
            center.lat = user.address.latitude;
            center.lng = user.address.longitude;
        }
    }, [])

    const [map, setMap] = React.useState(null)
//@ts-ignore
    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    //@ts-ignore
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(G_Maps)