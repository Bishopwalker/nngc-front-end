import React, {useEffect, useState} from 'react';
import {GoogleMap, InfoWindow, Marker, Polyline, useJsApiLoader} from '@react-google-maps/api';
import axios from 'axios';
import {useProtectedRoute} from '../../auth/useProtectedRoute'; // Import your useProtectedRoute hook
import {libraries} from './mapsConfig';


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
    useProtectedRoute();
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
        libraries,
    });

    const [path, setPath] = useState<google.maps.LatLng[]>([]);
    const [instructions, setInstructions] = useState<string[]>([]);
    const [selectedInstruction, setSelectedInstruction] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://localHost:5000/nngc/google/create-route-4-driver')
            .then(response => response.data)
            .then(data => {
                const decodedPath = window.google.maps.geometry.encoding.decodePath(data.polyline);
                setPath(decodedPath);
                setInstructions(data.instructions);
            });
    }, [isLoaded]);

    const handlePolylineClick = (index: number) => {
        setSelectedInstruction(instructions[index]);
    };

    if (!isLoaded) return <div>Loading maps</div>;

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={path[0]}
            >
                <Polyline
                    path={path}
                    options={options}
                    onClick={(e) => {
                        if (e.latLng) {  // Check if e.latLng is not null
                            const index = Math.floor(e.latLng.lat());
                            handlePolylineClick(index);
                        } else {
                            console.log("latLng is null");
                        }
                    }}
                />
                {path.map((point, index) => (
                    <Marker
                        key={index}
                        position={point}
                        onClick={() => handlePolylineClick(index)}
                    />
                ))}
                {selectedInstruction && (
                    <InfoWindow
                        position={path[0]}
                        onCloseClick={() => setSelectedInstruction(null)}
                    >
                        <div dangerouslySetInnerHTML={{ __html: selectedInstruction }} />
                    </InfoWindow>
                )}
            </GoogleMap>
            <div>
                {instructions.map((instruction, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: instruction }} />
                ))}
            </div>
        </div>
    );
};

export default Encoded_GMaps;
