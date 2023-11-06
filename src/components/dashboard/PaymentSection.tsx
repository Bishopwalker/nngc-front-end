import React from "react";
import {Button, Card, CardHeader, Divider, Typography} from "@mui/material";
import {useAppSelector} from "../../redux/hooks";
import axios from "axios";


const PaymentSection =  (  ) => {
     const userInfo = useAppSelector((state) => state.userInfo);
    const handleManageBilling = async () => {
        console.log(userInfo.customerDTO.stripeCustomerId);
        try {
            const response = await axios.get(`http://localhost:8080/auth/stripe/create-customer-portal-session/${userInfo.customerDTO.id}`);
            console.log(response.data)
            window.location.href = response.data;
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        title={"Billing Information"}
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
            <>


        <Button variant="contained" color="secondary" onClick={handleManageBilling}>
            Enter Billing Portal
        </Button>

            </>
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
        Stripe ID: {userInfo.customerDTO.stripeCustomerId}
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
        Total Payment: 3

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
        Recurring Payment: 1
      </Typography>
    </Card>
  );
};

export default PaymentSection;

