import React, { useState } from "react";
import { Button, Card, CardHeader, Divider, Grid, Modal, TextField } from "@mui/material";
import axios from "axios";
import {Navigate} from "react-router-dom";




const PasswordResetSection: React.FC = () => {


    const [open, setOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("Not Changed");
    const [email, setEmail] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    if (status === "Changed") {
        return <Navigate to="/verify" />;
    }
    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };
const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);

}
    const handleSubmit = async () => {
        if (newPassword === confirmPassword) {
            try {
                const response = await axios.put(
                    `https://api.northernneckgarbage.com/api/nngc/customers/email/${email}`,
                    { password: newPassword },

                );

                if (response.data) {
                    alert("Password updated successfully, Gotta Re-Verify Your email now!!");
                    setStatus("Changed");
                    handleClose();
                }
            } catch (error: any) {
                console.error(error?.response?.data?.message || error?.message || "An unknown error occurred");
            }
        } else {
            alert("Passwords do not match!");
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Card sx={{ mb: 2, textAlign: "center" }}>
                    <CardHeader title="Reset Password" sx={{ ...styles.cardHeader }} />
                    <Divider />
                    <Button sx={{ ...styles.button }} variant="contained" onClick={handleOpen}>
                        Reset Password
                    </Button>
                </Card>
            </Grid>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
                <Card sx={{ ...styles.modalCard }}>
                    <CardHeader title="New Password" sx={{ ...styles.cardHeader }} />
                    <Divider />
                    <TextField
                        sx={{ ...styles.textField }}
                        label="Email Address"
                        type="test"
                        value={email}
                        onChange={handleEmailChange}
                        fullWidth
                    />
                    <Divider />
                    <TextField
                        sx={{ ...styles.textField }}
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        fullWidth
                    />
                    <TextField
                        sx={{ ...styles.textField }}
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        fullWidth
                    />
                    <Button sx={{ ...styles.submitButton }} variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Card>
            </Modal>
        </Grid>
    );
};

export default PasswordResetSection;

const styles = {
    cardHeader: {
        textAlign: "center",
        backgroundColor: "#2C3E50",
        color: "#fff",
        fontWeight: "bold",
        letterSpacing: "1px",
        textTransform: "uppercase",
        borderBottom: "1px solid #ddd",
    },
    button: {
        m: 2,
        backgroundColor: "#2C3E50",
        "&:hover": {
            backgroundColor: "#455A64",
        },
    },
    modalCard: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        maxWidth: 400,
        bgcolor: "#F0F2F5",
        p: 2,
        borderRadius: "8px",
    },
    textField: {
        mt: 2,
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#2C3E50",
            },
            "&:hover fieldset": {
                borderColor: "#2C3E50",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#2C3E50",
            },
        },
    },
    submitButton: {
        mt: 2,
        bgcolor: "#2C3E50",
        color: "#fff",
        "&:hover": {
            backgroundColor: "#455A64",
        },
    },
};
