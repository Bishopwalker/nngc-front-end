import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import {useAppSelector} from "../../redux/hooks";
import axios from "axios";

const BillingPortal = () => {

    const userInfo = useAppSelector((state) => state.userInfo);
    const handleManageBilling = async () => {
        console.log(userInfo.stripeCustomerId);
        try {
            const response = await axios.get(`https://api.northernneckgarbage.com/auth/stripe/create-customer-portal-session/${userInfo.id}`);
            //console.log(response.data)
            window.location.href = response.data;
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Box
            sx={{
                width: '100%',
                height: '20vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 'bold',
                    letterSpacing: '0.1em',
                    marginBottom: '1rem'
                }}
            >
                Entering the eBilling Portal To See Transactions and Update Billing Information
            </Typography>
            <Button
                variant="contained"
                fullWidth
                color="secondary"
                onClick={handleManageBilling}
                sx={{
                    height: '80%',
                }}
            >
                Enter Billing Portal
            </Button>
        </Box>
    );
};

export default BillingPortal
