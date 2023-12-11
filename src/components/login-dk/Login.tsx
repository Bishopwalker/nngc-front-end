import {Link, Navigate} from 'react-router-dom'; // Step 1: Import Link
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {addToken, changeUserLogInfo} from "../../redux/userLogInfoSlice";
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import Alert, {AlertColor} from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import GoogleSignInButton from "../google/GoogleSignInButton";

const Login = () => {

	const loginAttemptCount = useAppSelector((state)=>state.userInfo.loginAttemptCount);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const dispatch = useAppDispatch();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');
	const [verifyEmail, setVerifyEmail] = useState(false);
	const [resetPassword, setResetPassword] = useState(false);
	useEffect(() => {
		console.log(loginAttemptCount);

	},[])

	if (isLoggedIn) {
		return <Navigate to="/dashboard" />;
	}
	const handleResendVerificationEmail = async() => {
		const response  = await axios.get(`https://api.northernneckgarbage.com/auth/nngc/resend-token/${email}`);
		console.log(response)
		if(response.data.token){
			setSnackbarSeverity('success');
			setSnackbarMessage('Verification Email Sent go to Your Inbox');
			setOpenSnackbar(true);

		}
	}

  // @ts-ignore
	const handleSubmit = async(e) => {
    e.preventDefault();
    if (email && password) {
      setError('');
		const myJSON = {
		  email,
		  password
		};
		const values = JSON.stringify(myJSON);
		//console.log(values);
	await axios.post('https://api.northernneckgarbage.com/auth/nngc/authenticate', values,{
		headers: {
			'Content-Type': 'application/json',
		},
		})
			.then((response) => {
		console.log('response',response)
				if(response.data.status=== 403){
					setSnackbarSeverity('error');
					setSnackbarMessage('Invalid Email or Password.....Try Again or Yell Help!!!');
					setOpenSnackbar(true);
					setResetPassword(true)
				}
				if(response.data.status === "disabled"){
					setSnackbarSeverity('info');
					setSnackbarMessage(`You haven't verified your email yet...Check your email for the verification link...Or click Resend Verification Email to enable account`);
					setOpenSnackbar(true);
					setVerifyEmail(true);

				}
			dispatch(changeUserLogInfo(response.data.customerDTO))
			dispatch(addToken({token: response.data.token}))

			setIsLoggedIn(true);
		})
		.catch((error) => {
			console.log(error)
			if(error.response.status=== 403){
				setSnackbarSeverity('error');
				setSnackbarMessage('Invalid Email or Password.....Try Again or Yell Help!!!');
				setOpenSnackbar(true);
				setResetPassword(true)
			}

		})

    } else {
      setError('Please enter both email and password.');
    }
  };

	return (
		<Box mt={0} mb={4}>
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
			{verifyEmail && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<Button fullWidth={true} variant={'contained'} onClick={handleResendVerificationEmail} >
					Resend verification email?
				</Button>
			</Box>   }
			{resetPassword && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<Link to='/password'><Button fullWidth={true} variant={'contained'}  >
					Reset Your Password?
				</Button> </Link>
			</Box>   }
			<Box pb={1} pt={0}>
				<Grid container>
					<Grid item xs={12} sm={12}>
						<Box sx={{ maxWidth: 400, margin: 'auto', fontFamily: 'Roboto' }}>
							<Typography variant="h4" align="center" sx={{
								fontWeight: 'bold',
								color: '#333',
								letterSpacing: '1px',
								textTransform: 'uppercase'
							}}>
								Login
							</Typography>
							<form onSubmit={handleSubmit}>
								<TextField
									label="Email"
									variant="outlined"
									fullWidth
									type="email"
									margin="normal"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<TextField
									label="Password"
									variant="outlined"
									type="password"
									fullWidth
									margin="normal"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								{error && (
									<Typography variant="body2" color="error" mb={2}>
										{error}
									</Typography>
								)}
								<Button
									type="submit"
									variant="contained"
									fullWidth
									color="primary"
									sx={{
										backgroundColor: '#2C3E50',
										marginTop: '16px',
										'&:hover': {
											backgroundColor: '#3A4C63',
										},
									}}
								>
									Login
								</Button>

								<Box mt={2} textAlign="center">
									<Link to="/signup" style={{ textDecoration: 'none', color: '#3A4C63' }}>
										<Typography variant="body1">
											Don't have an account? <b>Sign Up</b>
										</Typography>
									</Link>

								</Box>
							</form>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Login;

