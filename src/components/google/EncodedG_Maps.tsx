import React, {useEffect, useState} from 'react';
import {GoogleMap, Marker, Polyline, useJsApiLoader} from '@react-google-maps/api';
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
    const [customerList, setCustomerList] = useState<any[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
    const [totalStops, setTotalStops] = useState<number>(0);
    const [totalMiles, setTotalMiles] = useState<number>(0);
    const [totalTime, setTotalTime] = useState<number>(0);

    useEffect(() => {
        axios.get('http://localHost:5000/nngc/google/create-route-4-driver')
            .then(response => response.data)
            .then(data => {
                const decodedPath = window.google.maps.geometry.encoding.decodePath(data.polyline);
                setPath(decodedPath);
                setInstructions(data.instructions);
                setCustomerList(data.customerRouteDetails)
                setTotalStops(data.totalStops);
                setTotalMiles(data.totalMiles / 10000);
                setTotalTime(data.totalTime / 60);
            });
    }, [isLoaded]);

    const handlePolylineClick = (index: number) => {
        setSelectedInstruction(instructions[index]);
        setSelectedCustomer(index);
    };

    if (!isLoaded) return <div>Loading maps</div>;
    const handleCustomerClick = (index: number) => {
        setSelectedCustomer(index);
    };

    const handleSortByName = () => {
        const sortedList = [...customerList].sort((a, b) => a.customerInfo.fullName.localeCompare(b.customerInfo.fullName));
        setCustomerList(sortedList);
    };

    const handleSortById = () => {
        const sortedList = [...customerList].sort((a, b) => a.customerInfo.id - b.customerInfo.id);
        setCustomerList(sortedList);
    };

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={path[0]}
            >
                <Polyline
                    path={path}
                    options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 }}
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
                        onClick={() => handleCustomerClick(index)}
                    />
                ))}
            </GoogleMap>

            <div style={{ padding: '1em', border: '1px solid black', marginBottom: '1em' }}>
                <h3>Customer List</h3>
                <button onClick={handleSortByName}>Sort by Name</button>
                <button onClick={handleSortById}>Sort by ID</button>
                <ul>
                    {customerList.map((customer, index) => (
                        <li
                            key={customer.customerInfo.id}
                            style={selectedCustomer === index ? { backgroundColor: 'yellow' } : {}}
                            onClick={() => handleCustomerClick(index)}
                        >
                            {customer.customerInfo.fullName} (ID: {customer.customerInfo.id})
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                {instructions.map((instruction, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: instruction }} />
                ))}
            </div>
        </div>
    );
};

export default Encoded_GMaps;
