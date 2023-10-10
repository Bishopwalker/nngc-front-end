import {Box, Button, Grid, Typography} from "@mui/material";
import UserProfileSection from "./UserProfileSection";
import AddressSection from "./AddressSection";
import PaymentSection from "./PaymentSection";
import LoginSection from "./LoginSection";
import TransactionsTable from "./TransactionsTable";
import EmailPasswordSection from "./EmailPasswordSection";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {Link, useNavigate} from "react-router-dom";
import {clearUserInfo} from "../../redux/userLogInfoSlice";

const Dashboard = () => {
	const userInfo = useAppSelector(state => state.userInfo)
	const navigate = useNavigate();
	const dispatch = useAppDispatch(); // Get the dispatch function
	React.useEffect(() => {
		if (userInfo.id === '') {
			navigate('/login');
		}
	}, [userInfo, navigate]);

	const handleLogout = () => {
		dispatch(clearUserInfo()); // Dispatch the clearUserInfo action to clear user data
		// Here, you can also perform additional tasks like redirecting the user to the login page
	};

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
						<UserProfileSection />
					</Grid>
					<Grid item xs={12} sm={6} sx={{margin: '2'}}>
						<AddressSection />
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
						<TransactionsTable  />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Dashboard;