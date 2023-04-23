import axios from "axios";
import {useAppDispatch} from "../../redux/hooks";
import {addToken, changeUserLogInfo} from "../../redux/userLogInfoSlice";
import {Navigate} from "react-router-dom";
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useAppDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
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
		console.log(values);
	await axios.post('http://localhost:5000/auth/nngc/authenticate', values,{
		headers: {
			'Content-Type': 'application/json',
		},
		})
			.then((response) => {
			console.log('response',response)
			dispatch(changeUserLogInfo(response.data.customerDTO))
			dispatch(addToken({token: response.data.token}))
	 		if(response.data.token) {
				console.log(response.data.token);
 			}
			setIsLoggedIn(true);
		})
		.catch((error) => {
			console.log(error)
		})

    } else {
      setError('Please enter both email and password.');
    }
  };

  return (
	<Box mt={0} mb={4}>
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


				  </form>
				</Box>
			  </Grid>
			</Grid>
		</Box>
	</Box>
  );
};

export default Login;

