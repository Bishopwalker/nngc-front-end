import React, {useState} from "react";
import {Button, Card, CardHeader, Divider, IconButton, Modal, TextField, Typography} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {clearUserInfo} from "../../redux/userLogInfoSlice";


const UserProfileSection = ( ) => {
    const userInfo = useAppSelector((state) => state.userInfo);
    const dispatch = useAppDispatch(); // Get the dispatch function

    const [edit, setEdit] = useState(false);
  const [name, setName] = useState(userInfo.fullName);
  const [email, setEmail] = useState(userInfo.email);
  const [phone, setPhone] = useState(userInfo.phoneNumber);

  const handleEditClick = () => {
	setEdit(true);
  };

  const handleEditClose = () => {
	setEdit(false);
  };

  const handleNameChange =  (event: { target: { value: any; }; }) => {
	setName(event.target.value);
  }

  const handleEmailChange =  (event: { target: { value: any; }; }) => {
	setEmail(event.target.value);
  }

  const handlePhoneChange =  (event: { target: { value: any; }; }) => {
	setPhone(event.target.value);
  }

  const handleEditSubmit = () => {
	console.log(name, email, phone);
	handleEditClose();
  }

    const handleLogout = () => {
        dispatch(clearUserInfo()); // Dispatch the clearUserInfo action to clear user data
        // Here, you can also perform additional tasks like redirecting the user to the login page
    };


    return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        title={"Personal Identification"}
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
                <IconButton aria-label="edit" onClick={handleEditClick}>
                    <Edit sx={{ color: "#26C9FF" }} />
                </IconButton>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Logout
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
        Name: {userInfo.fullName}
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
        Email: {userInfo.email}
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
        Phone: {userInfo.phoneNumber}
      </Typography>
      <Modal
        open={edit}
        onClose={handleEditClose}
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
            title="Update Personal Details"
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
            label="Name"
            type="text"
            value={name}
            onChange={handleNameChange}
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
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
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
            label="Phone"
            type="text"
            value={phone}
            onChange={handlePhoneChange}
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
            onClick={handleEditSubmit}
          >
            Submit
          </Button>
        </Card>
      </Modal>
    </Card>
  );
};

export default UserProfileSection;

