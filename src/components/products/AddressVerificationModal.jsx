import {useState} from "react";
import axios from "axios";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom";

const AddressVerificationModal = ({ open, onClose, onVerificationResult }) => {
   // const [open, setOpen] = useState(false);
    const [address, setAddress] = useState("");
    const [verificationResult, setVerificationResult] = useState("");

  const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const navigate = useNavigate();
    const handleAddressChange = (event) => setAddress(event.target.value);

    const handleVerifyAddress = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/nngc/google/verify-address?address=${encodeURIComponent(address)}`);
            const result = response.data; // Assuming the response will be a string like "INSIDE", "SURROUNDING", or "OUTSIDE"
            setVerificationResult(result);

            if (result === "INSIDE") {
                // Allowed to purchase
                alert("Address is within our service area. You can proceed with the purchase.");
                onVerificationResult(true);
                onClose(); // Close the modal after successful verification
            } else if (result === "SURROUNDING") {
                // push user to help page
                alert("Address is in the surrounding area. Please give us a call for special pricing. ");
                navigate("/help");
                        onClose();
            } else if (result === "OUTSIDE") {
                // Alert for outside service area
                alert("Unfortunately, your address is outside of our service area.");
                onVerificationResult(false);
                onClose();
           // Close the modal after unsuccessful verification
            }
        } catch (error) {
            console.error("Error verifying address:", error);
            alert("There was an error verifying the address. Please try again.");
        }
    };

    return (
        <div>

            <Modal open={open} onClose={onClose}>
                <Card /* Add styles for positioning and sizing the Card as needed */>
                    <CardContent>
                        <h2>Verify Address</h2>
                        <p>Please enter the address you want service :</p>
                        <p>{verificationResult}</p>
                        <TextField
                            label="Address"
                            value={address}
                            onChange={handleAddressChange}
                            fullWidth
                        />
                    </CardContent>
                    <CardActions>
                        <Button onClick={handleVerifyAddress}>Submit</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </CardActions>
                </Card>
            </Modal>
        </div>
    );
};

export default AddressVerificationModal;
