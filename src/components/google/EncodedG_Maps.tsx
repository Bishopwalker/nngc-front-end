import React, { useEffect, useState } from 'react';
import { GoogleMap, Polyline, useJsApiLoader, LoadScriptProps } from '@react-google-maps/api';
import axios from "axios";

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
    const [instructions, setInstructions] = useState<string[]>([]);
    useEffect(() => {
        // Fetch route data from your back-end service
     const result= axios.get('http://localhost:5000/nngc/google/create-route-4-driver')  // Replace with the actual URL of your service
            .then(response => response.data)
            .then(data => {
                const decodedPath = window.google.maps.geometry.encoding.decodePath(data.polyline);
                setPath(decodedPath);
                setInstructions(data.instructions);
            });
     result.then(r => console.log(r))
    }, [isLoaded]);

    if (!isLoaded) return <div>Loading maps</div>;

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={path[0]}
            >
                <Polyline path={path} options={options} />
            </GoogleMap>
            <div>
                {instructions.map((instruction, index) => (
                    <p key={index} dangerouslySetInnerHTML={{__html: instruction}} />
                ))}
            </div>
        </div>
    );
};

export default Encoded_GMaps;
