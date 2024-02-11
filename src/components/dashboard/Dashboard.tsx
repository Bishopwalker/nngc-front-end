import {Box, Button, Grid, Typography} from "@mui/material";
import UserProfileSection from "./UserProfileSection";
import AddressSection from "./AddressSection";
import PaymentSection from "./PaymentSection";
import LoginSection from "./LoginSection";
import EmailPasswordSection from "./EmailPasswordSection";
import BillingPortal from "./BillingPortal";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {Link, useNavigate} from "react-router-dom";
import {changeUserLogInfo, clearUserInfo, updateToken} from "../../redux/userLogInfoSlice";
import axios from "axios";
import {Helmet} from "react-helmet";
import {changeTitle} from "../../redux/pageTitleSlice";

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

	React.useEffect(()=>{
		dispatch( changeTitle('Our Story'))
	},[ ])

	const updateUserInfo=async()=>{
		try{
			const response = await axios.get(
				`https://api.northernneckgarbage.com/api/nngc/customers/${userInfo.id}`, {
					headers: {
						Authorization: userInfo.token,
					},
				}
			)
			if(response.data){
				dispatch(changeUserLogInfo(response.data));
			}
		}catch (error){
			console.error(error)
		}
	}
	const retrieveTokenFromUser=async (id:any)=> {
		await axios.get(`https://api.northernneckgarbage.com/auth/nngc/token/${id}`)
			.then((response) => {
				//addToken(response.data.token);
				//  const mergedState = {...initialState, ...response.data};
				//   initialState.token=response.data.token;
			//	console.log(response.data);
				// console.log(mergedState);
setToken(response.data.token);

				}).catch((error) => {
					console.log(error);
				});
				// console.log(state)

	}

	const updateToken1 = (token: any) => async (dispatch: any) => {
		console.log(token)
		await axios.get(`https://api.northernneckgarbage.com/auth/nngc/token_status?token=${token}`)
			.then((response) => {
				updateToken(response.data.customer);
				//   console.log(response.data.customer);
			})
			.catch((error) => {
				console.log(error);
				if (error.response.status === 500) window.location.href = '/expired';

				//window.location.href ='/expired';
			});
	}
React.useEffect(() => {
	//updateToken(token)
// @ts-ignore
	updateToken1(token);
	//dispatch(updateToken(token));
},[token]);
React.useEffect(() => {
	updateUserInfo().then(r => console.log(r));
},[])

	React.useEffect(() => {

		retrieveTokenFromUser(userInfo.id).then(r => console.log(r))

	},[userInfo]);
//console.log(userInfo)
	return (
		<Box mb={4} mt={0}>
			<Helmet>
				<title>User Dashboard - Northern Neck Garbage Collection</title>
				<meta name="description" content="Access your personal dashboard to manage appointments, view schedules, and update your profile at Northern Neck Garbage Collection." />
				<meta name="keywords" content="user dashboard, garbage collection schedule, profile management, waste management account, recycling services, Northern Neck" />
			</Helmet>
			<Box sx={{ }} pb={1} pt={1}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12}>
						<Box display="flex" justifyContent="space-between" alignItems="center">
							{userInfo.receiptURL? 	<Link to="/appointment">
								<Button variant="contained" color="success" sx={{
								marginBottom: '15px',
							}} >
								View Junk Removal Schedule
							</Button>  </Link>:null}
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