import {Box, Button, Grid, Typography} from "@mui/material";
import UserProfileSection from "./UserProfileSection";
import AddressSection from "./AddressSection";
import PaymentSection from "./PaymentSection";
import LoginSection from "./LoginSection";
import TransactionsTable from "./TransactionsTable";
import EmailPasswordSection from "./EmailPasswordSection";
import BillingPortal from "./BillingPortal";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {Link, useNavigate} from "react-router-dom";
import {addToken, changeUserLogInfo, clearUserInfo, updateToken} from "../../redux/userLogInfoSlice";
import axios from "axios";

const Dashboard = () => {
	const userInfo = useAppSelector(state => state.userInfo)
	const navigate = useNavigate();
	const dispatch = useAppDispatch(); // Get the dispatch function
	const [token, setToken] = React.useState('');
	React.useEffect(() => {
		if (userInfo.id === '') {
			navigate('/login');
		}
	}, [userInfo, navigate]);

	const handleLogout = () => {
		dispatch(clearUserInfo()); // Dispatch the clearUserInfo action to clear user data
		navigate('/login');
	};
	const retrieveTokenFromUser=async (id:any)=> {
		await axios.get(`http://localhost:8080/auth/nngc/token/${id}`)
			.then((response) => {
				//addToken(response.data.token);
				//  const mergedState = {...initialState, ...response.data};
				//   initialState.token=response.data.token;
				console.log(response.data);
				// console.log(mergedState);
setToken(response.data.token);

				}).catch((error) => {
					console.log(error);
				});
				// console.log(state)

	}

React.useEffect(() => {
	//updateToken(token)
// @ts-ignore
	dispatch(updateToken(token));
},[token]);


	React.useEffect(() => {

		retrieveTokenFromUser(userInfo.id).then(r => console.log(r))

	},[userInfo]);

	return (
		<Box mb={4} mt={0}>
			<Box sx={{ }} pb={1} pt={1}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12}>
						<Box display="flex" justifyContent="space-between" alignItems="center">
							<Link to="/appointment">
							<Button variant="contained" color="success" sx={{
								marginBottom: '15px',
							}} >
								View Junk Removal Schedule
							</Button>  </Link>
							<Typography variant="h4" sx={{
								fontWeight: 'bold',
								color: '#2C3E50',
								letterSpacing: '1px',
								textTransform: 'uppercase',
								marginBottom: '15px'
							}}>
								User Dashboard
							</Typography>
							<Box>
								<Button variant="contained" color="warning" sx={{
									marginBottom: '15px',
								}} onClick={handleLogout}>
									Logout
								</Button>
							</Box>
						</Box>
					</Grid>

					<Grid item xs={12} sm={6} sx={{margin: '2'}}>
						<UserProfileSection token={token} />
					</Grid>
					<Grid item xs={12} sm={6} sx={{margin: '2'}}>
						<AddressSection token={token}/>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} sx={{margin: '2'}}>
						{/*@ts-ignore*/}
						<LoginSection userInfo={userInfo} authorities={userInfo.role}/>
					</Grid>
					<Grid item xs={12} sm={6} sx={{margin: '2'}}>
						<PaymentSection  />
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={3} sx={{}}>
					</Grid>
					<Grid item xs={12} sm={6} sx={{margin: '2'}}>
						{/*@ts-ignore*/}
						<EmailPasswordSection userInfo={userInfo} authorities={userInfo.role}/>
					</Grid>
					<Grid item xs={12} sm={3} sx={{}}>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} sx={{margin: '2'}}>
						<BillingPortal/>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Dashboard;