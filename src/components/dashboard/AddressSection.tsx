import React, { useState } from "react";
import { Card, Modal, TextField, Button, CardHeader, Divider, IconButton, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";

type Props = {
    userInfo: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        zipCode: string;
    }
}
const AddressSection = ({ userInfo }:Props) => {
  const [location, setLocation] = useState(false);
  const [addressLineOne, setAddressLineOne] = useState(userInfo.addressLine1);
  const [addressLineTwo, setAddressLineTwo] = useState(userInfo.addressLine2);
  const [city, setCity] = useState(userInfo.city);
  const [state, setState] = useState(userInfo.state);
  const [zip, setZip] = useState(userInfo.zipCode);

  const handleLocationClick = () => {
	setLocation(true);
  };

  const handleLocationClose = () => {
	setLocation(false);
  };

  const handleAddressLineOneChange =  (event: { target: { value: any; }; }) => {
	setAddressLineOne(event.target.value);
  }

  const handleAddressLineTwoChange =  (event: { target: { value: any; }; }) => {
	setAddressLineTwo(event.target.value);
  }

  const handleCityChange =  (event: { target: { value: any; }; }) => {
	setCity(event.target.value);
  }

  const handleStateChange =  (event: { target: { value: any; }; }) => {
	setState(event.target.value);
  }

  const handleZipChange = (event: { target: { value: any; }; }) => {
	setZip(event.target.value);
  }

  const handleLocationSubmit = () => {
	console.log("edit submit clicked!");
	console.log(addressLineOne, addressLineTwo, city, state, zip);
	handleLocationClose();
  }

  return (
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
        {userInfo.addressLine1}
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
        {userInfo.addressLine2}
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
        {userInfo.city} {userInfo.state} {userInfo.zipCode}
      </Typography>
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
          <TextField
            sx={{
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
            }}
            label="Address Line 1"
            type="text"
            value={addressLineOne}
            onChange={handleAddressLineOneChange}
            fullWidth
          />
          <TextField
            sx={{
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
            }}
            label="Address Line 2"
            type="text"
            value={addressLineTwo}
            onChange={handleAddressLineTwoChange}
            fullWidth
          />
          <TextField
            sx={{
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
            }}
            label="City"
            type="text"
            value={city}
            onChange={handleCityChange}
            fullWidth
          />
          <TextField
            sx={{
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
            }}
            label="State"
            type="text"
            value={state}
            onChange={handleStateChange}
            fullWidth
          />
          <TextField
            sx={{
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
            }}
            label="Zip"
            type="text"
            value={zip}
            onChange={handleZipChange}
            fullWidth
          />
          <Button
            sx={{
              mt: 2,
              bgcolor: "#2C3E50",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#455A64",
              },
            }}
            variant="contained"
            onClick={handleLocationSubmit}
          >
            Submit
          </Button>
        </Card>
      </Modal>
    </Card>
  );
};

export default AddressSection;

