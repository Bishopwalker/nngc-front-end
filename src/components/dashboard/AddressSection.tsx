import React, {useState} from "react";
import {Card, CardHeader, Divider, IconButton, Modal, Typography} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useAppSelector} from "../../redux/hooks";
import AddressForm from "./AddressForm";
import axios from "axios";
import Alert, {AlertColor} from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface AddressResult {
    token: string;
}
const AddressSection = ({token}: AddressResult) => {
    const userInfo = useAppSelector((state) => state.userInfo);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('');

const [geocodeData, setGeocodeData] = useState({
    formattedAddress: undefined, addressComponents: undefined

})
    const fetchGeoLocationData = async ( ) => {
        const result = await axios.get(`http://localhost:8080/nngc/geocoding/${userInfo.id}`)
        setGeocodeData(result.data)
        //console.log(result.data)
    }
    console.log(geocodeData)
React.useEffect(()=>{
    if(userInfo.address.city === null){
        setLocation(true)
        setSnackbarSeverity('info');
        setSnackbarMessage('You Got to add a valid address to use our services, Thank You NNGC!!');
        setOpenSnackbar(true);
    }
    if(userInfo.id != null){
    fetchGeoLocationData().then(r => console.log(r));
    }

},[ userInfo])
    const [location, setLocation] = useState(false);





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
                        sx={{ fontSize: '2.5rem',width: '100%' }}
                        onClose={() => setOpenSnackbar(false)}
                        severity={snackbarSeverity as AlertColor}>
                        {snackbarMessage}
                    </Alert>

                </Snackbar>
                <CardHeader
                    title={"Location Details"}
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
                    {userInfo.address.line2}
                </Typography>

                {geocodeData.addressComponents && <Typography
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
                    { /*@ts-ignore*/}
                      {geocodeData.addressComponents[3].longName}
                </Typography>}
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
                    <AddressForm handleClose={handleLocationClose} token={token}   />
                </Card>
            </Modal>
        </>
    );
};

export default AddressSection;
