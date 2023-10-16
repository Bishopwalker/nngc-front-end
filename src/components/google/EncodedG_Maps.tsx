import React, {useEffect, useState} from 'react';
import {GoogleMap, Marker, Polyline, useJsApiLoader} from '@react-google-maps/api';
import axios from 'axios';
import {useProtectedRoute} from '../../auth/useProtectedRoute'; // Import your useProtectedRoute hook
import {libraries} from './mapsConfig';
import {Box, Grid, Typography} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {ThemeProvider, useTheme} from '@mui/material/styles';
import Container from "@mui/material/Container";

const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
};

const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
};

interface CustomerInfo {
    id: number;
    fullName: string;
    phoneNumber: string;
    address: {
        latitude: number;
        longitude: number;
        line1: string;
        city: string;
        state: string;
        zipCode: string;
    };
}


const Encoded_GMaps: React.FC = () => {
    useProtectedRoute();
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
        libraries,
    });

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [path, setPath] = useState<google.maps.LatLng[]>([]);
    const [instructions, setInstructions] = useState<string[]>([]);
    const [selectedInstruction, setSelectedInstruction] = useState<string | null>(null);
    const [customerList, setCustomerList] = useState<any[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
    const [totalStops, setTotalStops] = useState<number>(0);
    const [totalMiles, setTotalMiles] = useState<number>(0);
    const [totalTime, setTotalTime] = useState<number>(0);
    const [selectedCustomerInfo, setSelectedCustomerInfo] = useState<CustomerInfo | null>(null);

    const [selectedLat, setSelectedLat] = useState<number | null>(null);
    const [selectedLon, setSelectedLon] = useState<number | null>(null);
    const queryParams = new URLSearchParams(location.search);
    const routeNumber = queryParams.get('page');
    console.log(selectedInstruction)
    useEffect(() => {
        axios.get(`http://localhost:8080/nngc/google/create-route-4-driver/${routeNumber}`)
            .then(response => response.data)
            .then(data => {
                const decodedPath = window.google.maps.geometry.encoding.decodePath(data.polyline);
                setPath(decodedPath);
                setInstructions(data.instructions);
                setCustomerList(data.customerRouteDetails)
                setTotalStops(data.totalStops);
                setTotalMiles(parseInt(data.routeDistance));
                setTotalTime(parseFloat(data.totalDuration));
                console.log(data)
            });
    }, [isLoaded,routeNumber]);

    const handlePolylineClick = (index: number) => {
        setSelectedInstruction(instructions[index]);
        setSelectedCustomer(index);
    };

    if (!isLoaded) return <div>Loading maps</div>;
    // const handleCustomerClick = (index: number) => {
    //     setSelectedCustomer(index);
    // };

    const handleSortByName = () => {
        const sortedList = [...customerList].sort((a, b) => a.customerInfo.fullName.localeCompare(b.customerInfo.fullName));
        setCustomerList(sortedList);
    };

    const handleSortById = () => {
        const sortedList = [...customerList].sort((a, b) => a.customerInfo.id - b.customerInfo.id);
        setCustomerList(sortedList);
    };
    const handleCustomerClick = (index:number) => {
        const selectedInfo = customerList[index].customerInfo;
        setSelectedCustomerInfo(selectedInfo);
        setSelectedLat(selectedInfo.latitude);
        setSelectedLon(selectedInfo.longitude);
    };


    // @ts-ignore
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xl">
                <Grid container spacing={2} justifyContent="center">
                    {/* Row 1: Customer Info and Map */}
                    <Grid item container xs={12} spacing={2} alignItems="stretch">
                        <Grid item xs={12} sm={6} md={2}>

                    <Box style={{ border: '1px solid black', marginBottom: '1em', width:'300px',overflow:'auto' }}>
             <Typography variant="h6" align="left" sx={{
                fontWeight: 'bold',
                color: '#2C3E50',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                }}>
             Total Stops: {totalStops}
             </Typography>

                <Typography variant="h6" align="left" sx={{
                fontWeight: 'bold',
                color: '#2C3E50',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                }}>
Total Miles: {totalMiles}
                </Typography>
                <Typography variant="h6" align="left" sx={{
                fontWeight: 'bold',
                color: '#2C3E50',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                }}>
Total Min: {totalTime}
                </Typography>

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
            </Box>
            <div id="customer-info">
                {selectedCustomerInfo && (
                    <div>
                        <h3>{selectedCustomerInfo.fullName} (ID: {selectedCustomerInfo.id})</h3>
                        <p>Phone Number: {selectedCustomerInfo.phoneNumber}</p>
                      <ul>
                          {/* @ts-ignore */}
                        <li>Address:
                            {selectedCustomerInfo.address}
                        </li>
                      </ul>
                        {/* ...other information */}
                    </div>
                )}
            </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <div style={{ border: '1px solid black', width: '100%', height: '400px', maxHeight:'400px' }}> {/* Adjust height as needed */}

                            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={selectedLat && selectedLon ? { lat: selectedLat, lng: selectedLon } : path[0]}
                /*@ts-ignore*/
                             selectedCustomerInfo={selectedCustomerInfo}

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
                {path.length > 0 && (
                    <Marker
                        position={path[path.length - 1]}  // Position of the last point in the path array
                    />
                )}
                {selectedLat && selectedLon && (
                    <Marker
                        position={{ lat: selectedLat, lng: selectedLon }}
                        icon={{
                            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', // You can use a custom icon here
                            scaledSize: new window.google.maps.Size(40, 40),
                        }}
                    />
                )}
            </GoogleMap>
                        </div>
                    </Grid>
                    </Grid>

                    <Grid item xs={12} style={{ width: '100%' }}>
                        <Typography
                           >
                            {!selectedCustomerInfo && <><Box mt={4} pt={4} display={{xs: 'block'}}>

                            </Box><Box mt={4} pt={4} display={{xs: 'block'}}>

                            </Box><Box mt={4} pt={4} display={{xs: 'block'}}>

                            </Box></>
                         }
            </Typography>
                    </Grid>
                </Grid>
                </Container>
            <Grid item xs={12} style={{ width: '100%' }}>
                <Typography  style={{ width: '100%',
                    border: '1px solid black', padding: '1em' }}>
                    {instructions.map((instruction, index) => (
                        <span key={index} dangerouslySetInnerHTML={{ __html: instruction }}  />
                    ))}
                </Typography>
            </Grid>
        </ThemeProvider>
    );
};

export default Encoded_GMaps;
