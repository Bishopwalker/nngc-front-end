import React from "react";
import {Card, CardHeader, Divider, Typography} from "@mui/material";
import {UserProfile_Interface} from "./interface"

const PaymentSection =  ({ userInfo }:  UserProfile_Interface) => {
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
        Stripe ID: {userInfo.stripeCustomerId}
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

