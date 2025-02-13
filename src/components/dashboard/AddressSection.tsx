import React, {useState, useEffect} from "react";
import {Card, CardHeader, Divider, IconButton, Modal, Typography} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useAppSelector} from "../../redux/hooks";
import AddressForm from "./AddressForm";
import axios from "axios";
import Alert, {AlertColor} from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface AddressResult {
    token: string;
    handleClose?: () => void;
}

interface GeocodeData {
    formattedAddress?: string;
    addressComponents?: Array<{
        longName: string;
        shortName: string;
        types: string[];
    }>;
}

const AddressSection: React.FC<AddressResult> = ({ token }) => {
    const userInfo = useAppSelector((state) => state.userInfo);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');
    const [location, setLocation] = useState(false);
    const [geocodeData, setGeocodeData] = useState<GeocodeData>({
        formattedAddress: undefined,
        addressComponents: undefined
    });

    const fetchGeoLocationData = async () => {
        try {
            const result = await axios.get(`https://api.northernneckgarbage.com/nngc/geocoding/${userInfo.id}`);
            setGeocodeData(result.data);
        } catch (error) {
            console.error('Error fetching geolocation data:', error);
            setSnackbarSeverity('error');
            setSnackbarMessage('Failed to fetch address details');
            setOpenSnackbar(true);
        }
    };

    useEffect(() => {
        if (userInfo.address?.city === null) {
            setLocation(true);
            setSnackbarSeverity('info');
            setSnackbarMessage('You Got to add a valid address to use our services, Thank You NNGC!!');
            setOpenSnackbar(true);
        }

        if (userInfo.id != null && !geocodeData.formattedAddress) {
            fetchGeoLocationData();
        }
    }, [userInfo, userInfo.id, userInfo.address?.city, geocodeData.formattedAddress]);

    const handleLocationClick = () => {
        setLocation(true);
    };

    const handleLocationClose = () => {
        setLocation(false);
    };

    return (
        <>
            <Card sx={{ mb: 2 }}>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={20000}
                    onClose={() => setOpenSnackbar(false)}
                >
                    <Alert
                        sx={{ fontSize: '2.5rem', width: '100%' }}
                        onClose={() => setOpenSnackbar(false)}
                        severity={snackbarSeverity}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
                <CardHeader
                    title="Location Details"
                    sx={{
                        textAlign: "center",
                        backgroundColor: "#2C3E50",
                        color: "#fff",
                        fontWeight: "bold",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #ddd",
                    }}
                    action={
                        <IconButton aria-label="edit" onClick={handleLocationClick}>
                            <Edit sx={{ color: "#26C9FF" }} />
                        </IconButton>
                    }
                />
                <Divider />
                <Typography
                    variant="h4"
                    sx={{
                        pt: 2,
                        pb: 1,
                        textAlign: "center",
                        fontWeight: "normal",
                        fontSize: 24,
                        color: "black",
                    }}
                >
                    {geocodeData.formattedAddress}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        pt: 1,
                        pb: 2,
                        textAlign: "center",
                        fontWeight: "normal",
                        fontSize: 24,
                        color: "black",
                    }}
                >
                    {userInfo.address?.line2}
                </Typography>

                {geocodeData.addressComponents && (
                    <Typography
                        variant="h6"
                        sx={{
                            pt: 1,
                            pb: 2,
                            textAlign: "center",
                            fontWeight: "normal",
                            fontSize: 24,
                            color: "black",
                        }}
                    >
                        {geocodeData.addressComponents[3]?.longName}
                    </Typography>
                )}
            </Card>
            <Modal
                open={location}
                onClose={handleLocationClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Card
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
                        maxWidth: 400,
                        bgcolor: "#F0F2F5",
                        p: 2,
                        borderRadius: "8px",
                    }}
                >
                    <CardHeader
                        title="Update Address Details"
                        sx={{ bgcolor: "#2C3E50", color: "#fff", textAlign: "center" }}
                    />
                    <Divider />
                    <AddressForm handleClose={handleLocationClose} token={token} />
                </Card>
            </Modal>
        </>
    );
};

export default AddressSection;