import React, { useEffect, useState } from 'react';
import { GoogleMap, Polyline, useJsApiLoader, LoadScriptProps } from '@react-google-maps/api';

const libraries: LoadScriptProps['libraries'] = ['geometry'];

const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
};

const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
};

const Encoded_GMaps: React.FC = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string, // Replace with your API key.
        libraries,
    });

    const [path, setPath] = useState<google.maps.LatLng[]>([]);

    useEffect(() => {
        if (isLoaded) {
            const encodedPolyline = 'ogufFhb`rMzLpno@vqb@n_bArqWxd{@gl@f`e@_vc@dkgAol`@~gpAsyBdnuAciK~u^p}L...'; // Replace with your encoded polyline.
            const decodedPath = window.google.maps.geometry.encoding.decodePath(encodedPolyline);
            setPath(decodedPath);
        }
    }, [isLoaded]);

    if (!isLoaded) return <div>Loading maps</div>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={path[0]}
        >
            <Polyline path={path} options={options} />
        </GoogleMap>
    );
};

export default Encoded_GMaps;
