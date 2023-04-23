import React, {useState} from "react";
import {Card, CardHeader, Divider, IconButton, Modal, Typography} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useAppSelector} from "../../redux/hooks";
import AddressForm from "./AddressForm";
import axios from "axios";


const AddressSection = () => {
    const userInfo = useAppSelector((state) => state.userInfo);

const [geocodeData, setGeocodeData] = useState({})
    const fetchGeoLocationData = async ( ) => {
        const result = await axios.get(`http://localhost:5000/nngc/geocoding/${userInfo.id}`)
        setGeocodeData(result.data)
        console.log(result.data)
    }
React.useEffect(()=>{
    if(userInfo.id != null){
    fetchGeoLocationData().then(r => console.log(r));
    }
},[ ])
    const [location, setLocation] = useState(false);
const [address, setAddress] = useState({
        line1: userInfo.address.line1,
        line2: userInfo.address.line2,
        city: userInfo.address.city,
        state: userInfo.address.state,
        postal_code: userInfo.address.zipCode,
} as any);

    const handleLocationClick = () => {
        setLocation(true);
    };

    const handleLocationClose = () => {
        setLocation(false);

    };

    return (
        <>
            <Card sx={{ mb: 2 }}>
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
                    variant="h6"
                    sx={{
                        pt: 2,
                        pb: 1,
                        textAlign: "center",
                        fontWeight: "normal",
                        fontSize: 24,
                        color: "black",
                    }}
                >
                    {userInfo.address.line1}
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
                    {userInfo.address.city} {userInfo.address.state}{" "}
                    {userInfo.address.zipCode}
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
                    }}>Geolocation: {userInfo.geoLocation}</Typography>

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
                    <AddressForm handleClose={handleLocationClose}   />
                </Card>
            </Modal>
        </>
    );
};

export default AddressSection;
