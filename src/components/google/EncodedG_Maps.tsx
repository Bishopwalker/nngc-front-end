import React, {useEffect, useState} from 'react';
import {GoogleMap, Marker, Polyline, useJsApiLoader} from '@react-google-maps/api';
import axios from 'axios';
import {useProtectedRoute} from '../../auth/useProtectedRoute'; // Import your useProtectedRoute hook
import {libraries} from './mapsConfig';
import {Box, Grid, Typography} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {ThemeProvider, useTheme} from '@mui/material/styles';

const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
};

// const options = {
//     strokeColor: '#FF0000',
//     strokeOpacity: 1.0,
//     strokeWeight: 2,
// };

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

interface Instructions {
    map(arg0: (instruction: { instruction: any; }, index: React.Key | null | undefined) => JSX.Element): React.ReactNode;
    instruction: string;
    customerInfo: CustomerInfo;
}

const Encoded_GMaps: React.FC = () => {
    useProtectedRoute();
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
        //@ts-ignore
        libraries,
    });


    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const [path, setPath] = useState<google.maps.LatLng[]>([]);
    const [instructions, setInstructions] = useState<Instructions[]>([]);
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
    const county = queryParams.get('county');
    const trigger = queryParams.get('trigger');
    console.log(trigger)
    const url =county===null?
        `https://api.northernneckgarbage.com/nngc/google/create-route-4-driver/${routeNumber}`:
        `https://api.northernneckgarbage.com/nngc/google/create-route-4-driver/${routeNumber}?county=${county}`;

    useEffect(() => {
       if(trigger==='true') {
           axios.get(url)
               .then(response => response.data)
               .then(data => {
                   const decodedPath = window.google.maps.geometry.encoding.decodePath(data.polyline);
                   setPath(decodedPath);
                   setInstructions(data.instructions);
                   setCustomerList(data.customerRouteDetails)
                   setTotalStops(data.totalStops);
                   setTotalMiles(parseInt(data.routeDistance));
                   setTotalTime(parseFloat(data.totalDuration));
                //   console.log(data)
               });
       }
    }, [isLoaded,routeNumber,trigger]);

    const handlePolylineClick = (index: number) => {
      // @ts-ignore
        const selectedInfo = instructions[index].customerInfo;
        setSelectedCustomerInfo(selectedInfo);
        setSelectedLat(selectedInfo.address.latitude);
        setSelectedLon(selectedInfo.address.longitude);
        // @ts-ignore
        setSelectedCustomer(selectedInfo);

        const customerInstructions = instructions.filter((instruction: { customerInfo: { id: any; }; }) => instruction.customerInfo.id === selectedInfo.id)
            .map((instruction: { instruction: any; }) => instruction.instruction);
        setSelectedInstruction(customerInstructions[0]);
        // setInstructions(customerInstructions);
    };

    if (!isLoaded) return <div>Loading maps</div>;

//console.log(selectedInstruction)
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
       setSelectedCustomer(index);

    };

console.log("selected customer",instructions)

    // @ts-ignore
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                width:'100vw',

            }}>
                <Grid container spacing={2} justifyContent="center">
                    {/* Row 1: Customer Info and Map */}
                    <Grid item container sm={12} spacing={2} alignItems="stretch">
                        <Grid item xs={12} sm={12} md={10} lg={2}>

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
Total Miles: {totalMiles/10}
                </Typography>
                <Typography variant="h6" align="left" sx={{
                fontWeight: 'bold',
                color: '#2C3E50',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                }}>
Total Min: {totalTime/10}
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
                        <div style={{ border: '1px solid black', width: '100%', height: 'auto' }}> {/* Adjust height as needed */}

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
                        <Typography component='div' style={{ width: '100%'}}
                           >
                            {!selectedCustomerInfo && <><Box mt={4} pt={4} display={{xs: 'block'}}>

                            </Box><Box mt={4} pt={4} display={{xs: 'block'}}>

                            </Box><Box mt={4} pt={4} display={{xs: 'block'}}>

                            </Box></>
                         }
            </Typography>
                    </Grid>
                </Grid>
                </Box>
            <Grid item xs={12} style={{ width: '100%' }}>
                <Typography component='div' style={{ width: '100%',
                    border: '1px solid black', padding: '1em' }}>
                    {selectedInstruction && (
                        <div>
                            <h3>ID: {selectedCustomerInfo?.id} {selectedCustomerInfo?.fullName}
                                <span> {selectedCustomerInfo?.phoneNumber} </span></h3>
                            <span>{selectedCustomerInfo?.address?.line1}</span>

                            <span dangerouslySetInnerHTML={{ __html: selectedInstruction }} />
                        </div>
                    )}
                   {instructions.map((instruction: {
                       customerInfo: CustomerInfo;
                       instruction: any; }, index: React.Key | null | undefined) => (
    <div key={index}>
        <h3>Step { (index as number)  + 1}</h3>
        <span dangerouslySetInnerHTML={{ __html: instruction.instruction }}  />
        {instruction.instruction.includes('Destination') && (
            <>
                <h6>{instruction.customerInfo?.fullName}</h6>

                <span>{instruction.customerInfo?.address as any}</span>
            </>
        )}
    </div>
))}
                </Typography>
            </Grid>
        </ThemeProvider>
    );
};

export default Encoded_GMaps;
